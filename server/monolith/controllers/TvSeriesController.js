const TvSeries = require("../models/TvSeries");

class TvSeriesController {
  static async findAll(req, res) {
    try {
      const tvseries = await TvSeries.findAll();
      res.status(200).json(tvseries);
    } catch (error) {
      console.log(error, "Error Movie findAll");
    }
  }

  static async addOne(req, res) {
    try {
      const newTvSeries = req.body;
      const createdTvSeries = await TvSeries.createTvSeries(newTvSeries);
      res.status(201).json(createdTvSeries);
    } catch (error) {
      console.log(error, "error addMovie");
    }
  }

  static async updateOne(req, res) {
    try {
      const id = req.params.id;
      const updated = await TvSeries.updateTvSeries(id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      console.log(error, "error update movie");
    }
  }

  static async deleteOne(req, res) {
    try {
      const id = req.params.id;
      const deleted = await TvSeries.deleteOne(id);
      res.status(200).json(deleted);
    } catch (error) {
      console.log(error, "error delete movie");
    }
  }
}

module.exports = TvSeriesController;
