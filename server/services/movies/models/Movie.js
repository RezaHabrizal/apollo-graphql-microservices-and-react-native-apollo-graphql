const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')

class Movie {
	static findAll() {
		return getDatabase().collection('Movies').find().toArray()
	}

	static createOne(newMovie) {
		return getDatabase().collection('Movies').insertOne(newMovie)
	}

	static updateOne(id, reqBody) {
		return getDatabase()
			.collection('Movies')
			.findOneAndUpdate(
				{ _id: ObjectId(id) },
				{
					$set: reqBody,
				},
				{ returnOriginal: false }
			)
	}

	static deleteOne(id) {
		return getDatabase()
			.collection('Movies')
			.deleteOne({ _id: ObjectId(id) })
	}

	static findOne(id) {
		return getDatabase()
			.collection('Movies')
			.find({ _id: ObjectId(id) })
			.toArray()
	}
}

module.exports = Movie
