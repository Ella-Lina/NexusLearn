const express = require("express");
const path = require("path");
const { dbService, db } = require("./dbService");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const courseController = require("./controllers/courseController");
const instructorController = require("./controllers/instructorController");
const eventController = require("./controllers/eventController");
const pageController = require("./controllers/pageController");

const coursesRoutes = require("./routes/courses");

app.get("/", pageController.getHome);
app.use("/courses", coursesRoutes);
app.get("/instructors", instructorController.getInstructors);
app.get("/faq", pageController.getFAQ);

const contactRoutes = require("./routes/contact");
app.use("/contact", contactRoutes);

app.get("/contact-success", (req, res) => {
  res.render("contact-success", { title: "Contact Success" });
});
app.get("/quiz", pageController.getQuiz);
app.get("/events", eventController.getEvents);
app.get("/event/:id", eventController.getEventById);
app.get("/api/events", eventController.filterEvents);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  db.close((err) => {
    if (err) console.error("Error closing database:", err);
    console.log("Database connection closed.");
    process.exit(0);
  });
});
