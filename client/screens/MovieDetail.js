import { useMutation } from '@apollo/client'
import React from 'react'
import { View, Image, StyleSheet, Text, Dimensions, Button } from 'react-native'
import { DELETE_MOVIE } from '../graphql/queries'
const MovieDetail = ({ route, navigation }) => {
	const [deleteMovie] = useMutation(DELETE_MOVIE)

	const goDeleteMovie = (id) => {
		deleteMovie({
			variables: {
				_id: id,
			},
		})
		navigation.navigate('Home')
	}

	const goEditMovie = (data) => {
		navigation.navigate('EditMovie', { data })
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={{
					uri: route.params.data.poster_path,
				}}
			/>
			<Text style={styles.paragraph}>Title : {route.params.data.title}</Text>
			<Text style={styles.paragraph}>
				Overview : {route.params.data.overview}
			</Text>
			<Text style={styles.paragraph}>
				Popularity: {route.params.data.popularity}
			</Text>
			<Text style={styles.paragraph}>
				Genre: {JSON.stringify(route.params.data.tags)}
			</Text>
			<Button
				title="EDIT MOVIE"
				onPress={() => goEditMovie(route.params.data)}
			/>
			<Button
				title="DELETE"
				onPress={() => goDeleteMovie(route.params.data._id)}
			/>
		</View>
	)
}
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	image: {
		width: windowWidth,
		height: windowHeight,
		textAlign: 'center',
	},
	paragraph: {
		textAlign: 'center',
	},
})

export default MovieDetail
