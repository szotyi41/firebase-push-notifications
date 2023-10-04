import { useEffect, useState } from "react";
import { onMessageListener, requestPermission } from "./firebase";

function App() {

	const [notification, setNotification] = useState({ title: '', body: '' });

	useEffect(() => {
		console.log('Need user permission');
		requestPermission();
		const unsubscribe = onMessageListener().then((payload) => {
			console.log('Notification arrived', payload);
			setNotification({
				title: payload?.notification?.title,
				body: payload?.notification?.body,
			});
		});
		return () => {
			unsubscribe.catch((err) => console.log('failed: ', err));
		};
	}, []);

	return (
		<div className="App">
			<h1>Notifications will show here:</h1>
			<h2>{notification.title}</h2>
			<p>{notification.body}</p>
		</div>
	);
}

export default App;
