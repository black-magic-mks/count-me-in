var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty')();
var auth = require('./auth');
var router = require('./router');
var aws = require('aws-sdk');
var expressSession = require('express-session');

var port = 8080;
var app = express();

app.use(expressSession({
  secret: 'mySecretKey',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(multiparty);
app.use(express.static(__dirname + '/../public'));
app.get('/favicon.ico', function(_, res) { res.type('image/x-icon').end(); });

console.log(auth);
app.use(auth.dummy);
app.use('/api',router);

app.use(function(err, req, res, next) {
  console.error(err);
  res.status(500).send(err.toString());
});

app.listen(port);
