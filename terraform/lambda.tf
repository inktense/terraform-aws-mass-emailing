module "lambda_emails_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "${var.project_prefix}-lambda"
  description   = "aws-mass-emailing-lambda"
  handler       = "lambdaHandler.handler"
  runtime       = "nodejs14.x"
  publish       = true

  # store_on_s3 = true
  # s3_bucket   = module.lambda_zip_s3_bucket.s3_bucket_id
  create_package      = false
  local_existing_package = "./builds/lambda.zip"
  # s3_existing_package = {
  #   bucket = module.lambda_zip_s3_bucket.s3_bucket_id
  #   key    = aws_s3_object.file_upload.id
  # }
  # create_package         = false
  # local_existing_package = data.null_data_source.lambda_package.outputs["filename"]

  attach_policy_statements = true
  policy_statements = {
    s3_read = {
      effect    = "Allow",
      actions   = ["s3:GetObject"],
      resources = ["${module.s3_bucket.s3_bucket_arn}/*"]
    }
  }

  environment_variables = {
    REGION      = var.aws_region,
    EMAIL_TABLE = module.dynamodb_email_table.dynamodb_table_id
  }

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
