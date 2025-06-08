import { dbService } from "../dbService.mjs";

export function getInstructors(req, res) {
  dbService.getInstructors((err, instructors) => {
    if (err) {
      console.error("Error fetching instructors:", err);
      return res.status(500).send("Error loading instructors.");
    }
    res.render("instructors", { title: "Instructors", instructors });
  });
}
