import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { emailParams } from "../constants/email";

const sesClient = new SESClient({ region: process.env.REGION });

if (!process.env.FROM_EMAIL_ADDRESS) {
  console.warn(
    "Environment variable FROM_EMAIL_ADDRESS is missing using default."
  );
}

export const sendEmail = async (toEmailAddress: string, attachment: any) => {
  console.log("toEmailAddress => ", toEmailAddress);
  const params = emailParams(process.env.FROM_EMAIL_ADDRESS || '', toEmailAddress);

  try {
    const data = await sesClient.send(new SendEmailCommand(params));
    console.log("Success", data);
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};
