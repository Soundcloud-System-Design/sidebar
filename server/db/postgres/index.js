const { Pool, Client } = require("pg");

//change to user:'josemadrigal', host: 'localhost', database: sidebar, password: '' for local use
const pool = new Pool({
  user: "postgres",
  host: "",
  database: "",
  password: "",
});

pool.connect((err, client, release) => {
  if (err) {
    return console.error("error acquiring client", err.stack);
  }
});

// pool.query("CREATE DATABASE IF NOT EXISTS sidebar", function (err, res) {
//   if (err) {
//     throw err;
//   }
// });

pool.query(
  "CREATE TABLE IF NOT EXISTS songinformation (id int, name varchar not null, track_count int not null, follower_count int not null, following_count int not null, links varchar (255),about text, liked_songs int not null)",
  (err, res) => {
    if (err) {
      throw err;
    }
  }
);

pool.query(
  "CREATE TABLE IF NOT EXISTS similarsongs(id int, song_name varchar (40) not null,artist_name varchar not null, plays int, likes bigint, reposts bigint, comments int, album_art text, location text,artist_pic text)",
  (err, res) => {
    if (err) {
      throw err;
    }
  }
);

module.exports = pool;
