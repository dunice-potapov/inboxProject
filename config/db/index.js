var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/inbox');

db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function() {
  return console.log("Connected to database at 'mongodb://localhost/inbox'" );
});

require('./user');