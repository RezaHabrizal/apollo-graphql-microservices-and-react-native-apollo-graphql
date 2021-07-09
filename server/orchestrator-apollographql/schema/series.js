const { gql } = require("apollo-server")
const axios = require("axios")
const seriesURL = "http://localhost:4002/series/"
const Redis = require("ioredis")
const redis = new Redis()

const typeDefs = gql`
  type Series {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  type ResultQuerySeries {
    deletedCount: Int
  }

  input SeriesInput {
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
  }

  extend type Query {
    series: [Series]
    findSeriesById(_id: ID): Movie
  }

  extend type Mutation {
    addSeries(newSeries: SeriesInput): Series
    updateOneSeries(_id: ID, input: SeriesInput): Series
    deleteOneSeries(_id: ID): ResultQuerySeries
  }
`

const resolvers = {
  Query: {
    series: () => {
      return redis.get("series").then((result) => {
        if (!result) {
          return axios({
            url: seriesURL,
          })
            .then(({ data }) => {
              redis.set("series", JSON.stringify(data))
              return data
            })
            .catch((err) => {
              throw err
            })
        } else {
          return JSON.parse(result)
        }
      })
    },
    findSeriesById: (_, args) => {
      return axios({
        url: seriesURL,
      })
        .then(({ data }) => {
          return data[0]
        })
        .catch((err) => {
          throw err
        })
    },
  },
  Mutation: {
    addSeries: (_, args) => {
      const newSeries = {
        title: args.newSeries.title,
        overview: args.newSeries.overview,
        poster_path: args.newSeries.poster_path,
        popularity: args.newSeries.popularity,
        tags: args.newSeries.tags,
      }
      return axios({
        url: seriesURL,
        method: "POST",
        data: newSeries,
      })
        .then(({ data }) => {
          redis.del("series")
          return data
        })
        .catch((err) => {
          throw err
        })
    },
    updateOneSeries: (_, args) => {
      return axios({
        url: seriesURL + args._id,
        method: "PUT",
        data: args.input,
      })
        .then(({ data }) => {
          redis.del("series")
          return data.value
        })
        .catch((err) => {
          throw err
        })
    },
    deleteOneSeries: (_, args) => {
      return axios({
        url: seriesURL + args._id,
        method: "DELETE",
      })
        .then(({ data }) => {
          redis.del("series")
          return data
        })
        .catch((err) => {
          throw err
        })
    },
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
