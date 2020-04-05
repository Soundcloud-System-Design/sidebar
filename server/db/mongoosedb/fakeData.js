const db = require('./index.js');
const { SongInformation, SimilarSongsInformation } = require('./models')
const faker = require('Faker');

// console.log(SongInformation)
// console.log(SimilarSongsInformation)

for (var i = 0; i < 100000; i++) {
  new SongInformation({
    name: faker.name.findName(),
    track_count: faker.random.number(200),
    follower_count: faker.random.number(20000),
    following_count: faker.random.number(1000),
    links: faker.internet.url(),
    about: faker.lorem.paragraph(),
    liked_songs: faker.random.number(10),
  })
    .save((err, newSongInfo) => {
      if (err) {
        throw err
      } else
        console.log('created song info', newSongInfo)
    })
}


// const insertSongs = function () {
//   SongInformation.create(song)
// };

// insertSongs();


for (var i = 0; i < 1; i++) {
  new SimilarSongsInformation({
    song_name: faker.lorem.words(2),
    artist_name: faker.name.firstName(),
    plays: faker.random.number(900000000),
    likes: faker.random.number(20000000000),
    reposts: faker.random.number(20000000000),
    comments: faker.random.number(2000000),
    album_art: faker.image.image(),
    location: faker.address.country(),
    artist_pic: faker.image.avatar()
  }).save((err, newSongInfo) => {
    if (err) {
      throw err
    } else
      console.log('created similar songs info', newSongInfo)
  })
}