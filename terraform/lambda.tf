module "lambda_emails_function" {
  source = "terraform-aws-modules/lambda/aws"

  function_name = "${var.project_prefix}-lambda"
  description   = "aws-mass-emailing-lambda"
  handler       = "index.lambda_handler"
  runtime       = "python3.8"

  source_path = "../src/lambda-function1"

  tags = {
    Name = "my-lambda1"
  }
}
