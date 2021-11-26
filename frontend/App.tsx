import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FeedPage, NotificationsPage, PostPage, SearchPage, UserPage } from './src';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
	const Tab = createBottomTabNavigator(); 

	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<Tab.Navigator initialRouteName='Feed'>
					<Tab.Screen 
						name='Feed' 
						component={FeedPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <MaterialIcons name="home-filled" size={size} />
							})
						}}
					/>
					<Tab.Screen 
						name='Search' 
						component={SearchPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <Ionicons name="search-sharp" size={size} />
							})
						}}
					/>
					<Tab.Screen 
						name='Post' 
						component={PostPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <MaterialIcons name="add-circle" size={size} />
							})
						}}
					/>
					<Tab.Screen 
						name='Notifications' 
						component={NotificationsPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <Ionicons name="notifications" size={size} />
							})
						}}
					/>
					<Tab.Screen 
						name='User' 
						component={UserPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <FontAwesome name="user" size={size} />
							})
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
