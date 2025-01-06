### aws region ###

variable "region" {
  default = "us-east-1"
}

### terraform state ###

variable "state_bucket" {
  default = ""
}

variable "state_key" {
  default = ""
}

### domain ###

variable "apex_domain" {
  default = "dustinvorac.com"
}

variable "web_subdomain" {
  default = "ukol"
}

variable "api_subdomain" {
  default = "ukol-api"
}

### database security ###

variable "db_username" {
  default = "postgres"
}

variable "db_password" {
  default = "postgres"
}