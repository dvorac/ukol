locals {
  vpc_cidr = "10.0.0.0/16"
}

### vpc ###

resource "aws_vpc" "ukol" {
  cidr_block           = local.vpc_cidr
  enable_dns_hostnames = true
}

### igw ###

resource "aws_internet_gateway" "ukol" {
  vpc_id = aws_vpc.ukol.id
}

### subnets ###

resource "aws_subnet" "public1" {
  vpc_id                  = aws_vpc.ukol.id
  cidr_block              = cidrsubnet(aws_vpc.ukol.cidr_block, 8, 1)
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
}

resource "aws_subnet" "public2" {
  vpc_id                  = aws_vpc.ukol.id
  cidr_block              = cidrsubnet(aws_vpc.ukol.cidr_block, 8, 2)
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"
}

resource "aws_subnet" "private1" {
  vpc_id                  = aws_vpc.ukol.id
  cidr_block              = cidrsubnet(aws_vpc.ukol.cidr_block, 8, 3)
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1a"
}

resource "aws_subnet" "private2" {
  vpc_id                  = aws_vpc.ukol.id
  cidr_block              = cidrsubnet(aws_vpc.ukol.cidr_block, 8, 4)
  map_public_ip_on_launch = true
  availability_zone       = "us-east-1b"
}

### nat ###

resource "aws_eip" "eip_gw1" {
  domain = "vpc"
  depends_on = [ aws_internet_gateway.ukol ]
}

resource "aws_eip" "eip_gw2" {
  domain = "vpc"
  depends_on = [ aws_internet_gateway.ukol ]
}

resource "aws_nat_gateway" "gw1" {
  subnet_id = aws_subnet.public1.id
  allocation_id = aws_eip.eip_gw1.id
}

resource "aws_nat_gateway" "gw2" {
  subnet_id = aws_subnet.public2.id
  allocation_id = aws_eip.eip_gw2.id
}

### route tables, associations ###

resource "aws_route_table" "public1" {
  vpc_id = aws_vpc.ukol.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ukol.id
  }
}

resource "aws_route_table" "public2" {
  vpc_id = aws_vpc.ukol.id
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.ukol.id
  }
}

resource "aws_route_table_association" "public1" {
  subnet_id      = aws_subnet.public1.id
  route_table_id = aws_route_table.public1.id
}

resource "aws_route_table_association" "public2" {
  subnet_id      = aws_subnet.public2.id
  route_table_id = aws_route_table.public2.id
}

resource "aws_route_table" "private1" {
  vpc_id = aws_vpc.ukol.id
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.gw1.id
  }
}

resource "aws_route_table" "private2" {
  vpc_id = aws_vpc.ukol.id
  route {
    cidr_block = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.gw2.id
  }
}

resource "aws_route_table_association" "private1" {
  subnet_id      = aws_subnet.private1.id
  route_table_id = aws_route_table.private1.id
}

resource "aws_route_table_association" "private2" {
  subnet_id      = aws_subnet.private2.id
  route_table_id = aws_route_table.private2.id
}

### security groups ###

resource "aws_security_group" "security_group" {
  name   = "ecs-security-group"
  vpc_id = aws_vpc.ukol.id

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    self        = "false"
    cidr_blocks = ["0.0.0.0/0"]
    description = "any"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}