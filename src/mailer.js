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

export async function forwardContactFormInfoSendGrid(form) {
  const smtpTransport = setup();
  
  const mailOptions = {
    to: 'aolart993@gmail.com',
    from: 'atlasneo83@gmail.com',
    subject: 'Online Contact Form',
    text: `
    name: ${form.name}
    email: ${form.email}
    subject: ${form.subject}
    message: ${form.message}
    `
  };

  if(form.filePath!==""){
    mailOptions.attachments=[{}];
    mailOptions.attachments[0] = {
      filename: `${form.fileName}`,
      path: `${form.filePath}`,
      contentType: `${form.fileType}`
    };
  }

  let promise = new Promise((resolve, reject) => {
    smtpTransport.sendMail(mailOptions, (error, response) => {
      error ? reject(error) : resolve(response);
      smtpTransport.close();
    });
  });
  let response = await promise;
  return response;
}