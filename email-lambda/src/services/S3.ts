import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"

export const getS3Document = async(bucket: string, key: string) => {
  console.log(bucket, key)
  try{
    const params = {
      Bucket: bucket,
      Key: key,
    }
    const client = new S3Client({ region: "eu-west-2" })
    const command = new GetObjectCommand(params)


    const { ContentType } = await client.send(command)
    console.log('CONTENT TYPE:', ContentType);

    return ContentType;
  }catch (err) {
    console.log(err);
    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    throw new Error(message);
}
}
