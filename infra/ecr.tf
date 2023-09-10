data "aws_ecr_repository" "migrate" {
  name = "dvorac-ukol-migrate"
}

data "aws_ecr_repository" "api" {
  name = "dvorac-ukol-api"
}