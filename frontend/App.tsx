import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FeedPage, NotificationsPage, PostPage, SearchPage, UserPage } from './src/pages';
import { IUser } from './src/interfaces';

export default function App() {
	const Tab = createBottomTabNavigator(); 

	const [user, setUser] = useState<IUser>();
	const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

	const testUser = {
		firstName: 'JaeYoung',
		lastName: 'Chang',
		username: 'jchang',
		bio: 'Sup yo',
		privacyMode: 0,
		friends: ['Maureen', 'Jarryn'],
		friendRequests: [],
		sunsets: []
	}

	useEffect(() => {
		setUser(testUser);
	}, []);

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
						initialParams={{user: user}}
					/>
					<Tab.Screen 
						name='Search' 
						component={SearchPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <Ionicons name="search-sharp" size={size} />
							})
						}}
						initialParams={{user: user}}
					/>
					<Tab.Screen 
						name='Post' 
						component={PostPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <MaterialIcons name="add-circle" size={size} />
							})
						}}
						initialParams={{user: user}}
					/>
					<Tab.Screen 
						name='Notifications' 
						component={NotificationsPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <Ionicons name="notifications" size={size} />
							})
						}}
						initialParams={{user: user}}
					/>
					<Tab.Screen 
						name='User' 
						component={UserPage}
						options={{
							tabBarIcon: (({focused, color, size}) => {
								return <FontAwesome name="user" size={size} />
							})
						}}
						initialParams={{user: user}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		</SafeAreaProvider>
	);
}
