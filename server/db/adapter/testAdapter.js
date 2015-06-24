var db = require('seraph')();
var Q = require('q');
var query = Q.nbind(db.query,db);

var clearData = function(req, res, next) {
  var cypher = [
    'MATCH (n), ()-[r]->()',
    'DELETE r, n'
  ].join(' ');

  query(cypher)
  .then(function(result) {
    res.send('Removed all data from database');
  })
  .catch(next);
};

var fillData = function(req, res, next) {
  var cypher = [
    'CREATE (u1:User {username: "therealest"})',
    'CREATE (u2:User {username: "mengel"})',
    'CREATE (pl1:Pledge {pledgename: "code"})',
    'CREATE (pl2:Pledge {pledgename: "piano"})',
    'CREATE (po1:Post {text: "Learn the C Major scale today!"})',
    'CREATE (po2:Post {text: "I love JavaScript!"})',
    'CREATE (co1:Comment {text: "Me too!!"})',
    'CREATE (u1)-[:FOLLOWS]->(u2)',
    'CREATE (u1)-[:SUBSCRIBES_TO]->(pl1)',
    'CREATE (u1)-[:SUBSCRIBES_TO]->(pl2)',
    'CREATE (u2)-[:SUBSCRIBES_TO]->(pl1)',
    'CREATE (u1)-[:POSTED]->(po1)',
    'CREATE (po1)-[:POSTED_IN]->(pl2)',
    'CREATE (u2)-[:POSTED]->(po2)',
    'CREATE (po2)-[:POSTED_IN]->(pl1)',
    'CREATE (u1)-[:LIKED]->(po2)',
    'CREATE (u1)-[:WROTE]->(co1)',
    'CREATE (co1)-[:WRITTEN_IN]->(po2)'
  ].join(' ');

  query(cypher)
  .then(function(result) {
    res.send('Filled database with dummy data');
  })
  .catch(next);
};

module.exports = {
  clearData: clearData,
  fillData: fillData
};
