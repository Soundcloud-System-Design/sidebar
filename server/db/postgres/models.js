const Sequelize = require('sequelize');
const db = require('./index');


// Defining a model. Id, createdAt and updateAt auto added.
var Artist = db.define('artist', {
  name: Sequelize.STRING,
  track_count: Sequelize.INTEGER,
  follower_count: Sequelize.INTEGER,
  following_count: Sequelize.INTEGER,
  about: Sequelize.STRING,
  links: Sequelize.STRING,
  liked_songs: Sequelize.INTEGER
}, {
  freezeTableName: true,
  timestamps: false
});

//Artist.sync();
// Create ArtistLikes table

var SongLike = db.define('likedsongs', {
  song_name: Sequelize.STRING,
  artist_name: Sequelize.STRING,
  plays: Sequelize.INTEGER,
  likes: Sequelize.INTEGER,
  reposts: Sequelize.INTEGER,
  comments: Sequelize.INTEGER,
  album_art: Sequelize.STRING,
  location: Sequelize.STRING,
  artist_pic: Sequelize.STRING
}, {
  freezeTableName: true,
  timestamps: false
});

//SongLike.sync();

db.sync({ force: false })
  .then(() => console.log('synced postgres db'))
  .catch(err => console.log('postgres database failed'))

module.exports.Artist = Artist;
module.exports.SongLike = SongLike;