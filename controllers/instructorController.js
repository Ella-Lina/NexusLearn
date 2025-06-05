const { dbService } = require("../dbService");

function getInstructors(req, res) {
  dbService.getInstructors((err, instructors) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.render("instructors", { instructors });
  });
}

module.exports = {
  getInstructors,
};
