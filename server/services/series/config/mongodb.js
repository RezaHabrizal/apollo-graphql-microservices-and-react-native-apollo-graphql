const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const dbName = "series-service-db";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;

function connect(cb) {
  client.connect(function (err) {
    if (err) {
      console.log(err, "failed to connect mongodb");
    } else {
      console.log("successfully connect mongodb");
      db = client.db(dbName);
    }
    cb(err);
  });
}

function getDatabase() {
  return db;
}

module.exports = {
  connect,
  getDatabase,
};
