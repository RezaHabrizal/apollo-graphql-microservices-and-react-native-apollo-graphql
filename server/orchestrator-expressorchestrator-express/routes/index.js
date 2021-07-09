const Router = require("express").Router();
const MovieController = require("../controllers/movieController");
const SeriesController = require("../controllers/seriesController");

Router.get("/movies", MovieController.getMovies);
Router.post("/movies", MovieController.createOne);
Router.put("/movies/:id", MovieController.updateOne);
Router.delete("/movies/:id", MovieController.deleteOne);
Router.get("/movies/:id", MovieController.findById);

Router.get("/series", SeriesController.getSeries);
Router.post("/series", SeriesController.createOne);
Router.put("/series/:id", SeriesController.updateOne);
Router.delete("/series/:id", SeriesController.deleteOne);
Router.get("/series/:id", SeriesController.findById);

module.exports = Router;
