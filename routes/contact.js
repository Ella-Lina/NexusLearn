import express from "express";
import { getContact, postContact } from "../controllers/contactController.mjs";

const router = express.Router();

router.get("/", getContact);
router.post("/", postContact);

export default router;
