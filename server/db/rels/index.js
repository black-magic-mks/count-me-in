var db = require('seraph')();
var Q = require('q');
var query = Q.nbind(db.query,db);

var addGetRelated = function(model) {
  var getRelated = function(idOrNode,rel) {
    var cypher = [
      'MATCH (n)',
      '-[:' + rel + ']->(x) ',
      'WHERE id(n)={id} ',
      'RETURN x'
    ].join('');

    var node = typeof idOrNode === 'object' ? idOrNode: {id:idOrNode};
    return query(cypher,node);
  };

  var getRelatedTo = function(idOrNode,rel) {
    var cypher = [
      'MATCH (x)',
      '-[:' + rel + ']->(n) ',
      'WHERE id(n)={id} ',
      'RETURN x'
    ].join('');

    var node = typeof idOrNode === 'object' ? idOrNode: {id:idOrNode};
    return query(cypher,node);
  };

  model.getRelated = getRelated;
  model.getRelatedTo = getRelatedTo;
  return model;
};

var addRelMethods = function(model,seraphModel) {
  model.type = seraphModel.type;

  addGetRelated(model,seraphModel);
  model.relate = Q.nbind(seraphModel.db.relate,seraphModel.db);

  return model;
};

module.exports = {
  addRelMethods: addRelMethods
};
