import { Handler, S3Event, Context } from "aws-lambda"

import { getS3Document } from "./services/S3"
import { getAllData } from "./services/dynamodb"

if (!process.env.EMAIL_TABLE) {
  console.warn("Environment variable EMAIL_TABLE is missing using default.")
}

export const handler: Handler = async (event: S3Event, context: Context): Promise<void> => {

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  console.log("event => ", event, "context => ", context)
  try {
    const attachment = await getS3Document(bucket, key)
    
    const emails = await getAllData(process.env.EMAIL_TABLE || '')
    console.log("hello emails => ", emails)
  } catch (err) {
    console.error(`Error`)
    throw Error(err as string)
  }
}
