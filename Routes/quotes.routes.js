const express = require("express");
const { connection } = require("../config/db");
const quotesRouter = express.Router();
quotesRouter.use(express.json());

// Search quotes
quotesRouter.get("/", async (req, res) => {
  const { search } = req.query;
  try {
    const fetch = await import("node-fetch");
    const response = await fetch.default(
      `https://api.quotable.io/search/quotes?query=${encodeURIComponent(
        search
      )}`
    );
    if (!response.ok) {
      throw new Error("Failed to search quotes");
    }
    const data = await response.json();
    res.status(200).json(data.results);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add To Favourites
quotesRouter.post("/:quoteID", async (req, res) => {
  const { quoteID } = req.params;
  try {
    await connection.query(`
      CREATE TABLE IF NOT EXISTS favourites (
        id INT AUTO_INCREMENT PRIMARY KEY,
        quoteID VARCHAR(255) NOT NULL
      )
    `);
    await connection.query("INSERT INTO favourites (quoteID) VALUE (?)", [
      quoteID,
    ]);
    res.status(200).json({ msg: "Quote has been added to Favourites!" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

// get fav
quotesRouter.get("/favs", async (req, res) => {
  try {
    const [favs] = await connection.query("SELECT * FROM favourites");
    res.status(200).json({ favs });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = { quotesRouter };
