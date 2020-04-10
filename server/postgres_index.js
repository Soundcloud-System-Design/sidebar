var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
var PORT = 4445;
// import artist model methods
var db = require("./db/postgres/model.js");
const pgp = require("pg-promise");

var bodyParser = require("body-parser");

app.use(cors());

app.use("/", express.static(path.join(__dirname, "../client/dist")));

app.get("/artist", db.getArtist, db.getSimilarSongs, db.renderInfo);

app.listen(PORT, () => {
  console.log(`Server listening in on port ${PORT}`);
});
