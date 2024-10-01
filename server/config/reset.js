import { pool } from "./database.js";
import dotenv from "dotenv";
import giftData from "../data/gifts.js";

dotenv.config();

// debugging
console.log(process.env);
// password is a string
console.log(typeof process.env.PGPASSWORD);

// used to create out gifts table and load our json data into the db
const createGiftsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS gifts;

    CREATE TABLE IF NOT EXISTS gifts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        pricePoint VARCHAR(10) NOT NULL,
        audience VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        submittedBy VARCHAR(255) NOT NULL,
        submittedOn TIMESTAMP NOT NULL
    )
`;

  try {
    const res = await pool.query(createTableQuery);
    console.log("🎉 gifts table created successfully");
  } catch (err) {
    console.error("⚠️ error creating gifts table", err);
  }
};

// calling the create table function to create the table and seed the data
const seedGiftsTable = async () => {
  await createGiftsTable();

  //   now i need to traverse my gift data and insert it into the db
  giftData.forEach((gift) => {
    const insertQuery = {
      text: "INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)",
    };
    // to prevent duplicates
    // const insertQuery = {
    //     text: `
    //       INSERT INTO gifts (name, pricePoint, audience, image, description, submittedBy, submittedOn)
    //       VALUES ($1, $2, $3, $4, $5, $6, $7)
    //       ON CONFLICT (name, pricePoint, audience, image, description, submittedBy, submittedOn)
    //       DO NOTHING
    //     `,
    const values = [
      gift.name,
      gift.pricePoint,
      gift.audience,
      gift.image,
      gift.description,
      gift.submittedBy,
      gift.submittedOn,
    ];

    pool.query(insertQuery, values, (err, res) => {
      if (err) {
        console.error("⚠️ error inserting gift", err);
        return;
      }

      console.log(`✅ ${gift.name} added successfully`);
    });
  });
};

seedGiftsTable();
