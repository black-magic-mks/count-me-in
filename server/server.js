var express = require('express');

var app = express();

app.use(express.static(__dirname + '/../public'));

var port = 8080;

app.listen(port);