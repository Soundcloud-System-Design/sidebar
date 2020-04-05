var faker = require('faker');
var fakeData = require('./fakeData.js');
var db = require('../db/index.js')

module.exports.createArtist = function (j) {

  fakeArtist = fakeData.fakeNames[j];
  fakeAbout = '';
  // About stuff
  var words = fakeData.fakeAbouts;

  // How many sentences
  var random = Math.ceil(Math.random() * 6);

  // What sentences
  var index = Math.floor(Math.random() * (words.length - 7));

  // Creates artist about text.
  while (random > 0) {
    fakeAbout += words[index] + '. ';
    index++;
    random--;
  }

  // Generate random amount of social links
  var numLinks = Math.ceil(Math.random() * 4);
  var linkArr = [];
  while (numLinks > 0) {
    var newLink = faker.internet.url();
    linkArr.push(newLink);
    numLinks--;
  }

  // Join array of fake links into one string separated by a space.
  var fakeLinks = linkArr.join(' ');

  /////// Generate rest of fake data ///////////
  var trackCount = Math.ceil(Math.random() * 200);
  var followerCount = Math.floor(Math.random() * 20000);
  var followingCount = Math.floor(Math.random() * 1000);
  var likedSongs = Math.floor(Math.random() * 10);

  // Add the rando, generated info into the database.
  db.Artist.findOrCreate({
    where: {
      name: fakeArtist
    },
    defaults: {
      name: fakeArtist,
      track_count: trackCount,
      follower_count: followerCount,
      following_count: followingCount,
      about: fakeAbout,
      links: fakeLinks,
      liked_songs: likedSongs
    }
  })
    .then(function (result) {
      var artist = result[0];
      var created = result[1];

      if (!created) {
        console.log('Artist already exists');
      } else {
        console.log('Success creating new artist');
      }

    })
    .catch(function (err) {
      console.log('An error occurred trying to add new artist to the database');
    });

  return fakeArtist;

}