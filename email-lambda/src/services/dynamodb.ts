import { DynamoDB } from "aws-sdk"

const clientConfiguration: DynamoDB.ClientConfiguration = {region: process.env.REGION || "eu-west-2"}
const ddbDocumentClient = new DynamoDB.DocumentClient(clientConfiguration)

const scan = async (params: DynamoDB.DocumentClient.ScanInput) => {
  try {
    const result = await ddbDocumentClient.scan(params).promise()
    return result
  } catch (error) {
    console.error(`Error: ${error}. For params: ${JSON.stringify(params, null, 2)}`)
    throw new Error('Something went wrong in DynamoDB service')
  }
}

export async function getAllData(tableName: string) {
  const params: DynamoDB.DocumentClient.ScanInput = {
    TableName: tableName,
  }

  try {
    const result = await scan(params)
    return result.Items
  } catch (err) {
    console.error(`Error: ${err} for params: ${params}`)
    return err
  }
}


// export const getAllData = async () => {
//   try {
//     const input: ScanCommandInput = {
//       TableName: process.env.EMAIL_TABLE
//     } 
//     const command = new ScanCommand(input);

//     const response = await client.send(command);
//     console.log("responses => ", response.Items)
//     return response.Items;
//   } catch (err) {
//     console.log(err);
//     const message = `Error scanning DynamoDB.`;
//     console.log(message);
//     throw new Error(message);
//   }
// };



