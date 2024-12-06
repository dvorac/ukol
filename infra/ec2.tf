### alb ###

resource "aws_lb" "ecs_alb" {
  name               = local.alb.name
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = [aws_subnet.public1.id, aws_subnet.public2.id]

  depends_on = [aws_internet_gateway.ukol]
}

resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = local.port
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = local.alb.target_group
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.ukol.id

  health_check {
    port = local.port
    path = "/api"
  }
}