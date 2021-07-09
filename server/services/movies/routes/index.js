const Router = require("express").Router();
const MovieController = require("../controllers/movieController");

Router.get("/movies", MovieController.findAll);
Router.post("/movies", MovieController.createOne);
Router.get("/movies/:id", MovieController.findById);
Router.put("/movies/:id", MovieController.updateOne);
Router.delete("/movies/:id", MovieController.deleteOne);

module.exports = Router;
