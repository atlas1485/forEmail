import nodemailer from "nodemailer";

function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    } 
  });
}

export function forwardContactFormInfoSendGrid(form) {
  const tranport = setup();
  const email = {
    to: 'aolart993@gmail.com',
    from: 'feoixfj4358345@gmail.com',
    subject: 'Contact Form',
    text: `
    This email was recieved from the online contact form.

    name: ${form.name}
    email: ${form.email}
    subject: ${form.subject}
    message: ${form.message}

    `,
    attachments: [{
      filename: 'file.pdf',
      path: `${form.filepath}`,
      contentType: 'application/pdf'
  }],
  };

  tranport.sendMail(email);
}