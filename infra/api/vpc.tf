resource "aws_vpc" "vpc" {
  cidr_block = var.vpc_cidr
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "gateway" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_subnet" "public" {
  count = length(var.public_subnets)
  vpc_id = aws_vpc.vpc.id
  cidr_block = var.public_subnets[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true
}

resource "aws_subnet" "private" {
  count = length(var.private_subnets)
  vpc_id = aws_vpc.vpc.id
  cidr_block = var.private_subnets[count.index]
  availability_zone = data.aws_availability_zones.available.names[count.index]
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.vpc.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gateway.id
  }
}

resource "aws_route_table_association" "public" {
  count = length(var.public_subnets)
  route_table_id = aws_route_table.public.id
  subnet_id = aws_subnet.public[count.index].id
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_route_table_association" "private" {
  count = length(var.private_subnets)
  route_table_id = aws_route_table.private.id
  subnet_id = aws_subnet.private[count.index].id
}

resource "aws_security_group" "lb" {
  name = "ukol_lb_sg"
  vpc_id = aws_vpc.vpc.id
  ingress {
    from_port = "443"
    to_port = "443"
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
  egress {
    from_port = "0"
    to_port = "0"
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
}

resource "aws_security_group" "ecs" {
  name = "ukol_ecs_sg"
  vpc_id = aws_vpc.vpc.id
  ingress {
    from_port = "3333"
    to_port = "3333"
    protocol = "tcp"
    security_groups = [ aws_security_group.lb.id ]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
}

resource "aws_security_group" "db" {
  name = "ukol_db_sg"
  vpc_id = aws_vpc.vpc.id
  ingress {
    from_port = "5432"
    to_port = "5432"
    protocol = "tcp"
    security_groups = [ aws_security_group.ecs.id ]
  }
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = [ "0.0.0.0/0" ]
  }
}

resource "aws_db_subnet_group" "db" {
  subnet_ids = aws_subnet.private[*].id
}