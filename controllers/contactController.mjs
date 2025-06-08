import { dbService } from "../dbService.mjs";

export function getContact(req, res) {
  res.render("contact", { title: "Contact Us", success: null, error: null });
}

export function postContact(req, res) {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.render("contact", {
      title: "Contact Us",
      success: null,
      error: "All fields are required.",
    });
  }

  dbService.saveMessage({ name, email, message }, (err) => {
    if (err) {
      return res.render("contact", {
        title: "Contact Us",
        success: null,
        error: "Failed to send message. Please try again later.",
      });
    }

    res.render("contact", {
      title: "Contact Us",
      success: "Message sent successfully!",
      error: null,
    });
  });
}
