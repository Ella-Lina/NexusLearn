import express from "express";
import { getHome, getFAQ, getQuiz } from "../controllers/pageController.mjs";

const router = express.Router();

router.get("/", getHome);
router.get("/faq", getFAQ);
router.get("/quiz", getQuiz);

export default router;
