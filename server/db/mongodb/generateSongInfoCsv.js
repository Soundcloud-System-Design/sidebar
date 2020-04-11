const fs = require("fs");
const csvWriter = require("csv-write-stream");
var writer = csvWriter();
var faker = require("faker");
var counter = 0;

async function dataGen() {
  writer.pipe(fs.createWriteStream("songInfo.csv"));
  for (var i = 0; i < 10000000; i++) {
    writer.write({
      id: counter++,
      name: faker.name.findName(),
      track_count: faker.random.number(200),
      follower_count: faker.random.number(20000),
      following_count: faker.random.number(1000),
      links: faker.internet.url(),
      about: faker.lorem.paragraph(),
      liked_songs: faker.random.number(10),
    });
  }
  writer.end();
  console.log("done");
}

dataGen();

//allocating more ram to the file
//node - - max-old-space-size=7168 generateSongInfoCsv.js
