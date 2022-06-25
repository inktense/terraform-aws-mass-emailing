export const emailParams = (fromEmailAddress: string, toEmailAddress: string, attachment: any) => {
  return {
    from: fromEmailAddress,
    to: toEmailAddress,

    subject: 'AWS SES attachment example ✓ ' + Date.now(),
    text: 'I hope this message gets sent! You can find the pdf attachment below.',
    attachments: [{
        filename: 'awesome_stuff.pdf',
        content: attachment.Body,
        contentType: attachment.ContentType
      }],
  };
};
