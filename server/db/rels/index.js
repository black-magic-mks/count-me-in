var db = require('../seraph');
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
  model.rel = {
    create: Q.nbind(seraphModel.db.rel.create,seraphModel.db.rel),
    read: Q.nbind(seraphModel.db.rel.read,seraphModel.db.rel),
    update: Q.nbind(seraphModel.db.rel.update,seraphModel.db.rel),
    delete: Q.nbind(seraphModel.db.rel.delete,seraphModel.db.rel),
  };
  model.relate = model.rel.create;
  model.relationships = Q.nbind(seraphModel.db.relationships,seraphModel.db);

  return model;
};

module.exports = {
  addRelMethods: addRelMethods
};
