const express = require("express");
const path = require("path");
const cors = require("cors");
// const bodyParser = require("body-parser");
var http = require("http");
var https = require("https");
var fs = require("fs");
var privateKey = fs.readFileSync("sslcert/server.key", "utf8");
var certificate = fs.readFileSync("sslcert/server.crt", "utf8");

var credentials = { key: privateKey, cert: certificate };
var app = express();

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);

app.use(cors());
// app.use(bodyParser.json());

app.get("/", (req, res) => {
  console.log("Server running");
  res.send("Server running");
});

app.get("/download/:timestamp", (req, res) => {
  const { timestamp } = req.params;
  const filePath = path.join("storage", timestamp, "prediction.csv");
  console.log("Apro questo file: " + filePath);
  res.download(filePath); 
});

app.listen(3001, () => {
  console.log(`Download server running on port 3001`);
});