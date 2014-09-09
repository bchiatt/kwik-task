'use strict';

var Mongo    = require('mongodb'),
    Priority = require('./priority'),
    async    = require('async');

function Task(obj){
  this.name       = obj.name;
  this.due        = new Date(obj.due);
  this.priority   = Mongo.ObjectID(obj.priority);
  this.isComplete = false;
}

Object.defineProperty(Task, 'collection', {
  get: function(){return global.mongodb.collection('tasks');}
});

Task.create = function(obj, cb){
  var t = new Task(obj);
  Task.collection.save(t, function(err, task){
    iterator(task, cb);
  });
};

Task.all = function(cb){
  Task.collection.find().toArray(function(err, tasks){
    async.map(tasks, iterator, cb);
  });
};

Task.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);
  Task.collection.findOne({_id:_id}, function(err, obj){
    var task = Object.create(Task.prototype);
    task = _.extend(task, obj);
    cb(err, task);
  });
};

module.exports = Task;

//private functions

function iterator(task, cb){
  Priority.findById(task.priority, function(err, priority){
    task.priority = priority;
    cb(null, task);
  });
}
