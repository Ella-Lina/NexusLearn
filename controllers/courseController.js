const { dbService } = require("../dbService");

function getCourses(req, res) {
  dbService.getCourses((err, courses) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.render("courses", { courses });
  });
}

function searchCourses(req, res) {
  const query = req.query.q ? req.query.q.toLowerCase() : "";
  dbService.searchCourses(query, (err, courses) => {
    if (err) {
      return res.status(500).json({ error: "Database error" });
    }
    res.json(courses);
  });
}

module.exports = { getCourses, searchCourses };
