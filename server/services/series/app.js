const express = require("express");
const app = express();
const PORT = process.env.PORT || 4002;
const mongo = require("./config/mongodb");
const cors = require("cors");
const router = require("./routes");

mongo.connect(function (err) {
  if (!err) {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(router);

    app.listen(PORT, () => console.log("server listen to port " + PORT));
  }
});
