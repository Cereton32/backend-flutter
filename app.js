const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// Serve static images from the "photos" folder
app.use("/photos", express.static(path.join(__dirname, "photos")));

// Fix: Correct order of arguments in fs.readdir
app.get("/photos", (req, res) => {
  const dirpath = path.join(__dirname, "photos");

  fs.readdir(dirpath, (err, files) => {
    if (err) return res.status(500).json({ error: "Error  directory" });

    const urls = files.map((file) => ({
      url: `/photos/${file}`,
    }));

    res.json(urls);
  });
});

// Root route to prevent "Cannot GET /" error
app.get("/", (req, res) => {
  res.send("Welcome to the Photo API!");
});

// Start server
const port = 5002;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
