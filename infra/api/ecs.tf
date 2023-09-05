# see also https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_task_definition
# see also https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html
resource "aws_ecs_task_definition" "launch" {
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
          containerPort = 3333
          hostPort = 3333
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

resource "aws_ecs_service" "launch" {
  name = "api-service"
  cluster = aws_ecs_cluster.ecs.id
  task_definition = aws_ecs_task_definition.launch.arn
  launch_type = "FARGATE"
  desired_count = 2

  network_configuration {
    assign_public_ip = true
    security_groups = [ aws_security_group.ecs.id ]
    subnets = aws_subnet.public[*].id
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.lb.id
    container_name = "api-container"
    container_port = 3333
  }

  depends_on = [
    aws_lb_listener.lb
  ]
}
