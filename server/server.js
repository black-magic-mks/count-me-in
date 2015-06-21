var express = require('express');
var router = require('./router');

var port = 8080;
var app = express();

app.use(express.static(__dirname + '/../public'));

router.addRoutes(app);

app.listen(port);