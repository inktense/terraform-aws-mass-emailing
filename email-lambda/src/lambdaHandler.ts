import { Handler, S3Event, Context } from "aws-lambda"

import { getS3Document } from "./services/S3"
import { getAllData } from "./services/dynamodb"

export const handler: Handler = async (event: S3Event, context: Context): Promise<void> => {

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  console.log("event => ", event, "context => ", context)
  try {
    await getS3Document(bucket, key)
    const emails = await getAllData()
    console.log("hello emails => ", emails)
  } catch (err) {
    console.error(`Error`)
    throw Error(err as string)
  }
}
