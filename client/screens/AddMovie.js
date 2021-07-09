import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	TouchableOpacity,
	Dimensions,
} from 'react-native'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE } from '../graphql/queries'

export default function AddMovie({ navigation }) {
	const [addMovie] = useMutation(ADD_MOVIE)

	const [inputForm, setInputForm] = useState({
		title: '',
		overview: '',
		popularity: 0,
		poster_path: '',
		tags: [],
	})

	const submitForm = (e) => {
		addMovie({
			variables: {
				newMovie: inputForm,
			},
		})
		navigation.replace('Home')
	}

	return (
		<View style={styles.container}>
			<Image style={styles.image} source={require('../assets/favicon.png')} />

			<StatusBar style="auto" />
			<View style={styles.inputView}>
				<TextInput
					style={styles.TextInput}
					placeholder="Title."
					placeholderTextColor="#003f5c"
					onChangeText={(text) => setInputForm({ ...inputForm, title: text })}
				/>
				<TextInput
					style={styles.TextInput}
					placeholder="Overview."
					placeholderTextColor="#003f5c"
					onChangeText={(text) =>
						setInputForm({ ...inputForm, overview: text })
					}
				/>
				<TextInput
					style={styles.TextInput}
					placeholder="poster url."
					placeholderTextColor="#003f5c"
					onChangeText={(text) =>
						setInputForm({ ...inputForm, poster_path: text })
					}
				/>
				<TextInput
					style={styles.TextInput}
					placeholder="popularity"
					placeholderTextColor="#003f5c"
					onChangeText={(text) =>
						setInputForm({ ...inputForm, popularity: Number(text) })
					}
				/>
				<TextInput
					style={styles.TextInput}
					placeholder="tags"
					placeholderTextColor="#003f5c"
					onChangeText={(text) =>
						setInputForm({ ...inputForm, tags: text.split(' ') })
					}
				/>
			</View>

			<TouchableOpacity style={styles.Btn} onPress={(e) => submitForm(e)}>
				<Text style={styles.loginText}>CREATE MOVIE</Text>
			</TouchableOpacity>
		</View>
	)
}

const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},

	image: {
		marginBottom: 40,
	},

	inputView: {
		backgroundColor: '#FFC0CB',
		borderRadius: 30,
		width: '70%',
		height: windowHeight,
		marginBottom: 20,
		alignItems: 'center',
	},

	TextInput: {
		height: '20%',
		flex: 1,
		padding: 10,
		marginLeft: 20,
	},

	forgot_button: {
		height: 30,
		marginBottom: 30,
	},

	Btn: {
		width: '80%',
		borderRadius: 25,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 40,
		backgroundColor: '#FF1493',
	},
})
