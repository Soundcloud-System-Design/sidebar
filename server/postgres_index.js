require("newrelic");

var express = require("express");
var app = express();
var cors = require("cors");
var path = require("path");
var PORT = 4445;
// import artist model methods
var db = require("./controller.js");
const pgp = require("pg-promise");
var cache = require("memory-cache");
var bodyParser = require("body-parser");

app.use(cors());

app.use("/", express.static(path.join(__dirname, "../client/dist")));

// configure cache middleware
let memCache = new cache.Cache();
let cacheMiddleware = (duration) => {
  return (req, res, next) => {
    let key = "__express__" + req.originalUrl || req.url;
    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.send(cacheContent);
      return;
    } else {
      res.sendResponse = res.send;
      res.send = (body) => {
        memCache.put(key, body, duration * 1000);
        res.sendResponse(body);
      };
      next();
    }
  };
};

app.get("/artist", db.getArtist, db.getSimilarSongs, db.renderInfo);

app.listen(PORT, () => {
  console.log(`Server listening in on port ${PORT}`);
});
