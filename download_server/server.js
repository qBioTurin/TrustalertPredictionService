const express = require("express");
const path = require("path");
const cors = require("cors");
var https = require("https");
var fs = require("fs");

var privateKey = fs.readFileSync("sslcert/server.key", "utf8");
var certificate = fs.readFileSync("sslcert/server.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };
var app = express();

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443);

app.use(cors());

app.get("/", (req, res) => {
  console.log("Server running");
  res.send("Server running");
});

app.get("/download/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const filePath = path.join("storage", timestamp, "prediction.csv");
  console.log(`[${timestamp}] Open file: ${filePath}`);
  res.download(filePath);
});
