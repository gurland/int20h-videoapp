provider "aws" {
  region = "eu-central-1"
  profile = "personal"
}

provider "aws"{
  region = "us-east-1"
  alias = "us"
  profile = "personal"
}