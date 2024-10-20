data "aws_route53_zone" "domain" {
  provider = aws
  name     = "${var.apex_domain}."
}