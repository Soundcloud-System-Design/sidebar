var faker = require('faker');
var Sequelize = require('sequelize');
var Promise = require('bluebird');
var fakeData = require('./fakeData.js');
var db = require('../db/index.js');


var seedSong = require('./seedSong.js');
var seedArtist = require('./seedArtist.js');


// Create 100 artists
for (var j = 0; j < 100; j ++) {
  // create a fake artist first
  seedArtist.createArtist(j);
}

var makeSongs = function() {
  for (var k = 0; k < 100; k++) {
    seedSong.findArtist(k);
    console.log('K value: ' + k);
  }
};

setTimeout(makeSongs, 5000);