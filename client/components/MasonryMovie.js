import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import MasonryList from 'react-native-masonry-list'

export default function MasonryMovie({ imagesUri }) {
	const seeDetail = (value) => {
		navigation.navigate('MovieDetail', { data: value.details })
	}

	return (
		<View style={styles.StyleSheet}>
			<Text>{JSON.stringify(imagesUri)}</Text>
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
