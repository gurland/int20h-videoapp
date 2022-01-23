output "s3_bucket_domain" {
  value = aws_s3_bucket.file_bucket.bucket_domain_name
}