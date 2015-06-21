var expect = require('chai').expect;
var assert = require('chai').assert;
var request = require('request');
var User = require('../db/model/User');

describe('', function() {
  beforeEach(function() {
    // TODO: confirm logout is correct path
    // Logout the currently signed in user
    request('http://127.0.0.1:8080/logout', function(err, res, body) {});
  
    // Delete user therealest from db which will later be re-created later for test
    User.where('username', '=', 'therealest')
      .del()
      .catch(function(err) {
        throw {
          type: 'Database Error',
          message: 'Failed to create test username data'
        };
      });

  describe('User creation:', function() {

    var requestWithSession = request.defaults({jar: true});

    beforeEach(function(done) {
      new User({
        'username': 'therealest',
        'password': 'therealest',
      }).save().then(function() {
        var options = {
          'method': 'POST',
          'followAllRedirects': true,
          'uri': 'http://127.0.0.1:8080/login',
          'json': {
            'username': 'therealest',
            'password': 'therealest'
          }
        };
        requestWithSession(options, function(err, res, body) {
          done();
        })
      });
    });

    it('Only creates a valid username if such username does not already exist', function(done) {
      var callbackUser = function(user, cb) {
        User.where({username: user}, function(err, docs) {
          if (err) {
            console.error(err);
          }
          else {
            if (!docs.length) {
              User.save({id: 1, username: 'therealest'}, 'User', function(err, node) {
                if (err) {
                  console.error(err);
                } else {
                  console.log(node);
                }
              });
            } else {
              console.log('User Already Exists. Please Try Another Username!');
            }
          }
        });
      }
    });
  });
});
