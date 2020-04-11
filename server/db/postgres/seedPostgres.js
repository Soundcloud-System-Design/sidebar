const pool = require("./index.js");

console.log(new Date().toLocaleTimeString());

pool
  .query(
    `COPY songinformation (id, name, track_count,  follower_count, following_count, links, about, liked_songs) FROM '/Users/josemadrigal/Desktop/HackReactor/sidebar/server/db/mongodb/songInfo.csv' DELIMITER ',' CSV HEADER`
  )
  .then((data) => {
    console.log("done with songinformation", new Date().toLocaleTimeString());
  })
  .catch((err) => {
    console.log(err);
  });

///Users/josemadrigal/Desktop/HackReactor/sidebar/server/db/mongodb/songInfo.csv

pool
  .query(
    `COPY similarsongs (id, song_name, artist_name, plays, likes, reposts, comments, album_art, location, artist_pic) FROM '/Users/josemadrigal/Desktop/HackReactor/sidebar/server/db/mongodb/similarSongs.csv' DELIMITER ',' CSV HEADER`
  )
  .then((data) => {
    console.log("done with similarsongs", new Date().toLocaleTimeString());
  })
  .catch((err) => {
    console.log(err);
  });

pool.end(() => {
  console.log("pool has closed");
});
