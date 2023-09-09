# resource "aws_ecs_task_definition" "web" {
#   family = "web"

#   requires_compatibilities = [ "FARGATE" ]
#   cpu = "256" # 0.25 vCPU
#   memory = "1024" # 1GB memory
#   network_mode = "awsvpc"

#   container_definitions = jsonencode([
#     {
#       name = "web-container"
#       image = "${data.aws_ecr_repository.web.repository_url}"
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
#           name = "GQL",
#           value = "https://localhost:3333/graphql"
#         },
#         {
#           name = "API",
#           value = "http://localhost:3333/api"
#         }
#       ]
#     }
#   ])

#   execution_role_arn = aws_iam_role.execution.arn
# }