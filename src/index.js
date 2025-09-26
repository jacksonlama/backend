import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fetchNews from "./newsFetcher.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the News API");
});

app.get("/api/news", async (req, res) => {
  try {
    const news = await fetchNews();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
