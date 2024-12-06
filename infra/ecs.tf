### cluster ###

resource "aws_ecs_cluster" "ecs_cluster" {
  name = local.ecs.cluster
}

### task definition ###

resource "aws_ecs_task_definition" "ecs_task_definition" {
  family                   = local.ecs.task
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
      name      = local.ecs.container
      image     = "${data.aws_ecr_repository.api.repository_url}:latest"
      essential = true
      portMappings = [
        {
          containerPort = local.port
          hostPort      = local.port
        }
      ]
    }
  ])
}

### service ###

resource "aws_ecs_service" "ecs_service" {
  name            = local.ecs.cluster
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_definition.arn
  desired_count   = 2
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = [aws_subnet.public1.id, aws_subnet.public2.id]
    security_groups  = [aws_security_group.security_group.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.ecs_tg.arn
    container_name   = local.ecs.container
    container_port   = local.port
  }
}