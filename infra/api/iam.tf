# data "aws_iam_policy_document" "sts" {
#   statement {
#     actions = [ "sts:AssumeRole" ]

#     principals {
#       type = "Service"
#       identifiers = [ "ecs-tasks.amazonaws.com" ]
#     }
#   }
# }

# data "aws_iam_policy_document" "logs" {
#   statement {
#     actions = [
#       "logs:CreateLogStream",
#       "logs:PutLogEvents",
#       "logs:PutLogEventsBatch",
#     ]
#     resources = [
#       "arn:aws:logs:${var.region}:*:log-group:/ecs/ukol:*"
#     ]
#   }
# }

# resource "aws_iam_policy" "logs" {
#   name = "ecs_logs_policy"
#   policy = data.aws_iam_policy_document.logs.json
# }

# data "aws_iam_policy" "ecs_ecr_access" {
#   arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
# }

# resource "aws_iam_role" "execution" {
#   name = "ukol-ecs-execution-role"
#   assume_role_policy = data.aws_iam_policy_document.sts.json
# }

# resource "aws_iam_role_policy_attachment" "logs" {
#   role = aws_iam_role.execution.name
#   policy_arn = aws_iam_policy.logs.arn
# }

# resource "aws_iam_role_policy_attachment" "ecs_ecr_access" {
#   role = aws_iam_role.execution.name
#   policy_arn = data.aws_iam_policy.ecs_ecr_access.arn
# }