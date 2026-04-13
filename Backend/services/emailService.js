import nodemailer from "nodemailer";
// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send contact form email
export const sendContactEmail = async (formData) => {
  const { firstName, lastName, email, company, phone, service, message } =
    formData;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: `New Contact Form Submission - ${service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company}</p>
      <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
      <p><strong>Service Interested In:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send approval request email to superadmin
export const sendApprovalRequestEmail = async (superadminEmail, user) => {
  if (!superadminEmail) return;

  const dashboardBase =process.env.CORS_ORIGINS;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: superadminEmail,
    subject: "New Dashboard Access Request",
    html: `
      <h2>New Dashboard Access Request</h2>
      <p>A new user has requested access to the dashboard.</p>
      <p><strong>Name:</strong> ${user?.name || "N/A"}</p>
      <p><strong>Email:</strong> ${user?.email || "N/A"}</p>
      <p><strong>Status:</strong> ${user?.status || "pending"}</p>
      <p>Please review and approve/reject this request in the Dashboard panel.</p>
      <p>You can now log in and access the dashboard.</p>
      ${dashboardBase ? `<p><a href="${dashboardBase}/dashboard">Click Here</a></p>` : ""}
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send approval granted email to user
export const sendApprovalGrantedEmail = async (user) => {
  if (!user?.email) return;
  const dashboardBase =process.env.CORS_ORIGINS;
    
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Your Dashboard Access Has Been Approved",
    html: `
      <h2>Access Approved</h2>
      <p>Hello${user?.name ? ` ${user.name}` : ""},</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p>Your request for dashboard access has been approved.</p>
      <p>You can now log in and access the dashboard.</p>
      ${dashboardBase ? `<p><a href="${dashboardBase}/dashboard">Click Here</a></p>` : ""}
    `,
  };

  await transporter.sendMail(mailOptions);
};
