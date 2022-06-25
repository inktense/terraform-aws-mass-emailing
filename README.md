# terraform-aws-mass-emailing
This project aims to send mass e-mails to a list of users. To develop a cost-effective mass-mailing and serverless platform, you can combine AWS Lambda with Simple Email Service (SES), S3 and DynamoDB. As soon as a PDF file is uploaded, it will trigger an S3 event. A Lambda function will be invoked that will send the pdf as an email attachment to all the users stored in DynamoDB.

![mass emailing diagram](assets/aws_mass_emailing.drawio.png)

---------------------------------------------------------------

## Pre-requisites

Only using AWS services, an AWS account is required.

You will need to install [Terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli).

**Other requirements**
- Node
- Git
- TypeScript

---------------------------------------------------------------




----------------------------------------------------------------
## Deploying to the cloud
If you want to use Terraform with an AWS profile use the following command:

```
export AWS_PROFILE= <profile>
```
Otherwise folow one of these [instructions](https://registry.terraform.io/providers/hashicorp/aws/latest/docs) .
```
cd terraform 

tf init 
tf plan 
tf apply
```
In order to tear down the entire infrastructure use 
```
tf destroy
```




run projecd

cd email-lambda
npm i
npm build

cd ../terraform
