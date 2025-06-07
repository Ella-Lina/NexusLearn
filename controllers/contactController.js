const { dbService } = require("../dbService");

exports.get = (req, res) => {
  res.render("contact", { title: "Contact" });
};

exports.post = (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send("All fields are required.");
  }

  dbService.saveMessage({ name, email, message }, (err) => {
    if (err) {
      console.error("Failed to save message:", err);
      return res
        .status(500)
        .send("An error occurred while saving your message.");
    }
    res.redirect("/contact-success");
  });
};
