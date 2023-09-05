resource "aws_ecs_cluster" "ecs" {
  name = "ukol-cluster"
}

resource "aws_cloudwatch_log_group" "ecs_logs" {
  name = "/ecs/ukol"
}