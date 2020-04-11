const pool = require("./index");

// var id = Math.floor(Math.random() * 10000001);
// console.log(id);
// "SELECT * FROM songinformation TABLESAMPLE SYSTEM(0.01) LIMIT 1;",

const getArtist = async (req, res, next) => {
  return pool.query(
    "SELECT * FROM songinformation TABLESAMPLE SYSTEM(0.01) LIMIT 1;",
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result.rows);
      //res.status(200).json(result.rows);
      req.artist = result.rows;
      next();
      // res.render('songinfo')
    }
  );
};

const getSimilarSongs = async (req, res, next) => {
  return pool.query(
    "SELECT * FROM similarsongs  TABLESAMPLE SYSTEM(0.01) LIMIT 3;",
    (err, result) => {
      if (err) {
        throw err;
      }
      req.similarSongs = result.rows;
      console.log(result.rows);
      next();
      //res.status(200).json(results.rows);
    }
  );
};

const renderInfo = async (req, res) => {
  await res
    .status(200)
    .json({ artist: req.artist, similarSongs: req.similarSongs });
};

const createArtist = (req, res) => {
  const {
    name,
    track_count,
    follower_count,
    following_count,
    links,
    about,
    liked_songs,
  } = req.body;

  return pool.query(
    "INSERT INTO songinformation (name, track_count, follower_count, following_count, links,about, liked_songs) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      name,
      track_count,
      follower_count,
      following_count,
      links,
      about,
      liked_songs,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(201).send("songinformation added");
    }
  );
};

//update song

const updateArtist = (req, res) => {
  const id = parseInt(req.params.id);
  const {
    name,
    track_count,
    follower_count,
    following_count,
    links,
    about,
    liked_songs,
  } = req.body;

  return pool.query(
    "UPDATE songinformation SET name= $1, track_count=$2, follower_count = $3,  following_count = $4, links =$5, about = $6,liked_songs =$7 WHERE id = $8",
    [
      name,
      track_count,
      follower_count,
      following_count,
      links,
      about,
      liked_songs,
      id,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.status(200).send("artistinformation updated");
    }
  );
};

const deleteArtist = (req, res) => {
  const id = parseInt(req.params.id);

  return pool.query(
    "DELETE FROM songinformation WHERE id = $1",
    [id],
    (err, results) => {
      if (error) {
        throw error;
      }
      res.status(200).send(`artist deleted with ID: ${id}`);
    }
  );
};

module.exports = {
  getArtist,
  getSimilarSongs,
  renderInfo,
  createArtist,
  updateArtist,
  deleteArtist,
};
