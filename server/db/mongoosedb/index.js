const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sidebar', { useUnifiedTopology: true, useNewUrlParser: true });

const dbconnection = mongoose.connection;

dbconnection.on('error', console.error.bind(console, 'connection error'));
dbconnection.once('open', () => console.log('connected to mongodb'));

//create save method here
//with callback

//module.exports.save
module.exports.dbconnection;



