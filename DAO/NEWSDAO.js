var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://dbUser:dbpassword@cluster0-rbj1h.mongodb.net/dbPetsPlus";
var NEWSDAO = {
  insert: function(toy) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbPetsPlus");
        dbo.collection("NEWs").insertOne(toy, function(err, res) {
          if (err) return reject(err);
          resolve(res.insertedCount > 0 ? true : false);
          db.close();
        });
      });
    });
  },
  getAll: function() {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbPetsPlus");
        var query = {};
        dbo
          .collection("NEWs")
          .find(query)
          .toArray(function(err, res) {
            if (err) return reject(err);
            resolve(res);
            db.close();
          });
      });
    });
  },
  getDetails: function(id) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbPetsPlus");
        var ObjectId = require("mongodb").ObjectId;
        var query = { _id: ObjectId(id) };
        dbo.collection("NEWs").findOne(query, function(err, res) {
          if (err) return reject(err);
          resolve(res);
          db.close();
        });
      });
    });
  }
};
module.exports = NEWSDAO;
