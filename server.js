'use strict';

const express = require('express');
var path = require('path');

// Constants
const PORT = 5000;

// App
const app = express();

app.use(express.static(path.join(__dirname, 'app')));

app.listen(PORT);
console.log('Running on http://localhost:' + PORT);