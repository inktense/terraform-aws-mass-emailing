# Archiving the Lambda function
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}./email-lambda/dist"
  output_path = "${path.module}/builds/lambda.zip"
}
