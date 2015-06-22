var passport = require('passport');
var bycrpt = require('bycrpt-nodejs');
var User = require('../db/model/User');
var routes = require('../router');

// TODO: confirm correct seraph method calls on User
passport.serializeUser(function(user, done) {
  done(null, user_id);
});

// TODO: determine how to find by id in seraph
passport.deserializeUser(function(user, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Use passport with name of strategy as first param which will later be used to identify strategy
// Type of strategy is second param and we want to use username-password / LocalStrategy
// LocalStrategy expects to find the user credentials in username-password, but allows the ability to use any other named parameters as well
// passReqToCallback allows access to the request object in the callback, enabling any parameter associated with the request
passport.use('login', new LocalStrategy({
  passReqToCallback: true
  },
  function(req, username, password, done) {
    // Check in db if a user with username exists or not
    User.where({'username': username},
      function(err, user) {
        // In case of any error, return the done method
        if (err)
          return done(err);
        // Username does not exist, log error & redirect back
        if (!user) {
          console.log('User Not Found with username '+username);
          return done(null, false,
            // connect-flash helps with error handling by providing flash messages which can be displayed to user on error 
            req.flash('message', 'User Not Found'));
        }
        // User exists but wrong password, log the error
        if (!isValidPassword(user, password)) {
          console.log('Invalid Password');
          return done(null, false, 
            req.flash('message', 'Invalid Password'));
        }
        // User and password both match, return user from
        // done method which will be treated like success
        return done(null, user);
      }
    );
}));

// Encrypt password before saving to db
var isValidPassword = function(user, password) {
  return bcrypt.compareSync(password, user.password);
};

// Find whether any user with a given username already exists or not
// If not, create a new user and save the user info to the db
// Else return the error using the done callback and flash messages
passport.use('signup', new LocalStrategy({
  passReqToCallback: true
}, 
function(req, username, password, done) {
  findOrCreateUser = function() {
    // Find a user in db with provided username
    User.where({'username': username}, function(err, user) {
      // In case of any error return
      if (err) {
        console.log('Error in Signup:'+err);
        return done(err);
      }
      // User already exists
      if (user) {
        console.log('User already exists');
        return done(null, false,
          req.flash('message', 'User Already Exists'));
      } else {
        // If there is no user create the user
        var newUser = new User();
        // Set the user's local credentials
        newUser.username = username;
        newUser.password = createHash(password);
      
        // Save the user
        newUser.save(function(err) {
          if (err) {
            console.log('Error saving user: '+err);
            throw err;
          }
          console.log('User Registration successful');
          return done(null, newUser);
        });
      }
    });
  };

    // Delay the execution of findOrCreateUser and execute the method in the next tick of the event loop
    process.nextTick(findOrCreateUser);
  });
);

// Generates hash using bcrypt
var createHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = function(passport) {
  // TODO: confirm correct authentication routes
  // GET login page
  routes.get('/', function(req, res) {
    // Display the login page with any flash message, if any
    res.render('index', { message: req.flash('message')});
  });

  // Handle login POST
  routes.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true
  }));

  // GET registration page
  routes.get('/signup', function(req, res) {
    res.render('register', {message: req.flash('message')});
  });

  // Handle registration POST
  routes.post('/signup', passport.authenticate('signup', {
    successRedirect: '/home',
    failureRedirect: '/signup',
    failureFlash: true
  }));

  // Handle logout using passport property request.logout()
  routes.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // Prevent unauthorized access to routes
  // GET home page
  routes.get('/home', isAuthenticated, function(req, res) {
    res.render('home', {user: req.user});
  });

  // If user is authenticated, call next()
  var isAuthenticated = function(req, res, next) {
    if (req.isAuthenticated())
      return next();
    res.redirect('/');
  }

  return routes;
}
