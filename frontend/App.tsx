// external imports
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// internal imports
import { AppNav, AuthNav } from './src/navigation';
import { getUser } from './src/utils';

export default function App() {
	const [userId, setUserId] = useState<string>('');

	const Stack = createNativeStackNavigator();

	// async function loadUser() {
	// 	const res = await getUser();
	// 	if (res) {
	// 		console.log('loadUser');
	// 		console.log(res);
	// 		setUserId(res.userId);
	// 	}
	// 	return res;
	// }

	// useEffect(() => {
	// 	loadUser();
	// }, []);

	return (
		<PaperProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='Auth'>
						<Stack.Screen 
							name='Auth'
							component={AuthNav}
							options={{
								headerShown: false
							}}
						/>
						<Stack.Screen 
							name='App'
							component={AppNav}
							initialParams={{userId: userId}}
							options={{
								headerShown: false
							}}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		</PaperProvider>
	);
}
