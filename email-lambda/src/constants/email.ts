export const emailParams = (fromEmailAddress: string, toEmailAddress: string) => {
    console.log("fromEmailAddress ", fromEmailAddress, "toEmailAddress ", toEmailAddress)
  return {
    Destination: {
      CcAddresses: [],
      ToAddresses: [ toEmailAddress ], //RECEIVER_ADDRESS
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "HTML_FORMAT_BODY",
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Hello World",
      },
    },
    Source: fromEmailAddress, // SENDER_ADDRESS
    ReplyToAddresses: [],
  };
};
