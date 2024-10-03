import { pool } from "../config/database.js";

export const getGifts = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM gifts ORDER BY id ASC");
    //debug
    console.log("in the controller");
    console.log("results", results.rows);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getGiftById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query("SELECT * FROM gifts WHERE id = $1", [id]);
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};
