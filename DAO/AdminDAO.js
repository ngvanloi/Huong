var MongoClient = require("mongodb").MongoClient;
var url =
  "mongodb+srv://dbUser:dbpassword@cluster0-rbj1h.mongodb.net/dbPetsPlus";
var AdminDAO = {
  selectByUsernameAndPassword: function(username, password) {
    return new Promise(function(resolve, reject) {
      MongoClient.connect(url, function(err, db) {
        if (err) reject(err);
        var dbo = db.db("dbPetsPlus");
        var query = { username: username, password: password };
        dbo.collection("Admin").findOne(query, function(err, res) {
          if (err) reject(err);
          resolve(res);
          db.close();
        });
      });
    });
  }
};

module.exports = AdminDAO;
