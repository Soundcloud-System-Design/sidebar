const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'database',

});



var db = new Sequelize('sidebar', 'postgres', password, {
  host: 'localhost',
  dialect: 'postgres',
  password: 'password'
});

// Connect to database
db
  .authenticate()
  .then(function (err) {
    console.log('Connection has been established');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database: ', err);
  });

module.exports = db
