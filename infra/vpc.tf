resource "aws_vpc" "main" {
  cidr_block = local.vpc_cidr
  enable_dns_hostnames = true
}

### subnets ###

resource "aws_subnet" "public1" {
  vpc_id = aws_vpc.main.id
  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, 1)
  availability_zone = "us-east-1d"
}

resource "aws_subnet" "public2" {
  vpc_id = aws_vpc.main.id
  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, 2)
  availability_zone = "us-east-1e"
}

resource "aws_subnet" "private1" {
  vpc_id = aws_vpc.main.id
  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, 3)
  availability_zone = "us-east-1e"
}

resource "aws_subnet" "private2" {
  vpc_id = aws_vpc.main.id
  cidr_block = cidrsubnet(aws_vpc.main.cidr_block, 8, 4)
  availability_zone = "us-east-1e"
}

### internet gateway ###

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.app_vpc.id
}

### route tables ###

resource "aws_route_table" "igw_route_table" {
  vpc_id = aws_vpc.main.id
  route = {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }
}

resource "aws_route_table_association" "public1_route" {
 subnet_id      = aws_subnet.public1.id
 route_table_id = aws_route_table.igw_route_table.id
}

resource "aws_route_table_association" "public2_route" {
 subnet_id      = aws_subnet.public2.id
 route_table_id = aws_route_table.igw_route_table.id
}

### security groups ###

resource "aws_security_group" "security_group" {
 name   = "ecs-security-group"
 vpc_id = aws_vpc.main.id

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

# resource "aws_route_table" "public" {
#   vpc_id = aws_vpc.app_vpc.id
#   tags = {
#     "Name" = "public"
#   }
# }

# resource "aws_route_table" "private" {
#   vpc_id = aws_vpc.app_vpc.id
#   tags = {
#     "Name" = "private"
#   }
# }

# resource "aws_route_table_association" "public_d_subnet" {
#   subnet_id      = aws_subnet.public_d.id
#   route_table_id = aws_route_table.public.id
# }

# resource "aws_route_table_association" "private_d_subnet" {
#   subnet_id      = aws_subnet.private_d.id
#   route_table_id = aws_route_table.private.id
# }

# resource "aws_route_table_association" "public_e_subnet" {
#   subnet_id      = aws_subnet.public_e.id
#   route_table_id = aws_route_table.public.id
# }

# resource "aws_route_table_association" "private_e_subnet" {
#   subnet_id      = aws_subnet.private_e.id
#   route_table_id = aws_route_table.private.id
# }

# resource "aws_eip" "nat" {
#   vpc = true
# }

# resource "aws_internet_gateway" "igw" {
#   vpc_id = aws_vpc.app_vpc.id
# }

# resource "aws_nat_gateway" "ngw" {
#   subnet_id     = aws_subnet.public_d.id
#   allocation_id = aws_eip.nat.id

#   depends_on = [aws_internet_gateway.igw]
# }

# resource "aws_route" "public_igw" {
#   route_table_id         = aws_route_table.public.id
#   destination_cidr_block = "0.0.0.0/0"
#   gateway_id             = aws_internet_gateway.igw.id
# }

# resource "aws_route" "private_ngw" {
#   route_table_id         = aws_route_table.private.id
#   destination_cidr_block = "0.0.0.0/0"
#   nat_gateway_id         = aws_nat_gateway.ngw.id
# }

# resource "aws_security_group" "http" {
#   name        = "http"
#   description = "HTTP traffic"
#   vpc_id      = aws_vpc.app_vpc.id

#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "TCP"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_security_group" "https" {
#   name        = "https"
#   description = "HTTPS traffic"
#   vpc_id      = aws_vpc.app_vpc.id

#   ingress {
#     from_port   = 443
#     to_port     = 443
#     protocol    = "TCP"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_security_group" "egress_all" {
#   name        = "egress-all"
#   description = "Allow all outbound traffic"
#   vpc_id      = aws_vpc.app_vpc.id

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# resource "aws_security_group" "ingress_api" {
#   name        = "ingress-api"
#   description = "Allow ingress to API"
#   vpc_id      = aws_vpc.app_vpc.id

#   ingress {
#     from_port   = 3000
#     to_port     = 3000
#     protocol    = "TCP"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }


# module "vpc" {
#   source  = "terraform-aws-modules/vpc/aws"
#   version = "~> 5.1.2"

#   name = "ukol-vpc"
#   cidr = local.vpc_cidr
#   azs = local.azs

#   create_igw = true # Expose public subnetworks to the Internet

#   private_subnets     = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k)]
#   public_subnets      = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 4)]
#   database_subnets    = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 8)]

#   private_subnet_names  = ["private1", "private2"]
#   public_subnet_names   = ["public1", "public2"]
#   database_subnet_names = ["public1", "public2"]

#   create_database_subnet_group  = false
#   manage_default_network_acl    = false
#   manage_default_route_table    = false
#   manage_default_security_group = false

#   enable_dns_hostnames = true
#   enable_dns_support   = true

#   enable_nat_gateway = true
#   single_nat_gateway = true

#   enable_vpn_gateway = true
# }

# module "vpc_endpoints" {
#   source = "terraform-aws-modules/vpc/aws//modules/vpc-endpoints"
#   version = "~> 5.1.2"

#   vpc_id = module.vpc.vpc_id

#   create_security_group      = true
#   security_group_name_prefix = "ukol-vpc-endpoints-"
#   security_group_description = "VPC endpoint security group"
#   security_group_rules = {
#     ingress_https = {
#       description = "HTTPS from VPC"
#       cidr_blocks = [module.vpc.vpc_cidr_block]
#     }
#   }

#   endpoints = {
#     ecs = {
#       service             = "ecs"
#       private_dns_enabled = true
#       subnet_ids          = module.vpc.private_subnets
#     },
#     ecs_telemetry = {
#       create              = false
#       service             = "ecs-telemetry"
#       private_dns_enabled = true
#       subnet_ids          = module.vpc.private_subnets
#     },
#     ecr_api = {
#       service             = "ecr.api"
#       private_dns_enabled = true
#       subnet_ids          = module.vpc.private_subnets
#       policy              = data.aws_iam_policy_document.generic_endpoint_policy.json
#     },
#     ecr_dkr = {
#       service             = "ecr.dkr"
#       private_dns_enabled = true
#       subnet_ids          = module.vpc.private_subnets
#       policy              = data.aws_iam_policy_document.generic_endpoint_policy.json
#     },
#     rds = {
#       service             = "rds"
#       private_dns_enabled = true
#       subnet_ids          = module.vpc.private_subnets
#       security_group_ids  = [aws_security_group.rds.id]
#     },
#   }
# }

# data "aws_iam_policy_document" "generic_endpoint_policy" {
#   statement {
#     effect    = "Deny"
#     actions   = ["*"]
#     resources = ["*"]

#     principals {
#       type        = "*"
#       identifiers = ["*"]
#     }

#     condition {
#       test     = "StringNotEquals"
#       variable = "aws:SourceVpc"

#       values = [module.vpc.vpc_id]
#     }
#   }
# }

# resource "aws_security_group" "rds" {
#   name_prefix = "ukol-rds"
#   description = "Allow PostgreSQL inbound traffic"
#   vpc_id      = module.vpc.vpc_id

#   ingress {
#     description = "TLS from VPC"
#     from_port   = 5432
#     to_port     = 5432
#     protocol    = "tcp"
#     cidr_blocks = [module.vpc.vpc_cidr_block]
#   }
# }

# resource "aws_vpc" "vpc" {
#   cidr_block = local.vpc_cidr
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

# variable "private_subnets" {
#   default = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k)]
# }

# variable "web_subnets" {
#   default = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 4)]
# }

# variable "db_subnets" {
#   default = [for k, v in local.azs : cidrsubnet(local.vpc_cidr, 8, k + 8)]
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
