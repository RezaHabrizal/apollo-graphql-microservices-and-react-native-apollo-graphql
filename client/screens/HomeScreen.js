import React, { useState } from 'react'
import { Button, View, StyleSheet, Text, Dimensions } from 'react-native'
import { GET_MOVIES } from '../graphql/queries'
import { useQuery } from '@apollo/client'
import MasonryList from 'react-native-masonry-list'

const HomeScreen = ({ navigation }) => {
	const { data, loading, error } = useQuery(GET_MOVIES)

	let imagesUri = []

	if (loading) {
		return (
			<View>
				<Text>{loading}</Text>
			</View>
		)
	}

	if (error) {
		return (
			<View>
				<Text>{JSON.stringify(error)}</Text>
			</View>
		)
	}

	const { movies } = data
	movies.forEach((movie) =>
		imagesUri.push({ uri: movie.poster_path, details: { ...movie } })
	)

	const seeDetail = (value) => {
		navigation.navigate('MovieDetail', { data: value.details })
	}

	const addMovie = () => {
		navigation.navigate('AddMovie')
	}

	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(imagesUri)}</Text>
			<Button title="Add Movie" onPress={() => addMovie()} />
			<MasonryList
				columns={2}
				sorted={false}
				onPressImage={seeDetail}
				images={imagesUri}
			/>
		</View>
	)
}
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#ecf0f1',
	},
})
export default HomeScreen
