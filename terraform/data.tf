# Archiving the Lambda function
data "archive_file" "lambda_zip" {
  type        = "zip"
  source_dir  = "${path.module}./email-lambda/dist"
  output_path = "${path.module}/builds/lambda.zip"
}

# locals {
#  package_url = "https://github.com/antonbabenko/terraform-aws-anything/archive/master.zip"
#  lamb  = "downloaded_package_${md5(local.package_url)}.zip"
# }

# data "null_data_source" "lambda_package" {
#  inputs = {
#    id       = "./builds/lambda.zip"
#    filename = "lambda.zip"
#  }
# }
