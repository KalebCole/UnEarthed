import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import giftData from "../data/gifts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();
router.get("/", (req, res) => {
  console.log("Received GET request for /gifts");
  try {
    console.log("giftData type:", typeof giftData);
    console.log("giftData length:", giftData.length);

    console.log("First gift:", JSON.stringify(giftData[0], null, 2));
    // console.log("Sending gifts:", JSON.stringify(giftData, null, 2));
    res.status(200).json(giftData);
    console.log("Response sent successfully");
  } catch (error) {
    console.error("Error sending JSON response:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/:giftId", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "../public/gift.html"));
});
export default router;
