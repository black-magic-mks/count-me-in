var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty')();
var auth = require('./auth');
var router = require('./router');

var port = 8080;
var app = express();

app.use(bodyParser.json());
app.use(multiparty);
app.use(express.static(__dirname + '/../public'));
app.get('/favicon.ico', function(_, res) { res.type('image/x-icon').end(); });

app.use(auth);
app.use('/api',router);

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err.toString());
});

app.listen(port);
