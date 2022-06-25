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

variable "tags" {
  description = "A map containing all the mandatory tags for the resources."
  type        = map(string)

  default = {
    Initialised = "20220617"
  }
}

variable "email" {
  description = "Ses email identity."
  type        = string
}
