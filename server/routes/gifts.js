import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { getGifts, getGiftById } from "../controllers/gifts.js";
import { get } from "https";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/", getGifts); // use the controller to get the gifts

router.get("/:giftId", getGiftById); // use the controller to get a gift by id

export default router;
