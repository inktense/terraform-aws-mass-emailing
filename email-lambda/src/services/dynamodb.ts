import { DynamoDBClient, ScanCommand, ScanCommandInput } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: process.env.REGION });

export const getAllData = async () => {
  try {
    const input: ScanCommandInput = {
      TableName: process.env.EMAIL_TABLE
    } 
    const command = new ScanCommand(input);

    const response = await client.send(command);
    console.log("responses => ", response)
  } catch (err) {
    console.log(err);
    const message = `Error scanning DynamoDB.`;
    console.log(message);
    throw new Error(message);
  }
};
