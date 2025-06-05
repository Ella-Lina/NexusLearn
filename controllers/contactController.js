const { dbService } = require('../dbService');

function get(req, res) {
  const success = req.query.success === 'true' || false;
  console.log('GET /contact - Success:', success); // Debugging log
  res.render("contact", { title: "Contact Us", success });
}

function post(req, res) {
  try {
    const { name, email, query } = req.body;
    console.log('POST /contact - Received:', { name, email, query }); // Debugging log

    if (!name || !email || !query) {
      console.log('POST /contact - Missing fields'); // Debugging log
      return res.render("contact", {
        title: "Contact Us",
        success: false,
        error: "All fields are required",
      });
    }

    const messageData = { name, email, message: query };
    console.log('POST /contact - Saving message:', messageData); // Debugging log
    dbService.saveMessage(messageData, (err) => {
      if (err) {
        console.error('POST /contact - Error saving message:', err);
        return res.render("contact", {
          title: "Contact Us",
          success: false,
          error: "Oops, something went wrong! Try again later.",
        });
      }
      console.log('POST /contact - Message saved, redirecting'); // Debugging log
      res.redirect("/contact?success=true");
    });
  } catch (err) {
    console.error('POST /contact - Unexpected error:', err);
    res.render("contact", {
      title: "Contact Us",
      success: false,
      error: "Something went wrong while submitting your message.",
    });
  }
}

module.exports = {
  get,
  post,
};