resource "aws_ecs_cluster" "cluster" {
  name = "ukol-cluster"
}

resource "aws_cloudwatch_log_group" "logs" {
  name = "/ecs/ukol"
}

# migrate
resource "aws_ecs_task_definition" "migrate" {
  family = "migrate"

  requires_compatibilities = [ "FARGATE" ]
  cpu = "256" # 0.25 vCPU
  memory = "1024" # 1GB memory
  network_mode = "awsvpc"

  container_definitions = jsonencode([
    {
      name = "db-migrate"
      image = "${data.aws_ecr_repository.migrate.repository_url}"
      cpu = 256
      memory = 1024
      essential = false
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group = "/ecs/ukol"
          awslogs-region = "${var.region}"
          awslogs-stream-prefix = "ecs"
        }
      },
      environment = [
        {
          name = "DB_CONNECTION_STRING",
          value = "postgres://${var.db_username}:${var.db_password}@${aws_db_instance.db.endpoint}"
        }
      ]
    }
  ])

  execution_role_arn = aws_iam_role.execution.arn
}

# see also https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition
# see also https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
resource "aws_ecs_task_definition" "app" {
  family = "launch"

  requires_compatibilities = [ "FARGATE" ]
  cpu = "256" # 0.25 vCPU
  memory = "1024" # 1GB memory
  network_mode = "awsvpc"

  container_definitions = jsonencode([
    {
      name = "api-container"
      image = "${data.aws_ecr_repository.api.repository_url}"
      cpu = 256
      memory = 1024
      essential = true
      portMappings = [
        {
          containerPort = "${locals.app.container_port}"
          hostPort = "${locals.app.container_port}"
        }
      ],
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          awslogs-group = "/ecs/ukol"
          awslogs-region = "${var.region}"
          awslogs-stream-prefix = "ecs"
        }
      },
      environment = [
        {
          name = "DB_CONNECTION_STRING",
          value = "postgres://${var.db_username}:${var.db_password}@${aws_db_instance.db.endpoint}"
        }
      ]
    }
  ])

  execution_role_arn = aws_iam_role.execution.arn
}

# api

resource "aws_ecs_service" "app" {
  name = "api-service"
  cluster = aws_ecs_cluster.cluster.id
  task_definition = aws_ecs_task_definition.app.arn
  launch_type = "FARGATE"
  desired_count = 1

  network_configuration {
    security_groups = [module.vpc.default_security_group_id]
    subnets = module.vpc.private_subnets
  }

  load_balancer {
    target_group_arn = module.app_alb.target_group_arns[0]
    container_name = local.app.container_name
    container_port = local.app.container_port
  }

  lifecycle {
    ignore_changes = [desired_count] # Allow external changes to happen without Terraform conflicts, particularly around auto-scaling.
  }

  depends_on = [
    module.app_alb
  ]
}
