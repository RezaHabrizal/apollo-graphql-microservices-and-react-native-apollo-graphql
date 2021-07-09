const { gql } = require('apollo-server')
const axios = require('axios')
const movieURL = 'http://localhost:4001/movies/'
const Redis = require('ioredis')
const redis = new Redis()

const typeDefs = gql`
	# Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

	type Movie {
		_id: ID
		title: String
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	type ResultQueryMovie {
		deletedCount: Int
	}

	# The "Query" type is special: it lists all of the available queries that
	# clients can execute, along with the return type for each. In this
	# case, the "books" query returns an array of zero or more Books (defined above).
	type Query {
		movies: [Movie]
		findOne(_id: ID): Movie
	}

	input MovieInput {
		title: String
		overview: String
		poster_path: String
		popularity: Int
		tags: [String]
	}

	type Mutation {
		addMovie(newMovie: MovieInput): Movie
		deleteOne(_id: ID): ResultQueryMovie
		updateOne(_id: ID, input: MovieInput): Movie
	}
`

const resolvers = {
	Query: {
		movies: () => {
			return redis.get('movies').then((result) => {
				if (!result) {
					return axios({
						url: movieURL,
					})
						.then(({ data }) => {
							redis.set('movies', JSON.stringify(data))
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
		findOne: (parent, args, context, info) => {
			return axios({
				url: movieURL + args._id,
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
		deleteOne: (parent, args, constext, info) => {
			return axios({
				url: movieURL + args._id,
				method: 'DELETE',
			})
				.then(({ data }) => {
					redis.del('movies')
					return data
				})
				.catch((err) => {
					throw err
				})
		},
		addMovie: (parent, args, context, info) => {
			const newMovie = {
				title: args.newMovie.title,
				overview: args.newMovie.overview,
				poster_path: args.newMovie.poster_path,
				popularity: args.newMovie.popularity,
				tags: args.newMovie.tags,
			}
			return axios({
				url: movieURL,
				method: 'POST',
				data: newMovie,
			})
				.then(({ data }) => {
					redis.del('movies')
					return data
				})
				.catch((err) => {
					throw err
				})
		},
		updateOne: (parent, args, context, info) => {
			return axios({
				url: movieURL + args._id,
				method: 'PUT',
				data: args.input,
			})
				.then(({ data }) => {
					redis.del('movies')
					return data.value
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
