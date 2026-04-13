import ContactInfo from "../model/ContactInfo.js";

export const getContactInfo = async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne({});
    return res.status(200).json(contactInfo || {});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateContactInfo = async (req, res) => {
  try {
    const { officeAddress, phone, email, businessHours, consultationText } =
      req.body;

    const payload = {};
    if (officeAddress !== undefined) payload.officeAddress = officeAddress;
    if (phone !== undefined) payload.phone = phone;
    if (email !== undefined) payload.email = email;
    if (businessHours !== undefined) payload.businessHours = businessHours;
    if (consultationText !== undefined) {
      payload.consultationText = consultationText;
    }

    const existing = await ContactInfo.findOne({});
    const contactInfo = existing
      ? await ContactInfo.findByIdAndUpdate(existing._id, payload, {
          new: true,
          runValidators: true,
        })
      : await ContactInfo.create(payload);

    return res.status(200).json(contactInfo);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
