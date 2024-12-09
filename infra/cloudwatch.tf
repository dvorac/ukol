resource "aws_cloudwatch_log_group" "api" {
  name = "/ukol/api"
}

resource "aws_cloudwatch_log_group" "web" {
  name = "/ukol/web"
}