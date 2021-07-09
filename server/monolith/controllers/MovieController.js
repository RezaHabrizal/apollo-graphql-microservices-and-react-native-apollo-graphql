const Movie = require("../models/Movie");

class MovieController {
  static async findAll(req, res) {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
    } catch (error) {
      console.log(error, "Error Movie findAll");
    }
  }

  static async addMovie(req, res) {
    try {
      const newMovie = req.body;
      const createdMovie = await Movie.createMovie(newMovie);
      res.status(201).json(createdMovie);
    } catch (error) {
      console.log(error, "error addMovie");
    }
  }

  static async updateMovie(req, res) {
    try {
      const id = req.params.id;
      const updated = await Movie.updateMovie(id, req.body);
      res.status(200).json(updated);
    } catch (error) {
      console.log(error, "error update movie");
    }
  }

  static async deleteMovie(req, res) {
    try {
      const id = req.params.id;
      const deleted = await Movie.deleteMovie(id);
      res.status(200).json(deleted);
    } catch (error) {
      console.log(error, "error delete movie");
    }
  }
}

module.exports = MovieController;
