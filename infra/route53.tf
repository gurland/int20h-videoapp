resource "aws_route53_zone" "main" {
  name = var.domain
}

//resource "aws_route53_record" "www" {
//  zone_id = aws_route53_zone.main.zone_id
//  name = var.domain
//  type = "A"
//  alias {
//    name = aws_s3_bucket.website_bucket.website_domain
//    zone_id = aws_s3_bucket.website_bucket.hosted_zone_id
//    evaluate_target_health = false
//  }
//}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.main.zone_id
  name = var.domain
  type = "A"
  alias {
    name = aws_cloudfront_distribution.prod_distribution.domain_name
    zone_id = aws_cloudfront_distribution.prod_distribution.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "cert_validation" {
//  for_each = aws_acm_certificate.cert.domain_validation_options

  for_each = {
    for dvo in aws_acm_certificate.cert.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  name            = each.value.name
  records         = [each.value.record]
  type            = each.value.type

  zone_id = aws_route53_zone.main.zone_id
  ttl = 60
}