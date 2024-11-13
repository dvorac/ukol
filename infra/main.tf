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
  cluster = "ukol"

  app = {
    container_name = "api-container"
    container_port = 3333
  }
}