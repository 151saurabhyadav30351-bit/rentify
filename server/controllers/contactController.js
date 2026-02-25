import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

/*
-----------------------------------
ADMIN: GET ALL CONTACTS
-----------------------------------
*/
export const getAllContactsAdmin = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("ADMIN CONTACT FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch contact messages" });
  }
};

/*
-----------------------------------
ADMIN: DELETE CONTACT
-----------------------------------
*/
export const deleteContactAdmin = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ message: "Message deleted" });
  } catch (error) {
    console.error("ADMIN CONTACT DELETE ERROR:", error);
    res.status(500).json({ message: "Delete failed" });
  }
};