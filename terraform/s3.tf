module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "${var.project_prefix}-attachment-bucket"
  # Access control lists enable you to manage access to buckets and objects. 
  acl = "private"

  versioning = {
    enabled = true
  }

  # Enable S3 SSE  
  server_side_encryption_configuration = {
    rule = {
      apply_server_side_encryption_by_default = {
        sse_algorithm = "AES256"
      }
    }
  }

  lifecycle_rule = [
    {
      id     = "expiration_rule"
      status = "Enabled"

      noncurrent_version_expiration = {
        noncurrent_days = 30
      }
    }
  ]

  tags = local.tags

}

# Trigger lambda when .pdf file is added in Bucket
resource "aws_s3_bucket_notification" "aws_lambda_trigger" {
  bucket = module.s3_bucket.s3_bucket_id
  lambda_function {
    lambda_function_arn = module.lambda_emails_function.lambda_function_arn
    events              = ["s3:ObjectCreated:*"]
    filter_suffix       = ".pdf"
  }

  depends_on = [aws_lambda_permission.s3_object_create_permission]
}
