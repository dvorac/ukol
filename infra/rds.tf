resource "aws_db_instance" "ukol" {
  allocated_storage    = 10
  db_name              = "ukol"
  engine               = "postgres"
  engine_version       = "17.1"
  instance_class       = "db.t3.micro"
  username             = "postgres"
  password             = "postgres"
  port = 5432
  skip_final_snapshot  = true
  db_subnet_group_name = aws_db_subnet_group.ukol.name
  vpc_security_group_ids = [ aws_security_group.security_group.id ]
  parameter_group_name = aws_db_parameter_group.ukol.name
}

resource "aws_db_subnet_group" "ukol" {
  name = "ukol-db-subnet-group"
  subnet_ids = [ aws_subnet.private1.id, aws_subnet.private2.id ]
}

resource "aws_db_parameter_group" "ukol" {
  name = "ukol-db-parameter-group"
  family = "postgres17"

  parameter {
    name = "rds.force_ssl"
    value = 0
  }
}