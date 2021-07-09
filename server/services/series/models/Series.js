const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongodb");

class Series {
  static findAll() {
    return getDatabase().collection("Series").find().toArray();
  }

  static createOne(newMovie) {
    return getDatabase().collection("Series").insertOne(newMovie);
  }

  static updateOne(id, reqBody) {
    return getDatabase()
      .collection("Series")
      .findOneAndUpdate(
        { _id: ObjectId(id) },
        {
          $set: reqBody,
        },
        { returnOriginal: false }
      );
  }

  static deleteOne(id) {
    return getDatabase()
      .collection("Series")
      .deleteOne({ _id: ObjectId(id) });
  }

  static findOne(id) {
    return getDatabase()
      .collection("Series")
      .find({ _id: ObjectId(id) })
      .toArray();
  }
}

module.exports = Series;
