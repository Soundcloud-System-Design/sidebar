const fs = require('fs');
const csvWriter = require('csv-write-stream');
var writer = csvWriter();
var faker = require('faker');

const dataGen = () => {
  writer.pipe(fs.createWriteStream('data.csv'));
  for (var i = 0; i < 10000; i++) {
    writer.write({
      song_name: faker.lorem.words(2),
      artist_name: faker.name.firstName(),
      plays: faker.random.number(900000000),
      likes: faker.random.number(20000000000),
      reposts: faker.random.number(20000000000),
      comments: faker.random.number(2000000),
      album_art: faker.image.image(),
      location: faker.address.country(),
      artist_pic: faker.image.avatar()
    })
  }
  writer.end();
  console.log('done')
}

dataGen();