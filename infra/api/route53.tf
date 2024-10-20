variable "api_subdomain" {
  default = "ukol-api"
}

resource "aws_route53_record" "ipv4" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${var.api_subdomain}.${var.apex_domain}"
  type    = "A"

  alias {
    name                   = module.app_alb.dns_name
    zone_id                = module.app_alb.zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "ipv6" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "${var.api_subdomain}.${var.apex_domain}"
  type    = "AAAA"

  alias {
    name                   = module.app_alb.dns_name
    zone_id                = module.app_alb.dns_name
    evaluate_target_health = false
  }
}