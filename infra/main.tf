provider "aws" {
  region = "eu-central-1"
  profile = "personal"
}

provider "aws" {
  region = "us-east-1"
  alias = "us"
  profile = "personal"
}

terraform {
  backend "s3" {
    bucket = "videoapp-infra-state"
    key = "infra/terraform.tfstate"
    region = "eu-central-1"
    profile = "personal"
  }
}