import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { title, feedback, type, email } = await req.json();

    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_SERVICE,
      host: process.env.NODEMAILER_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_FROM_EMAIL,
      to: process.env.NODEMAILER_TO_EMAIL,
      subject: `New feedback: ${title}`,
      text: `
            Title: ${title}
            Feedback: ${feedback}
            Type: ${type}
            Email: ${email}
        `,
      html: `
            <h3>New feedback: ${title}</h3>
            <p><strong>Title:</strong> ${title}</p>
            <p><strong>Feedback:</strong> ${feedback}</p>
            <p><strong>Type:</strong> ${type}</p>
            <p><strong>Email:</strong> ${email}</p>
        `,
    };

    await transporter.sendMail(mailOptions);
    return Response.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Error sending email:", e);
    return Response.json({ message: "Error sending email" }, { status: 500 });
  }
}
