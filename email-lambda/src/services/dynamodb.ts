import { DynamoDB } from "aws-sdk"

const clientConfiguration: DynamoDB.ClientConfiguration = {region: process.env.REGION || "eu-west-2"}
const ddbDocumentClient = new DynamoDB.DocumentClient(clientConfiguration)

// TODO: Add this method in a different layer
const scan = async (params: DynamoDB.DocumentClient.ScanInput) => {
  try {
    const result = await ddbDocumentClient.scan(params).promise()
    return result
  } catch (err) {
    console.error(`Error: ${err}. For params: ${JSON.stringify(params, null, 2)}`)
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
