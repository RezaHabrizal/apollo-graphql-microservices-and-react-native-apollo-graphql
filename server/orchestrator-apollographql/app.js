const { ApolloServer } = require('apollo-server')
const movieSchema = require('./schema/movie')
const seriesSchema = require('./schema/series')

const server = new ApolloServer({
	typeDefs: [movieSchema.typeDefs, seriesSchema.typeDefs],
	resolvers: [movieSchema.resolvers, seriesSchema.resolvers],
})

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`)
})
