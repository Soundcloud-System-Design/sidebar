const mongoose = require("mongoose");
const dbconnection = require("./index");
mongoose.Promise = global.Promise;

const songInfoSchema = mongoose.Schema({
  id: Number,
  name: { type: String, required: true },
  track_count: { type: Number, required: true },
  follower_count: { type: Number, required: true },
  following_count: { type: Number, required: true },
  links: { type: String, required: true },
  about: { type: String, required: true },
  liked_songs: { type: Number, required: true },
});

var similarSongsSchema = mongoose.Schema({
  id: Number,
  song_name: { type: String, required: true },
  artist_name: { type: String, required: true },
  plays: { type: Number, required: true },
  likes: { type: Number, required: true },
  reposts: { type: Number, required: true },
  comments: { type: Number, required: true },
  album_art: { type: String, required: true },
  location: { type: String, required: true },
  artist_pic: { type: String, required: true },
});

//doc._id instanceof mongoose.Types.ObjectId;
//console.log(songInfoSchema)

const SongInformation = mongoose.model("SongInformation", songInfoSchema);
const SimilarSongsInformation = mongoose.model(
  "SimilarSongs",
  similarSongsSchema
);

// module.exports.SongInfo;
// module.exports.SimilarSongs

module.exports = { SongInformation, SimilarSongsInformation };
