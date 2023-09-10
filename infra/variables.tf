variable "region" {
  default = "us-east"
}

variable "state_bucket" {
  default = ""
}

variable "state_key" {
  default = ""
}

variable "apex_domain" {
  default = "dustinvorac.com"
}

variable "db_username" {
  default = "postgres"
}

variable "db_password" {
  default = "postgres"
}

variable "image" {
  type    = string
  default = "image"
}
