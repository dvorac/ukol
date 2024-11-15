locals {

}

### launch templates ###

#│ Error: creating Auto Scaling Group (terraform-20241113163855969900000004): operation error Auto Scaling: CreateAutoScalingGroup, https response error StatusCode: 400, RequestID: 632fac70-e5a4-4646-9d62-712ee1ec8bf6, api error ValidationError: You must use a valid fully-formed launch template. The image id '[ami-062c116e449466e7f]' does not exist

#│ Error: creating Auto Scaling Group (terraform-20241114144933704000000004): operation error Auto Scaling: CreateAutoScalingGroup,
# https response error StatusCode: 400, RequestID: 53741891-4d9a-4529-bd95-5f44ce95bf73, api error ValidationError:
# You must use a valid fully-formed launch template. The architecture 'x86_64' of the specified instance type does not match the architecture 'arm64'
# of the specified AMI. Specify an instance type and an AMI that have matching architectures, and try again. You can use 'describe-instance-types' or
# 'describe-images' to discover the architecture of the instance type or AMI.

#│ Error: creating Auto Scaling Group (terraform-20241114151046110800000004): operation error Auto Scaling: CreateAutoScalingGroup, https response error StatusCode: 400, RequestID: 38aec6a8-a5e6-496f-ade1-c9bf4fb8648b, api error ValidationError:
# You must use a valid fully-formed launch template. The key pair 'ec2ecsglog' does not exist

## ECS > Clusters > *cluster-name* > Deployments > Events
# service my-ecs-service failed to launch a task with (error ECS was unable to assume the role
# 'arn:aws:iam::115183919983:role/aws-service-role/ecs.amazonaws.com/AWSServiceRoleForECS' that was provided for this task.
# Please verify that the role being passed has the proper trust relationship and permissions and that your IAM user has permissions to pass this role.).

resource "aws_launch_template" "ecs_lt" {
  name_prefix   = "ecs-template"
  image_id      = "ami-063d43db0594b521b"
  instance_type = "t3.micro"


  vpc_security_group_ids = [aws_security_group.security_group.id]

  iam_instance_profile {
    arn = "arn:aws:iam::115183919983:instance-profile/ecs-instance-role"
  }

  block_device_mappings {
    device_name = "/dev/xvda"
    ebs {
      volume_size = 30
      volume_type = "gp2"
    }
  }

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name = "ecs-instance"
    }
  }

  user_data = filebase64("${path.module}/ecs.sh")
}

### autoscaling groups ###

resource "aws_autoscaling_group" "ecs_asg" {
  vpc_zone_identifier = [aws_subnet.subnet.id, aws_subnet.subnet2.id]
  desired_capacity    = 2
  max_size            = 3
  min_size            = 1

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "AmazonECSManaged"
    value               = true
    propagate_at_launch = true
  }
}

### alb ###

resource "aws_lb" "ecs_alb" {
  name               = "ecs-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.security_group.id]
  subnets            = [aws_subnet.subnet.id, aws_subnet.subnet2.id]

  tags = {
    Name = "ecs-alb"
  }
}

resource "aws_lb_listener" "ecs_alb_listener" {
  load_balancer_arn = aws_lb.ecs_alb.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.ecs_tg.arn
  }
}

resource "aws_lb_target_group" "ecs_tg" {
  name        = "ecs-target-group"
  port        = 80
  protocol    = "HTTP"
  target_type = "ip"
  vpc_id      = aws_vpc.main.id

  health_check {
    path = "/"
  }
}