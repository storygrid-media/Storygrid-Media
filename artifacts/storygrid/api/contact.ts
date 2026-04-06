import { Resend } from 'resend';

export const config = {
  runtime: 'edge',
};

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not configured in Vercel.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { name, email, channel, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
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
      return new Response(JSON.stringify({ error: teamError.message }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
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

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ 
      error: err instanceof Error ? err.message : 'Unknown error occurred' 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
