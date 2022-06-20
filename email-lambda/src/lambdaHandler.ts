import { Handler, S3Event, Context } from "aws-lambda"

import { getS3Document } from "./services/S3"

export const handler: Handler = async (event: S3Event, context: Context): Promise<void> => {

  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

  console.log("event => ", event, "context => ", context)
  try {
    await getS3Document(bucket, key)
    console.log("hello world")
  } catch (err) {
    console.error(`Error`)
    throw Error(err)
  }
}
