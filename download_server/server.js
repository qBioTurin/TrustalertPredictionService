const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Server running");
});

app.get("/download/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const filePath = path.join("storage", timestamp, "prediction.csv");
  console.log("Apro questo file: " + filePath);
  res.download(filePath); // Serve the file for downloading
});

// Ascolta sulla porta configurata
app.listen(3001, () => {
  console.log(`Download server running on port 3001`);
});
