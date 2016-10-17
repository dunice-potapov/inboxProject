var express = require('express');
var app = express();
var path = require('path');
//var request = require('request');
var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, function () {
  console.log('App listening on port 5000!');
});