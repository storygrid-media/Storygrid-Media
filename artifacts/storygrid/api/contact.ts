import { Resend } from 'resend';

export const config = {
  runtime: 'nodejs',
};



export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      console.error("DEBUG ERROR: Missing RESEND_API_KEY");
      return res.status(400).json({ error: 'RESEND_API_KEY is not configured in Vercel.' });
    }

    const { name, email, channel, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    // 1. Send Lead Notification to the Team
    const { error: teamError } = await resend.emails.send({
      from: 'StoryGrid Notifications <team@storygridmedia.in>', 
      to: ['team@storygridmedia.in'],
      replyTo: email,
      subject: `New Lead: ${name} from StoryGrid Website`,
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
    });

    if (teamError) {
      console.error("DEBUG ERROR: Team email failed", teamError);
      return res.status(400).json({ error: teamError.message });
    }

    // 2. Send Automated "Thank You" to the User
    await resend.emails.send({
      from: 'StoryGrid Media <team@storygridmedia.in>',
      to: [email],
      subject: `We've received your request - StoryGrid Media`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
          <h1 style="color: #FFC107;">Thanks for reaching out, ${name}!</h1>
          <p>We've received your message regarding <strong>${channel || "your project"}</strong>.</p>
          <p>Our team is currently reviewing your details and we'll be in touch shortly to schedule a growth mapping call.</p>
          <br />
          <p>Talk soon,</p>
          <p><strong>The StoryGrid Media Team</strong></p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("DEBUG ERROR: ", err);
    return res.status(500).json({ 
      error: err instanceof Error ? err.message : 'Unknown error occurred' 
    });
  }
}
