import express from "express";
import dotenv from "dotenv";
import giftsRouter from "./routes/gifts.js";

// Load environment variables from .env file
dotenv.config();

console.log(process.env.PGDATABASE);
console.log(process.env.PGHOST);
console.log(process.env.PGPASSWORD);
console.log(process.env.PGPORT);
console.log(process.env.PGUSER);

console.log(typeof process.env.PGPASSWORD); // Should output 'string'

const app = express();

// serves static files using middleware
app.use("/scripts", express.static("./public/scripts"));
// middleware = modular

app.use("/public", express.static("./public"));
app.use("/gifts", giftsRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">UnEarthed API</h1>'
    );
});

const PORT = process.env.PORT || 3001;
console.log(`PORT: ${PORT}`);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
