import nodemailer from 'nodemailer';

// Gmail configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

interface ContactEmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(params: ContactEmailParams): Promise<boolean> {
  try {
    const emailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${params.name}</p>
      <p><strong>Email:</strong> ${params.email}</p>
      <p><strong>Message:</strong></p>
      <p>${params.message}</p>
      <hr>
      <p><em>This message was sent from the Adalithic website contact form.</em></p>
    `;

    const emailText = `
New Contact Form Submission

Name: ${params.name}
Email: ${params.email}
Message: ${params.message}

---
This message was sent from the Adalithic website contact form.
    `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'arcatextapp@gmail.com',
      subject: `New Contact Form Submission from ${params.name}`,
      text: emailText,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);
    
    return true;
  } catch (error) {
    console.error('Gmail email error:', error);
    return false;
  }
}