# resource "aws_ecs_task_definition" "migrate" {
#   family = "migrate"

#   requires_compatibilities = [ "FARGATE" ]
#   cpu = "256" # 0.25 vCPU
#   memory = "1024" # 1GB memory
#   network_mode = "awsvpc"

#   container_definitions = jsonencode([
#     {
#       name = "db-migrate"
#       image = "${data.aws_ecr_repository.migrate.repository_url}"
#       cpu = 256
#       memory = 1024
#       essential = false
#       logConfiguration = {
#         logDriver = "awslogs"
#         options = {
#           awslogs-group = "/ecs/ukol"
#           awslogs-region = "${var.region}"
#           awslogs-stream-prefix = "ecs"
#         }
#       },
#       environment = [
#         {
#           name = "DB_CONNECTION_STRING",
#           value = "postgres://${var.db_username}:${var.db_password}@${aws_db_instance.db.endpoint}"
#         }
#       ]
#     }
#   ])

#   execution_role_arn = aws_iam_role.execution.arn
# }