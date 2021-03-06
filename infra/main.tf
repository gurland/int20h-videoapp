provider "aws" {
  region = "eu-central-1"
  profile = "personal"
  version = "=2.70.1"
}

terraform {
  backend "s3" {
    bucket = "videoapp-infra-state"
    key = "infra/terraform.tfstate"
    region = "eu-central-1"
    profile = "personal"
  }
}