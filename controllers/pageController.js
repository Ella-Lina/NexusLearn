const { dbService } = require("../dbService");

function getHome(req, res) {
  dbService.getCourses((err, courses) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    const featuredCourses = courses.slice(0, 3);
    res.render("index", { courses: featuredCourses });
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
