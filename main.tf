# main.tf

terraform {
  cloud {
    organization = "BigEyes"
    workspaces {
      name = "bigeyes-characters"
    }
  }
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

# Main region where the resources should be created in
# (Should be close to the location of your viewers)
provider "aws" {
  region = "eu-west-2"
}

# Provider used for creating the Lambda@Edge function which must be deployed
# to us-east-1 region (Should not be changed)
provider "aws" {
  alias  = "global_region"
  region = "us-east-1"
}

variable "custom_domain" {
  description = "Your custom domain"
  type        = string
  default     = "characters.bigeyes.space"
}

###########
# Locals
###########

locals {
  aliases = [var.custom_domain]
  # If you need a wildcard domain(ex: *.example.com), you can add it like this:
  # aliases = [var.custom_domain, "*.${var.custom_domain}"]
}

##########################
# Terraform Next.js Module
##########################

variable "DATABASE_URL" {
  type = string
}

module "tf_next" {
  source = "milliHQ/next-js/aws"

  cloudfront_aliases             = local.aliases
  # cloudfront_acm_certificate_arn = module.cloudfront_cert.acm_certificate_arn
  cloudfront_acm_certificate_arn = "arn:aws:acm:us-east-1:592953950381:certificate/965526a1-4865-4e87-b933-fdc3924b34c1"

  deployment_name = "bigeyes-characters"
  providers = {
    aws.global_region = aws.global_region
  }

  lambda_environment_variables = {
    DATABASE_URL = var.DATABASE_URL
  }
}

#########
# Outputs
#########

output "cloudfront_domain_name" {
  value = module.tf_next.cloudfront_domain_name
}

output "custom_domain_name" {
  value = var.custom_domain
}