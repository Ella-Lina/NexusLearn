const { dbService } = require("../dbService");

function getHome(req, res) {
  dbService.getCourses((err, courses) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.render("index", { courses });
  });
}

function getFAQ(req, res) {
  dbService.getFAQs((err, faqs) => {
    if (err) {
      res.render("faq", { title: "FAQ", faqs: [] });
      return;
    }
    res.render("faq", { title: "FAQ", faqs: faqs || [] });
  });
}

function getQuiz(req, res) {
  res.render("quiz", { title: "Quiz" });
}

module.exports = {
  getHome,
  getFAQ,
  getQuiz,
};
