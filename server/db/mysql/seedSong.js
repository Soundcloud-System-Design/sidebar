var faker = require('faker');
var Sequelize = require('sequelize');
var db = require('../db/index.js');

var fakeData = require('./fakeData.js');


var generateSong = function(artistName, k) {
  //////// Get random song name
  // generate random index number

  var fakeSongName = fakeData.fakeSongs[k];

  //////// Generate random Location
  var city = faker.address.city();
  var country = faker.address.country();
  var fakeLocation = city + ', ' + country;

  //////// Generate profile picture
  // generate random index number to choose random profile art link
  var max = fakeData.profile.length;
  var num = Math.floor(Math.random() * max);
  var fakePic = fakeData.profile[num];
  var fakeAlbum = fakeData.album[num];
  /////// GENERATE RANDOM NUMBERSSS
  var fakePlays = Math.ceil(Math.random() * 90000000);
  var fakeLikes = Math.ceil(fakePlays / (50 * (Math.random() * 1.5)));
  var fakeReposts = Math.ceil(fakeLikes / (20 * (Math.random() * 3)));
  var fakeComments = Math.ceil(fakeReposts / ((Math.random() * 5 + .5)));

  // Create new liked song in database
  db.SongLike.create({
    song_name: fakeSongName,
    artist_name: artistName,
    plays: fakePlays,
    likes: fakeLikes,
    reposts: fakeReposts,
    comments: fakeComments,
    album_art: fakeAlbum,
    location: fakeLocation,
    artist_pic: fakePic
  })
    .then(function (song) {
      console.log('New song like has been added! ');
      return song;
    })
    .catch(function (err) {
      console.log('there was an error trying to add a new song to likedsongs  table');
    });
};

module.exports.findArtist = function(k) {

  db.Artist.findOne({
    order: Sequelize.literal('rand()')
  })
    .then(function (artist) {
      console.log(artist.name + 'artist has been found, trying to make song');
      artistName = artist.name;
      return generateSong(artistName, k);
    })
    .then(function(song) {
      console.log('Song has been created');
    })
    .catch(function (err) {
      console.log('Could not find artist in database');
    });
};