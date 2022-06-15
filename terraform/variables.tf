variable "aws_region" {
  description = "Region where main resources should be created."
  type        = string
  default     = "eu-west-2"
}

variable "project_prefix" {
  description = "Project prefix for naming resources."
  type        = string
  default     = "aws-mass-emailing"
}
