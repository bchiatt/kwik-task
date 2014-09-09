'use strict';

var Mongo  = require('mongodb');

function Priority(obj){
  this.name  = obj.name;
  this.color = obj.color;
}

Object.defineProperty(Priority, 'collection', {
  get: function(){return global.mongodb.collection('priorities');}
});

Priority.create = function(obj, cb){
  var p = new Priority(obj);
  Priority.collection.save(p, cb);
};

Priority.all = function(cb){
  Priority.collection.find().toArray(cb);
};

Priority.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Priority.collection.findOne({_id:_id}, cb);
};

module.exports = Priority;
