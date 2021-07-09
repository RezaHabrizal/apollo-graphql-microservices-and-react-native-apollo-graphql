const { getDatabase } = require("../config/mongodb");

class TvSeries {
  static findAll() {
    return getDatabase().collection("TvSeries").find().toArray();
  }

  static createTvSeries(newTvSeries) {
    return getDatabase().collection("TvSeries").insertOne(newTvSeries);
  }

  static updateTvSeries(id, reqBody) {
    const { title, overview, poster_path, popularity } = reqBody;
    return getDatabase()
      .collection("TvSeries")
      .updateOne(
        { _id: ObjectId(id) },
        {
          $set: {
            title,
            overview,
            poster_path,
            popularity,
          },
        }
      );
  }

  static deleteOne(id) {
    return getDatabase()
      .collection("TvSeries")
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = TvSeries;
