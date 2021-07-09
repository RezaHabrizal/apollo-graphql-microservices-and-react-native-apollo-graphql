const Router = require("express").Router();
const SeriesController = require("../controllers/seriesController");

Router.get("/series", SeriesController.findAll);
Router.get("/series/:id", SeriesController.findById);
Router.post("/series", SeriesController.createOne);
Router.put("/series/:id", SeriesController.updateOne);
Router.delete("/series/:id", SeriesController.deleteOne);

module.exports = Router;
