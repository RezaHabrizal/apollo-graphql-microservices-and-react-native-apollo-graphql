const Router = require("express").Router();
const MovieController = require("../controllers/MovieController");
const TvSeriesController = require("../controllers/TvSeriesController");

Router.get("/movies", MovieController.findAll);
Router.post("/movies", MovieController.addMovie);
Router.put("/movies/:id", MovieController.updateMovie);
Router.delete("/movies/:id", MovieController.deleteMovie);

Router.get("/tv-series", TvSeriesController.findAll);
Router.post("/tv-series", TvSeriesController.addOne);
Router.put("/tv-series/:id", TvSeriesController.updateOne);
Router.delete("/tv-series/:id", TvSeriesController.deleteOne);

module.exports = Router;
