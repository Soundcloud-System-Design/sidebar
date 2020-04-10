var express = require("express");
var app = express();
var Sequelize = require("sequelize");
var cors = require("cors");
var path = require("path");
var PORT = 4445;
// import artist model methods
var db = require("./db/mysql/index.js");

// Require Middleware
var bodyParser = require("body-parser");

app.use(cors());
// Middleware functionality goes here
app.use("/", express.static(path.join(__dirname, "../client/dist")));

/////// GET/POST req here ////

// Get a random artist
app.get("/artist", function (req, res) {
  var artistInfo;

  //Search for artist
  db.Artist.findOne({
    order: Sequelize.literal("rand()"),
  })
    .then(function (artist) {
      artistInfo = artist;
      var limitNum = artist.liked_songs;
      if (limitNum > 3) {
        limitNum = 3;
      }
      return db.SongLike.findAll({
        where: {
          order: Sequelize.literal("rand()"),
        },
        limit: limitNum,
      });
    })
    .then(function (songs) {
      res.send({ artist: artistInfo, likedSongs: songs });
    })
    .catch(function (err) {
      console.log("Error trying to find a random artist. " + err);
      res.status(404);
    });
});

// Find an artist
app.get("/artistname/", function (req, res) {
  console.log(req.query);
  var artistInfo;

  db.Artist.findOne({
    where: {
      name: req.query.name,
    },
  })
    .then(function (artist) {
      artistInfo = artist;
      var limitNum = artist.liked_songs;
      if (limitNum > 3) {
        limitNum = 3;
      }
      return db.SongLike.findAll({
        where: {
          order: Sequelize.literal("rand()"),
          // set max to 3
        },
        limit: limitNum,
      });
    })
    .then(function (songs) {
      res.send({ artist: artistInfo, likedSongs: songs });
    })
    .catch(function (err) {
      //console.log('Could not find artist in database');
      res.status(404);
      res.send(`Could not find artist: ${req.query.name} in database`);
    });
});

// Update artist

app.put("/updateartist", function (req, res) {
  db.Artist.update({
    where: {
      name: req.body.artist.name,
    },
  })
    .then(function (rowsUpdated) {
      res.status(200).send(rowsUpdated);
    })
    .catch(function (err) {
      console.log(err);
    });
});

// Adds new artist to the db, going to use to fill up db.
app.post("/artist", function (req, res) {
  // req.body should be an object with relevant values
  //
  //console.log(JSON.stringify(req.body));
  db.Artist.findOrCreate({
    where: {
      name: req.body.name,
    },
    defaults: req.body,
  })
    .then(function (artist) {
      console.log("New artist entry has been added to database");
      res.send(artist.name);
      // Send a response that does something maybe.
    })
    .catch(function (err) {
      console.log("An error occurred trying to add new artist to the database");
      console.log(err);
    });
});

// Add Song info
app.post("/user/likes", function (req, res) {
  console.log(JSON.stringify(req.body));
  db.SongLike.create(req.body)
    .then(function (userLikes) {
      res.status(201).send(userLikes);
    })
    .catch(function (err) {
      console.log("An error has occured trying to add new song info");
      console.log(err);
    });
});

//delete song
app.delete("/deleteartist", function (req, res) {
  db.Artist.destroy({
    where: {
      name: req.body.artist.name,
    },
  })
    .then(function () {
      res.send("DONE");
    })
    .catch(function (err) {
      console.log(err);
    });
});
//listen for reqs
app.listen(PORT, () => {
  console.log(`Server listening in on port ${PORT}`);
});

// module.exports = app;
