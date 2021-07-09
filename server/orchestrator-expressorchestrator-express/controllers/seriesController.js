const axios = require("axios")
const baseURL = "http://localhost:4002"
const Redis = require("ioredis")
const redis = new Redis()

class SeriesController {
  static getSeries(req, res) {
    redis.get("series").then((result) => {
      if (!result) {
        axios({ url: `${baseURL}/series` })
          .then(({ data }) => {
            redis.set("series", JSON.stringify(data))
            res.status(200).json(data)
          })
          .catch((err) => console.log(err, "err getseries"))
      } else {
        const data = JSON.parse(result)
        res.status(200).json(data)
      }
    })
  }

  static createOne(req, res) {
    axios({
      url: `${baseURL}/series`,
      method: "POST",
      data: req.body,
    })
      .then(({ data }) => {
        redis.del("series")
        res.status(201).json(data)
      })
      .catch((err) => console.log(err, "err createOneseries"))
  }

  static updateOne(req, res) {
    const id = req.params.id
    axios({
      url: `${baseURL}/series/${id}`,
      method: "PUT",
      data: req.body,
    })
      .then(({ data }) => {
        redis.del("series")
        res.status(200).json(data)
      })
      .catch((err) => console.log(err, "err updateOneseries"))
  }

  static deleteOne(req, res) {
    const id = req.params.id
    axios({
      url: `${baseURL}/series/${id}`,
      method: "DELETE",
    })
      .then(({ data }) => {
        redis.del("series")
        res.status(200).json(data)
      })
      .catch((err) => console.log(err, "err deleteOneseries"))
  }

  static findById(req, res) {
    const id = req.params.id
    axios({
      url: `${baseURL}/series/${id}`,
    })
      .then(({ data }) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        console.log(err, "err findById")
      })
  }
}

module.exports = SeriesController
