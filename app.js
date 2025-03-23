const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());

// Serve static images
app.use("/photos", express.static(path.join(__dirname, "photos")));

// Fix: Handle fs.readdir errors properly
app.get("/photos", (req, res) => {
  const dirpath = path.join(__dirname, "photos");

  fs.readdir(dirpath, (err, files) => {
    if (err) {
      console.error("Error reading photos directory:", err);
      return res.status(500).json({ error: "Error reading photos directory" });
    }

    if (!files || files.length === 0) {
      return res.status(404).json({ error: "No photos found" });
    }

    const urls = files.map((file) => ({
      url: `/photos/${file}`,
    }));

    res.json(urls);
  });
});

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Photo API!");
});

// Use Render's port
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
