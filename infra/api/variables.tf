variable "region" {
  default = "us-east-1"
}

variable "apex_domain" {
  default = "dustinvorac.com"
}

variable "vpc_cidr" {
  type = string
  default = "10.0.0.0/16"
}

variable "public_subnets" {
  type = list(string)
  default = [
    "10.0.1.0/24",
    "10.0.2.0/24"
  ]
}

variable "private_subnets" {
  type = list(string)
  default = [
    "10.0.3.0/24",
    "10.0.4.0/24"
  ]
}

variable "db_username" {
  default = "postgres"
}

variable "db_password" {
  default = "postgres"
}