function getContact(req, res) {
  res.render("contact", { title: "Contact Us" });
}

function postContact(req, res) {
  const { name, email, query } = req.body;
  if (!name || !email || !query) {
    return res.render("contact", {
      title: "Contact Us",
      error: "All fields are required",
    });
  } else {
    return res.redirect("/");
  }
}

function getContactSuccess(req, res) {
  res.render("contact-success", { title: "Contact Success" });
}

module.exports = {
  getContact,
  postContact,
  getContactSuccess,
};
