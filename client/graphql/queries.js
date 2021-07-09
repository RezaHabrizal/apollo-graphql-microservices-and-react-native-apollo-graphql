import { gql } from '@apollo/client'

export const GET_MOVIES = gql`
	query getMovies {
		movies {
			_id
			title
			overview
			poster_path
			popularity
			tags
		}
	}
`

export const ADD_MOVIE = gql`
	mutation addMovie($newMovie: MovieInput) {
		addMovie(newMovie: $newMovie) {
			_id
			title
			overview
			popularity
			poster_path
			tags
		}
	}
`

export const DELETE_MOVIE = gql`
	mutation deleteOne($_id: ID!) {
		deleteOne(_id: $_id) {
			deletedCount
		}
	}
`
export const UPDATE_MOVIE = gql`
	mutation updateOne($_id: ID!, $input: MovieInput) {
		updateOne(_id: $_id, input: $input) {
			title
			overview
			popularity
			poster_path
			tags
		}
	}
`
