import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import coursesRoute from "./routes/courses.js";
import instructorsRoute from "./routes/instructors.js";
import eventsRoute from "./routes/events.js";
import contactRoute from "./routes/contact.js";
import eventsRouter from "./routes/events.js";

import pageController from "./controllers/pageController.mjs";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", pageController.getHome);
app.use("/courses", coursesRoute);
app.use("/instructors", instructorsRoute);
app.use("/events", eventsRoute);
app.use("/contact", contactRoute);
app.get("/faq", pageController.getFAQ);
app.get("/quiz", pageController.getQuiz);
app.get("/contact-success", pageController.getContactSuccess);
app.use("/events", eventsRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
