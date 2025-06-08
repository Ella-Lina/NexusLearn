import express from "express";
import { getCourses, searchCourses } from "../controllers/courseController.mjs";

const router = express.Router();

router.get("/", getCourses);
router.get("/search", searchCourses);

export default router;
