### api - alb ###

resource "aws_lb" "api" {
  name               = local.api.alb.name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = [aws_subnet.public1.id, aws_subnet.public2.id]

  depends_on = [aws_internet_gateway.ukol]
}

resource "aws_lb_listener" "api" {
  load_balancer_arn = aws_lb.api.arn
  port              = local.api.port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }
}

resource "aws_lb_target_group" "api" {
  name        = local.api.alb.target_group
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.ukol.id

  health_check {
    port = local.api.port
    path = "/api"
  }
}

### web - alb ###

resource "aws_lb" "web" {
  name               = local.web.alb.name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = [aws_subnet.public1.id, aws_subnet.public2.id]

  depends_on = [aws_internet_gateway.ukol]
}

resource "aws_lb_listener" "web" {
  load_balancer_arn = aws_lb.web.arn
  port              = local.web.port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }
}

resource "aws_lb_target_group" "web" {
  name        = local.web.alb.target_group
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.ukol.id

  health_check {
    port = local.web.port
    path = "/health"
  }
}