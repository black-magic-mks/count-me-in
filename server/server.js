var express = require('express');
var bodyParser = require('body-parser');

var auth = require('./auth');
var router = require('./router');

var port = 8080;
var app = express();


app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.get('/favicon.ico', function(_, res) { res.type('image/x-icon').end(); });

app.use(auth);
router.addRoutes(app);

app.listen(port);