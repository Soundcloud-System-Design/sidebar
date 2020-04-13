const { Pool, Client } = require("pg");

//change to user:'josemadrigal', host: 'localhost', database: sidebar, password: '' for local use
const pool = new Pool({
  user: "power_user",
  host: "ec2-3-101-15-153.us-west-1.compute.amazonaws.com",
  database: "template1",
  password: "$poweruserpassword",
  port: 5432,
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
