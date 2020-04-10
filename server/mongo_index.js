var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
var PORT = 4445;
// import artist model methods
const {
  SongInformation,
  SimilarSongsInformation,
} = require("./db/mongodb/models.js");
const db = require("./db/mongodb/index.js");

app.use(cors());

app.use("/", express.static(path.join(__dirname, "../client/dist")));

app.get("/artist", (req, res) => {
  SongInformation.find({}, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.status(200).json({ artist: result });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening in on port ${PORT}`);
});
