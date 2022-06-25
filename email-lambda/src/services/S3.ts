import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: process.env.REGION });

export const getS3Document = async (bucket: string, key: string) => {
  console.log(bucket, key);
  try {
    const params = {
      Bucket: bucket,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const data = await client.send(command);
    
    return data;
  } catch (err) {
    console.log(err);
    const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
    console.log(message);
    throw new Error(message);
  }
};
