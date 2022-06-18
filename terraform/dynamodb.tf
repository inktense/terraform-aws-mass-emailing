module "dynamodb_email_table" {
  source = "terraform-aws-modules/dynamodb-table/aws"

  name                           = "${var.project_prefix}-email-table"
  billing_mode                   = "PAY_PER_REQUEST"
  point_in_time_recovery_enabled = false
  server_side_encryption_enabled = true
  stream_enabled                 = false
  hash_key                       = "id"

  attributes = [
    {
      name = "id"
      type = "S"
    }
  ]

  tags = local.tags
}
