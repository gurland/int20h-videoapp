resource "aws_ecr_repository" "api_gateway" {
  name                 = var.api_ecr_repo
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = false
  }
}