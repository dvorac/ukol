resource "aws_db_instance" "db" {
  engine = "postgres"
  engine_version = "13.7"

  db_name = "ukoldb"

  instance_class = "db.t3.micro"

  storage_type = "gp2"
  allocated_storage = 30

  db_subnet_group_name = module.vpc.database_subnet_group_name
  vpc_security_group_ids = [ module.vpc.default_security_group_id ]

  multi_az = false

  port = 5432
  username = var.db_username
  password = var.db_password

  skip_final_snapshot = true
}