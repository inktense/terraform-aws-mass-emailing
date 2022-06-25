import * as aws from "@aws-sdk/client-ses";
import * as nodemailer from "nodemailer";
import { emailParams } from "../constants/email";

if (!process.env.FROM_EMAIL_ADDRESS) {
  console.warn(
    "Environment variable FROM_EMAIL_ADDRESS is missing using default."
  );
}

// Create the SES client instance
const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.REGION,
});

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

export const sendEmail = async (toEmailAddress: string, attachment: any): Promise<nodemailer.SendMailOptions | null> => {
  const params = emailParams(
    process.env.FROM_EMAIL_ADDRESS || "",
    toEmailAddress,
    attachment
  );

  try {
    const result = transporter.sendMail(params)
    return result
  } catch (err) {
    console.log("Error", err);
    throw Error((err as string))
  }
};
