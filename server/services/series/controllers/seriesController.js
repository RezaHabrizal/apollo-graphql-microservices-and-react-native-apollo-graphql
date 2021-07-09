const Series = require("../models/Series");

class SeriesController {
  static findAll(req, res) {
    Series.findAll()
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err, "err findall"));
  }

  static createOne(req, res) {
    const { title, overview, poster_path, popularity, tags } = req.body;
    Series.createOne({
      title,
      overview,
      poster_path,
      popularity,
      tags,
    })
      .then((result) => res.status(201).json(result.ops[0]))
      .catch((err) => console.log(err, "err createOne"));
  }

  static updateOne(req, res) {
    const id = req.params.id;
    Series.updateOne(id, req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => console.log(err, "err update"));
  }

  static deleteOne(req, res) {
    const id = req.params.id;
    Series.deleteOne(id)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => console.log(err, "err delete"));
  }

  static findById(req, res) {
    const id = req.params.id;
    Series.findOne(id)
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err, "err find one"));
  }
}

module.exports = SeriesController;
