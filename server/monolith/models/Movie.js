const { ObjectId } = require("bson");
const { getDatabase } = require("../config/mongodb");

class Movie {
  static findAll() {
    return getDatabase().collection("Movies").find().toArray();
  }

  static createMovie(newMovie) {
    return getDatabase().collection("Movies").insertOne(newMovie);
  }

  static updateMovie(id, reqBody) {
    const { title, overview, poster_path, popularity } = reqBody;
    return getDatabase()
      .collection("Movies")
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

  static deleteMovie(id) {
    return getDatabase()
      .collection("Movies")
      .deleteOne({ _id: ObjectId(id) });
  }
}

module.exports = Movie;
