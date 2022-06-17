import { Handler } from "aws-lambda"

export const handler: Handler = async () => {
  try {
  } catch (err) {
    console.error(`Error`)
    throw Error(err)
  }
}
