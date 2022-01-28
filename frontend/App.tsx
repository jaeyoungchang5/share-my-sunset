// external imports
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

// internal imports
import { AppNav, AuthNav } from './src/navigation';
import { getUser } from './src/utils';
import { AppLoadingPage } from './src/pages';

export default function App() {
	const [appUserId, setAppUserId] = useState<string>('');

	useEffect(() => {

	}, [appUserId]);

	const Stack = createNativeStackNavigator();

	return (
		<PaperProvider>
			<SafeAreaProvider>
				<NavigationContainer>
					<Stack.Navigator initialRouteName='AppLoading'>
						<Stack.Screen 
							name='AppLoading'
							component={AppLoadingPage}
							options={{
								headerShown: false
							}}
						/>
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
							initialParams={{appUserId: appUserId}}
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
