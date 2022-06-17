module "lambda_emails_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "${var.project_prefix}-lambda"
  description   = "aws-mass-emailing-lambda"
  handler       = "lambdaHandler.handler"
  runtime       = "nodejs14.x"

  create_package         = false
  local_existing_package = "./builds/lambda.zip"
  # source_path = "../src/lambda-function1"

  tags = local.tags

  depends_on = [data.archive_file.lambda_zip]
}
