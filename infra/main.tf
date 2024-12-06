terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 5.0"
    }
  }

  backend "s3" {
    # provided by -backend-config flags during "terraform init". see `.github/workflows`
  }
}

provider "aws" {
  region = var.region

  default_tags {
    tags = {
      project = "ukol"
    }
  }
}

locals {
  vpc = {
    cidr = "10.0.0.0/16"
  }
  security = {
    sg_1 = "ecs-security-group"
  }
  port = 3333
  ecs = {
    cluster   = "ukol-api-cluster"
    task      = "ukol-api-task"
    container = "ukol-api-container"
  }
  alb = {
    name         = "ukol-api-alb"
    target_group = "ukol-api-target-group"
  }
}
