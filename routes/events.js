import express from "express";
import eventController from "../controllers/eventController.mjs";

const router = express.Router();

router.get("/", eventController.getEvents);
router.get("/filter", eventController.filterEvents);
router.get("/:id", eventController.getEventById);

export default router;
