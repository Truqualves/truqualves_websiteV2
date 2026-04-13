import NewsletterSubscriber from "../model/NewsletterSubscriber.js";
import nodemailer from "nodemailer";

const isValidEmail = (email = "") => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
};

// POST /api/newsletter/subscribe
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingSubscriber = await NewsletterSubscriber.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber?.status === "subscribed") {
      return res.status(200).json({
        success: true,
        message: "Already subscribed",
        subscriber: existingSubscriber,
      });
    }

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { email: normalizedEmail },
      { email: normalizedEmail, status: "subscribed" },
      {
        new: true,
        upsert: true,
        setDefaultsOnInsert: true,
      },
    );

    return res.status(200).json({
      success: true,
      message: "Subscribed successfully",
      subscriber,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/newsletter/unsubscribe
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const subscriber = await NewsletterSubscriber.findOneAndUpdate(
      { unsubscribeToken: token },
      { status: "unsubscribed" },
      { new: true },
    );

    if (!subscriber) {
      return res.status(404).json({ message: "Invalid unsubscribe token" });
    }

    return res.status(200).json({
      success: true,
      message: "Unsubscribed successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// GET /api/newsletter
export const getNewsletterSubscribers = async (req, res) => {
  try {
    const { status } = req.query;
    const query =
      status === "subscribed" || status === "unsubscribed" ? { status } : {};

    const subscribers = await NewsletterSubscriber.find(query).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /api/newsletter/:id
export const deleteNewsletterSubscriber = async (req, res) => {
  try {
    const subscriber = await NewsletterSubscriber.findByIdAndDelete(req.params.id);

    if (!subscriber) {
      return res.status(404).json({ message: "Subscriber not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /api/newsletter/send
export const sendNewsletter = async (req, res) => {
  try {
    const { sendMode, recipientEmails, subject, bodyHtml } = req.body;

    if (!subject || !String(subject).trim()) {
      return res.status(400).json({ message: "Subject is required" });
    }

    if (!bodyHtml || !String(bodyHtml).trim()) {
      return res.status(400).json({ message: "Body is required" });
    }

    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return res.status(500).json({ message: "Email configuration is missing" });
    }

    let subscribers = [];

    if (sendMode === "selected") {
      if (!Array.isArray(recipientEmails) || recipientEmails.length === 0) {
        return res.status(400).json({ message: "At least one recipient is required" });
      }

      const normalizedEmails = recipientEmails
        .map((email) => String(email).trim().toLowerCase())
        .filter(Boolean);

      subscribers = await NewsletterSubscriber.find({
        email: { $in: normalizedEmails },
        status: "subscribed",
      });
    } else {
      subscribers = await NewsletterSubscriber.find({ status: "subscribed" });
    }

    if (subscribers.length === 0) {
      return res.status(400).json({ message: "No subscribed recipients found" });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const appBaseUrl =
      (process.env.FRONTEND_URL && String(process.env.FRONTEND_URL).trim()) ||
      (process.env.CORS_ORIGINS || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)[0] ||
      "";

    await Promise.all(
      subscribers.map((subscriber) => {
        const unsubscribeLink = `${appBaseUrl}/newsletter/unsubscribe?token=${subscriber.unsubscribeToken}`;
        const finalHtml = `
          ${bodyHtml}
          <hr style="margin:24px 0;border:0;border-top:1px solid #e2e8f0;" />
          <p style="font-size:12px;color:#64748b;">
            To stop receiving these emails, <a href="${unsubscribeLink}">unsubscribe here</a>.
          </p>
        `;

        return transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: subscriber.email,
          subject: String(subject).trim(),
          html: finalHtml,
        });
      }),
    );

    return res.status(200).json({
      success: true,
      message: "Newsletter sent successfully",
      sentCount: subscribers.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
