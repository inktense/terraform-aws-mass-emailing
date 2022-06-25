import { Handler, S3Event, Context } from "aws-lambda"

import { getS3Document } from "./services/S3"
import { getAllData } from "./services/dynamodb"
import { sendEmail } from "./services/ses"

import { EmailObj } from "./constants/types"

if (!process.env.EMAIL_TABLE) {
  console.warn("Environment variable EMAIL_TABLE is missing using default.")
}

export const handler: Handler = async (event: S3Event, context: Context): Promise<void> => {

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  try {
    const attachment = await getS3Document(bucket, key)
    console.log("attachment ", attachment)

    const emails = await getAllData(process.env.EMAIL_TABLE || '') as EmailObj[]

    await Promise.all(emails.map(async (email: EmailObj) => {
      const result = await sendEmail(email.email, attachment)
      if (result) {
        console.log({ envelope: result.envelope, messageId: result.messageId })
      }
    }))
    .catch(function(err) {
      console.log(err.message); 
    });
    console.log("hello emails => ", emails)
  } catch (err) {
    console.error(`Error`)
    throw Error(err as string)
  }
}
