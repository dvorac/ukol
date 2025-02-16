### cluster ###

resource "aws_ecs_cluster" "ecs_cluster" {
  name = local.ecs.cluster
}


### migrate - task definition ###

resource "aws_ecs_task_definition" "migrate" {
  family                   = local.migrate.ecs.task
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = local.migrate.ecs.container
      image     = "${data.aws_ecr_repository.migrate.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = local.migrate.port
          hostPort      = local.migrate.port
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-region = "us-east-1",
          awslogs-group = "${aws_cloudwatch_log_group.migrate.name}"
          awslogs-stream-prefix = "ecs"
        }
      },
      environment = [
        {
          name = "DB_CONNECTION_STRING",
          value = "postgresql://postgres:postgres@${aws_db_instance.ukol.endpoint}/ukol"
        }
      ]
    }
  ])
}

### api - task definition ###

resource "aws_ecs_task_definition" "api" {
  family                   = local.api.ecs.task
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = local.api.ecs.container
      image     = "${data.aws_ecr_repository.api.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = local.api.port
          hostPort      = local.api.port
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-region = "us-east-1",
          awslogs-group = "${aws_cloudwatch_log_group.api.name}"
          awslogs-stream-prefix = "ecs"
        }
      },
      environment = [
        {
          name = "DB_CONNECTION_STRING",
          value = "postgresql://postgres:postgres@${aws_db_instance.ukol.endpoint}/ukol"
        }
      ]
    }
  ])
}

### api - service ###

resource "aws_ecs_service" "api" {
  name            = local.api.ecs.service
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public1.id, aws_subnet.public2.id]
    security_groups  = [aws_security_group.security_group.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = local.api.ecs.container
    container_port   = local.api.port
  }
}

### web - task definition

resource "aws_ecs_task_definition" "web" {
  family                   = local.web.ecs.task
  network_mode             = "awsvpc"
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  cpu                      = 256
  memory                   = 512
  requires_compatibilities = ["FARGATE"]

  runtime_platform {
    operating_system_family = "LINUX"
    cpu_architecture        = "X86_64"
  }

  container_definitions = jsonencode([
    {
      name      = local.web.ecs.container
      image     = "${data.aws_ecr_repository.web.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = local.web.port
          hostPort      = local.web.port
        }
      ],
      logConfiguration = {
        logDriver = "awslogs",
        options = {
          awslogs-region = "us-east-1",
          awslogs-group = "${aws_cloudwatch_log_group.web.name}"
          awslogs-stream-prefix = "ecs"
        }
      },
      environment = [
        {
          name = "GQL",
          value = "http://${aws_lb.api.dns_name}:3333/graphql"
        },
        {
          name = "API",
          value = "http://${aws_lb.api.dns_name}:3333/api"
        },
        {
          name = "PORT",
          value = "${tostring(local.web.port)}"
        }
      ]
    }
  ])

  depends_on = [ aws_lb.api ]
}

### web - service ###

resource "aws_ecs_service" "web" {
  name            = local.web.ecs.service
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.web.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public1.id, aws_subnet.public2.id]
    security_groups  = [aws_security_group.security_group.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.web.arn
    container_name   = local.web.ecs.container
    container_port   = local.web.port
  }
}