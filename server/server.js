var express = require('express');
var bodyParser = require('body-parser');
var router = require('./router');
var passport = require('passport');
var expressSession = require('express-session');

var port = 8080;
var app = express();

// Configues passport
app.use(expressSession({secret: 'mySecretKey'}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../public'));
app.get('/favicon.ico', function(_, res) { res.type('image/x-icon').end(); });

router.addRoutes(app);

app.listen(port);