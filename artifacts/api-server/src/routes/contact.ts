import { Router, type Request, type Response } from "express";
import nodemailer from "nodemailer";

const contactRouter = Router();

// Nodemailer Transporter Configuration
// These should be set in the .env file of the api-server
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

contactRouter.post("/contact", async (req: Request, res: Response) => {
  try {
    const { name, email, channel, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: "team@storygridmedia.in",
      replyTo: email,
      subject: `New Lead: ${name} from StoryGrid Website`,
      text: `
        Name: ${name}
        Email: ${email}
        Channel/Link: ${channel || "Not provided"}
        
        Message:
        ${message}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h2 style="color: #FFC107;">New Lead Received</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Channel/Link:</strong> ${channel || "Not provided"}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
});

export default contactRouter;
