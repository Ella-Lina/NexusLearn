import { dbService } from "../dbService.mjs";

function getHome(req, res) {
  dbService.getCourses((err, courses) => {
    if (err) return res.status(500).send("Database error");
    const featuredCourses = courses.slice(0, 3);
    res.render("index", { courses: featuredCourses });
  });
}

function getFAQ(req, res) {
  dbService.getFAQs((err, faqs) => {
    if (err) return res.render("faq", { title: "FAQ", faqs: [] });
    res.render("faq", { title: "FAQ", faqs: faqs || [] });
  });
}

function getQuiz(req, res) {
  res.render("quiz", { title: "Quiz" });
}

function getContactSuccess(req, res) {
  res.render("contact-success", { title: "Contact Success" });
}

export default {
  getHome,
  getFAQ,
  getQuiz,
  getContactSuccess,
};
