import { dbService } from "../dbService.mjs";

function getCourses(req, res) {
  dbService.getCourses((err, courses) => {
    if (err) {
      console.error("Error fetching courses:", err);
      return res.status(500).send("Error loading courses.");
    }
    res.render("courses", { title: "Courses", courses });
  });
}

function searchCourses(req, res) {
  const query = req.query.q || "";
  dbService.searchCourses(query, (err, courses) => {
    if (err) {
      console.error("Error searching courses:", err);
      return res.status(500).send("Error searching courses.");
    }
    res.render("courses", { title: "Search Results", courses });
  });
}

export { getCourses, searchCourses };
