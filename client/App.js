import React from 'react'
import HomeScreen from './screens/HomeScreen'
import MovieDetail from './screens/MovieDetail'
import EditMovie from './screens/EditPage'
import AddMovie from './screens/AddMovie'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloProvider } from '@apollo/client/react'
import client from './graphql/client'

const Stack = createStackNavigator()

export default function App() {
	// const { data, loading, error } = useQuery(GET_MOVIES)

	return (
		<ApolloProvider client={client}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="MovieDetail" component={MovieDetail} />
					<Stack.Screen name="AddMovie" component={AddMovie} />
					<Stack.Screen name="EditMovie" component={EditMovie} />
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	)
}
