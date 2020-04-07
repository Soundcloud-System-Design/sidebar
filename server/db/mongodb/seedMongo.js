let exec = require('child_process').exec
let command = 'mongoimport --type csv -d sidebar -c similarsongs --headerline --drop similarSongs.csv'

console.log(new Date().toLocaleTimeString())

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
  }
  console.log('done with similar songs', new Date().toLocaleTimeString())
})


let command2 = 'mongoimport --type csv -d sidebar -c songinformation --headerline --drop songInfo.csv'

exec(command2, (err, stdout, stderr) => {
  if (err) {
    console.log(err)
  }
  console.log('done with songs info', new Date().toLocaleTimeString())
})

