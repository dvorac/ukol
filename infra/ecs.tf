resource "aws_ecs_cluster" "cluster" {
  name = "ukol-cluster"
}

resource "aws_cloudwatch_log_group" "logs" {
  name = "/ecs/ukol"
}