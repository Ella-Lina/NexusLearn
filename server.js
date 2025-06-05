const express = require("express");
const path = require("path");
const { dbService, db } = require("./dbService");
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Controllers
const courseController = require("./controllers/courseController");
const instructorController = require("./controllers/instructorController");
const eventController = require("./controllers/eventController");
const pageController = require("./controllers/pageController");

// Imported Routes
const coursesRoutes = require("./routes/courses");

// Routes
app.get("/", pageController.getHome);
app.use("/courses", coursesRoutes);
app.get("/instructors", instructorController.getInstructors);
app.get("/schedule", eventController.getSchedule);
app.get("/faq", pageController.getFAQ);

/**
 * Note: Import my route and assign it to contact route
 */
const contactRoutes = require("./routes/contact");
app.use("/contact", contactRoutes);

app.get("/contact-success", (req, res) => {
  res.render("contact-success", { title: "Contact Success" });
});
app.get("/quiz", pageController.getQuiz);
app.get("/events", eventController.getEvents);
app.get("/event/:id", eventController.getEventById);
app.get("/api/events", eventController.filterEvents);

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Close Database on Exit
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) console.error("Error closing database:", err);
    console.log("Database connection closed.");
    process.exit(0);
  });
});
