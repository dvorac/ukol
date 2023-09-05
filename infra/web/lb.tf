resource "aws_lb" "lb" {
  name = "ukol-lb"
  subnets = aws_subnet.public[*].id
  security_groups = [ aws_security_group.lb.id ]
}

resource "aws_lb_target_group" "lb" {
  name = "ukol-lb-group"
  port = 3333
  protocol = "HTTP"
  vpc_id = aws_vpc.vpc.id
  target_type = "ip"
  health_check {
    path = "/info"
    matcher = "200,301,302"
  }
}

resource "aws_lb_listener" "lb" {
  load_balancer_arn = aws_lb.lb.id
  port = "443"
  protocol = "HTTPS"
  certificate_arn = data.aws_acm_certificate.cert.arn

  default_action {
    target_group_arn = aws_lb_target_group.lb.id
    type = "forward"
  }
}