#!/bin/sh

#  terraform init    # Only needed on the first time running Terraform

yarn tf-next      # Build the next.js app
terraform plan    # See what resources Terraform will create
terraform apply   # Deploy the App to your AWS account