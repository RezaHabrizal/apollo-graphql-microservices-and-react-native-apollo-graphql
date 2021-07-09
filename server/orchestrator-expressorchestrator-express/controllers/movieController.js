const axios = require("axios")
const { json } = require("express")
const baseURL = "http://localhost:4001"
const Redis = require("ioredis")
const redis = new Redis()

class MovieController {
  static getMovies(req, res) {
    redis.get("movies").then((result) => {
      if (!result) {
        axios({ url: `${baseURL}/movies` })
          .then(({ data }) => {
            redis.set("movies", JSON.stringify(data))
            res.status(200).json(data)
          })
          .catch((err) => console.log(err, "err getMovies"))
      } else {
        const data = JSON.parse(result)
        res.status(200).json(data)
      }
    })
  }

  static createOne(req, res) {
    console.log(req.body)
    axios({
      url: `${baseURL}/movies`,
      method: "POST",
      data: req.body,
    })
      .then(({ data }) => {
        redis.del("movies")
        res.status(201).json(data)
      })
      .catch((err) => console.log(err, "err createOneMovies"))
  }

  static updateOne(req, res) {
    const id = req.params.id
    axios({
      url: `${baseURL}/movies/${id}`,
      method: "PUT",
      data: req.body,
    })
      .then(({ data }) => {
        redis.del("movies")
        res.status(200).json(data)
      })
      .catch((err) => console.log(err, "err updateOneMovies"))
  }

  static deleteOne(req, res) {
    const id = req.params.id
    axios({
      url: `${baseURL}/movies/${id}`,
      method: "DELETE",
    })
      .then(({ data }) => {
        // redis.del("movies");
        res.status(200).json(data)
      })
      .catch((err) => console.log(err, "err deleteOneMovies"))
  }

  static findById(req, res) {
    const id = req.params.id
    axios({
      url: `${baseURL}/movies/${id}`,
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err, "err findByid")
      })
  }
}

module.exports = MovieController
