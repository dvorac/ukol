variable "api_subdomain" {
  default = "ukol-api"
}

data "aws_route53_zone" "domain" {
  provider = aws
  name     = "${var.apex_domain}."
}

resource "aws_route53_record" "ipv4" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${var.api_subdomain}.${var.apex_domain}"
  type    = "A"

  alias {
    name                   = module.app_alb.lb_dns_name
    zone_id                = module.app_alb.lb_zone_id
    evaluate_target_health = false
  }
}