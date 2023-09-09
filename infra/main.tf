terraform {
  backend "s3" {
    # provided by -backend-config flags during "terraform init"
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