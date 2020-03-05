var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://dbUser:dbpassword@cluster0-rbj1h.mongodb.net/dbPetsPlus";
var CustomerDAO = {
  selectByUsernameAndPassword: function(username, password) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("dbPetsPlus");
        var query = { username: username, password: password };
        dbo.collection("Customers").findOne(query, function(err, res) {
          if (err) reject(err);
          resolve(res);
          db.close();
        });
      });
    });
  },
  selectByUsernameOrEmail: function(username, email) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("dbPetsPlus");
        var query = { $or: [{ username: username }, { email: email }] };
        dbo.collection("Customers").findOne(query, function(err, res) {
          if (err) reject(err);
          resolve(res);
          db.close();
        });
      });
    });
  },
  insert: function(customer) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("dbPetsPlus");
        dbo.collection("Customers").insertOne(customer, function(err, res) {
          if (err) reject(err);
          resolve(res.insertedCount > 0 ? res.insertedId : null);
          db.close();
        });
      });
    });
  },
  active: function(id, token) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("dbPetsPlus");
        var ObjectId = require("mongodb").ObjectId;
        var query = { _id: ObjectId(id), token: token };
        var newvalues = { $set: { active: 1 } };
        dbo
          .collection("Customers")
          .updateOne(query, newvalues, function(err, res) {
            if (err) reject(err);
            resolve(res.result.nModified > 0 ? true : false);
            db.close();
          });
      });
    });
  }
};

module.exports = CustomerDAO;
