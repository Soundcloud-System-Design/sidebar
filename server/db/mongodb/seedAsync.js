const db = require('./index.js');
const { SongInformation, SimilarSongsInformation } = require('./models')
const faker = require('Faker');



async function seedDB() {
  var counter = 0
  console.log(new Date().toLocaleTimeString())
  //console.time()
  for (var i = 0; i < 1000; i++) {
    var inputArr = [];
    for (var j = 0; j < 10000; j++) {
      var obj = {
        name: faker.name.findName(),
        track_count: faker.random.number(200),
        follower_count: faker.random.number(20000),
        following_count: faker.random.number(1000),
        links: faker.internet.url(),
        about: faker.lorem.paragraph(),
        liked_songs: faker.random.number(10),
      }
      inputArr.push(obj);
      counter++;
    }
    //console.timeEnd()
    console.log(counter, new Date().toLocaleTimeString());
    await SongInformation.insertMany(inputArr)
  }
}
seedDB()
//console.time('')



async function seedDBTwo() {
  var counter2 = 0
  for (var i = 0; i < 1000; i++) {
    var inputArr2 = [];
    for (var j = 0; j < 10000; j++) {
      var city = faker.address.city();
      var country = faker.address.country();
      var fakeLocation = city + ', ' + country;
      var obj = {
        song_name: faker.lorem.words(2),
        artist_name: faker.name.firstName(),
        plays: faker.random.number(900000000),
        likes: faker.random.number(20000000000),
        reposts: faker.random.number(20000000000),
        comments: faker.random.number(2000000),
        album_art: faker.image.image(),
        location: fakeLocation,
        artist_pic: faker.image.avatar()
      }
      inputArr2.push(obj);
      counter2++;
    }
    console.log(counter2, new Date().toLocaleTimeString());
    await SimilarSongsInformation.insertMany(inputArr2)
  }
}
seedDBTwo()






// for (var i = 0; i < 100000; i++) {
//   new SongInformation({
//     name: faker.name.findName(),
//     track_count: faker.random.number(200),
//     follower_count: faker.random.number(20000),
//     following_count: faker.random.number(1000),
//     links: faker.internet.url(),
//     about: faker.lorem.paragraph(),
//     liked_songs: faker.random.number(10),
//   })
//     .save((err, newSongInfo) => {
//       if (err) {
//         throw err
//       } else
//         console.log('created song info', newSongInfo)
//     })
// }




// for (var i = 0; i < 1; i++) {
//   new SimilarSongsInformation({
//     song_name: faker.lorem.words(2),
//     artist_name: faker.name.firstName(),
//     plays: faker.random.number(900000000),
//     likes: faker.random.number(20000000000),
//     reposts: faker.random.number(20000000000),
//     comments: faker.random.number(2000000),
//     album_art: faker.image.image(),
//     location: faker.address.country(),
//     artist_pic: faker.image.avatar()
//   }).save((err, newSongInfo) => {
//     if (err) {
//       throw err
//     } else
//       console.log('created similar songs info', newSongInfo)
//   })
// }