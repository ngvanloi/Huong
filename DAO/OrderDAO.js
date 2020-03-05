var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://dbUser:dbpassword@cluster0-rbj1h.mongodb.net/dbPetsPlus";
var OrderDAO = {
  insert: function(order) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbPetsPlus");
        dbo.collection("Orders").insertOne(order, function(err, res) {
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
          .collection("Orders")
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
        dbo.collection("Orders").findOne(query, function(err, res) {
          if (err) return reject(err);
          resolve(res);
          db.close();
        });
      });
    });
  },
  update: function(id, newStatus) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("dbPetsPlus");
        var ObjectId = require("mongodb").ObjectId;
        var query = { _id: ObjectId(id) };
        var newvalues = { $set: { status: newStatus } };
        dbo
          .collection("Orders")
          .updateOne(query, newvalues, function(err, res) {
            if (err) reject(err);
            resolve(res.result.nModified > 0 ? true : false);
            db.close();
          });
      });
    });
  }
};
module.exports = OrderDAO;
