var db = require('seraph')();
var Q = require('q');
var query = Q.nbind(db.query,db);

var clearData = function(req, res, next) {
  var cypherRels = 'MATCH ()-[r]->() DELETE r';
  var cypherNodes = 'MATCH (n) DELETE n';

  query(cypherRels)
  .then(function(){
    return query(cypherNodes);
  })
  .then(function() {
    res.send('Removed all data from database');
  })
  .catch(next);
};

var fillData = function(req, res, next) {
  var cypher = [
  'CREATE (u1:User {username: "therealest"})',
   'CREATE (u2:User {username: "mengel"})',
   'CREATE (u3:User {username: "nathan"})',
   'CREATE (pl1:Pledge {pledgename: "code", mission: "I want to learn JavaScript by July!", coverimage: "http://groups.engin.umd.umich.edu/CIS/course.des/cis400/javascript/javascript.jpg", lastpost: "I just hacked into the hashing algorithm using a rainbow table!"})',
   'CREATE (pl2:Pledge {pledgename: "piano", mission: "I want to learn Piano by August!", coverimage: "http://cdn.roland.com/assets/images/products/gallery/v_piano_front_stand_gal.jpg", lastpost: "I just played piano!"})',
   'CREATE (pl3:Pledge {pledgename: "LoL", mission: "I want to play more League of Legends!", coverimage: "https://signup.leagueoflegends.com/theme/signup_theme/img/signup_logo2_clean.png", lastpost: "I just got into Diamond I"})',
   'CREATE (po1:Post {username: "mengel", text: "Learn the C Major scale today!", title: "Coding Day 1", aws_url: "http://www.lovethispic.com/uploaded_images/37623-Cute-Dog.jpg"})',
   'CREATE (po2:Post {username: "therealest", text: "I love JavaScript!", title: "Coding Day 2", aws_url: "http://thewowstyle.com/wp-content/uploads/2015/04/funny-dog-pics37.jpg"})',
   'CREATE (po3:Post {username: "nathan", text: "Just got into Diamon II", title: "League of Legends 1", aws_url: "http://www.nerdist.com/wp-content/uploads/2015/01/League-of-Legends_4.jpg"})',
   'CREATE (po4:Post {username: "nathan", text: "GOT INTO DIAMOND III!", title: "League of Legends 2", aws_url: "http://www11.onrpg.com/wp-content/gallery/league-of-legends/league-of-legends-05.jpg"})',
   'CREATE (co1:Comment {text: "Me too!!"})',
   'CREATE (u1)-[:FOLLOWS]->(u2)',
   'CREATE (u1)-[:SUBSCRIBES_TO]->(pl1)',
   'CREATE (u1)-[:SUBSCRIBES_TO]->(pl2)',
   'CREATE (u2)-[:SUBSCRIBES_TO]->(pl1)',
   'CREATE (u3)-[:SUBSCRIBES_TO]->(pl3)',
   'CREATE (u1)-[:POSTED]->(po1)',
   'CREATE (po1)-[:POSTED_IN]->(pl2)',
   'CREATE (u2)-[:POSTED]->(po2)',
   'CREATE (po2)-[:POSTED_IN]->(pl1)',
   'CREATE (u1)-[:LIKED]->(po2)',
   'CREATE (u1)-[:WROTE]->(co1)',
   'CREATE (co1)-[:WRITTEN_IN]->(po2)',
   'CREATE (u3)-[:POSTED]->(po3)',
   'CREATE (u3)-[:POSTED]->(po4)'
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
