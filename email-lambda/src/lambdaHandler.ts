import { Handler } from "aws-lambda"

export const handler: Handler = async () => {
  try {
    console.log("hello world")
  } catch (err) {
    console.error(`Error`)
    throw Error(err)
  }
}
