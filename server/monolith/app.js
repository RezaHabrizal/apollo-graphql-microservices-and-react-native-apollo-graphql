const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
const { connect } = require("./config/mongodb");
const router = require("./routes");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

connect().then(() => {
  console.log("connect to mongodb");
  app.listen(PORT, () => console.log(`listen to port: ${PORT}`));
});
