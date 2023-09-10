
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "~> 5.1.2"

  azs                = slice(data.aws_availability_zones.available.names, 0, 2) # Span subnetworks across 2 availability zones
  cidr               = "10.0.0.0/16"
  create_igw         = true # Expose public subnetworks to the Internet
  enable_nat_gateway = true # Hide private subnetworks behind NAT Gateway
  private_subnets    = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets     = ["10.0.3.0/24", "10.0.4.0/24"]
  single_nat_gateway = true
}

# resource "aws_vpc" "vpc" {
#   cidr_block = "10.0.0.0/16"
#   enable_dns_hostnames = true
# }

# resource "aws_internet_gateway" "gateway" {
#   vpc_id = aws_vpc.vpc.id
# }

# resource "aws_nat_gateway" "ngw" {
#   subnet_id     = aws_subnet.public_a.id
#   allocation_id = aws_eip.nat.id
#   depends_on = [aws_internet_gateway.gateway]
# }

# # subnets

# variable "app_subnets" {
#   type = list(string)
#   default = [
#     "10.0.1.0/24",
#     "10.0.2.0/24"
#   ]
# }

# variable "web_subnets" {
#   type = list(string)
#   default = [
#     "10.0.3.0/24",
#     "10.0.4.0/24"
#   ]
# }

# variable "db_subnets" {
#   type = list(string)
#   default = [
#     "10.0.5.0/24",
#     "10.0.6.0/24"
#   ]
# }

# resource "aws_subnet" "app" {
#   count = length(var.app_subnets)
#   vpc_id = aws_vpc.vpc.id
#   cidr_block = var.app_subnets[count.index]
#   availability_zone = data.aws_availability_zones.available.names[count.index]
# }

# resource "aws_subnet" "web" {
#   count = length(var.web_subnets)
#   vpc_id = aws_vpc.vpc.id
#   cidr_block = var.web_subnets[count.index]
#   availability_zone = data.aws_availability_zones.available.names[count.index]
# }

# resource "aws_subnet" "db" {
#   count = length(var.db_subnets)
#   vpc_id = aws_vpc.vpc.id
#   cidr_block = var.db_subnets[count.index]
#   availability_zone = data.aws_availability_zones.available.names[count.index]
# }

# resource "aws_route_table" "public" {
#   vpc_id = aws_vpc.vpc.id
#   route {
#     cidr_block = "0.0.0.0/0"
#     gateway_id = aws_internet_gateway.gateway.id
#   }
# }

# # route tables

# resource "aws_subnet" "web" {
#   count = length(var.private_subnets)
#   vpc_id = aws_vpc.vpc.id
#   cidr_block = var.private_subnets[count.index]
#   availability_zone = data.aws_availability_zones.available.names[count.index]
# }

# resource "aws_route_table_association" "public" {
#   count = length(var.public_subnets)
#   route_table_id = aws_route_table.public.id
#   subnet_id = aws_subnet.public[count.index].id
# }

# resource "aws_route_table" "private" {
#   vpc_id = aws_vpc.vpc.id
# }

# resource "aws_route_table_association" "private" {
#   count = length(var.private_subnets)
#   route_table_id = aws_route_table.private.id
#   subnet_id = aws_subnet.private[count.index].id
# }

# resource "aws_security_group" "app_lb" {
#   name = "ukol_lb_sg"
#   vpc_id = aws_vpc.vpc.id
#   ingress {
#     from_port = "443"
#     to_port = "443"
#     protocol = "tcp"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
#   egress {
#     from_port = "0"
#     to_port = "0"
#     protocol = "-1"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
# }

# resource "aws_security_group" "app_ecs" {
#   name = "ukol_ecs_sg"
#   vpc_id = aws_vpc.vpc.id
#   ingress {
#     from_port = "3333"
#     to_port = "3333"
#     protocol = "tcp"
#     security_groups = [ aws_security_group.lb.id ]
#   }
#   egress {
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
# }

# resource "aws_security_group" "app_lb" {
#   name = "ukol_lb_sg"
#   vpc_id = aws_vpc.vpc.id
#   ingress {
#     from_port = "443"
#     to_port = "443"
#     protocol = "tcp"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
#   egress {
#     from_port = "0"
#     to_port = "0"
#     protocol = "-1"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
# }

# resource "aws_security_group" "web_ecs" {
#   name = "ukol_ecs_sg"
#   vpc_id = aws_vpc.vpc.id
#   ingress {
#     from_port = "80"
#     to_port = "80"
#     protocol = "tcp"
#     security_groups = [ aws_security_group.lb.id ]
#   }
#   egress {
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
# }

# resource "aws_security_group" "db" {
#   name = "ukol_db_sg"
#   vpc_id = aws_vpc.vpc.id
#   ingress {
#     from_port = "5432"
#     to_port = "5432"
#     protocol = "tcp"
#     security_groups = [ aws_security_group.ecs.id ]
#   }
#   egress {
#     from_port = 0
#     to_port = 0
#     protocol = "-1"
#     cidr_blocks = [ "0.0.0.0/0" ]
#   }
# }

# resource "aws_db_subnet_group" "db" {
#   subnet_ids = aws_subnet.private[*].id
# }