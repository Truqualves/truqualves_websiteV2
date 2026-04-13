import { sendContactEmail } from "../services/emailService.js";
import Event from "../model/Event.js";
export const handleContactForm = async (req, res) => {
  try {
    const { firstName, lastName, email, company, phone, service, message } =
      req.body;

    // Validate required fields
    if (!firstName || !lastName || !email || !company || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Create event record with default status "new_request"
    await Event.create({
      firstName,
      lastName,
      email,
      company,
      phone,
      service,
      message,
    });

    // Send email
    await sendContactEmail(req.body);

    res.status(200).json({
      success: true,
      message:
        "Your message has been sent successfully. We will contact you within 24 hours.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    });
  }
};
