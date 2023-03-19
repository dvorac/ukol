data "aws_route53_zone" "domain" {
  provider = aws
  name     = "${var.apex_domain}."
}

resource "aws_route53_record" "ipv4" {
  zone_id = data.aws_route53_zone.domain.zone_id
  name    = "ukol-api.${var.apex_domain}"
  type    = "A"

  alias {
    name                   = aws_lb.lb.dns_name
    zone_id                = aws_lb.lb.zone_id
    evaluate_target_health = false
  }
}