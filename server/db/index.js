var Sequelize = require('sequelize');

// Will put db name here at some point. Spudiferous is my test db
var dbName = 'sidebar';
var username = 'root';
var password = '';

// Databse login info
var db = new Sequelize(dbName, username, password, {
  dialect: 'mysql'
});

// Connect to database
db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established');
  }, function (err) {
    console.log('Unable to connect to the database: ', err);
  });

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

module.exports.Artist = Artist;
module.exports.SongLike = SongLike;