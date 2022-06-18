module "lambda_emails_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "${var.project_prefix}-lambda"
  description   = "aws-mass-emailing-lambda"
  handler       = "lambdaHandler.handler"
  runtime       = "nodejs14.x"
  publish = true

  create_package         = false
  local_existing_package = "./builds/lambda.zip"

  tags = local.tags

  depends_on = [data.archive_file.lambda_zip]
}

# Create permission for S3 trigger
resource "aws_lambda_permission" "s3_object_create_permission" {
  statement_id  = "AllowS3Invoke"
  action        = "lambda:InvokeFunction"
  function_name = module.lambda_emails_function.lambda_function_name
  principal     = "s3.amazonaws.com"
  source_arn    = "arn:aws:s3:::${module.s3_bucket.s3_bucket_id}"
}
