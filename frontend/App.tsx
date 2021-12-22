import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

import { AppNav } from './src/navigation';

export default function App() {
	const [userId, setUserId] = useState<string>('619ee65d296e594128b07458');
	const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

	useEffect(() => {
		// setUser(testUser);
	}, []);

	return (
		<PaperProvider>
			<SafeAreaProvider>
				<AppNav userId={userId} />
			</SafeAreaProvider>
		</PaperProvider>
	);
}
