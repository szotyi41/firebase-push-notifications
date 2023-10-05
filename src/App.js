import { useState } from "react";
import { onMessageListener, getPermission } from "./firebase";

function App() {

	const [notification, setNotification] = useState({ title: '', body: '' });
	const [permission, setPermission] = useState('pending');

	const getUserPermission = async () => {
		setPermission(await getPermission());

		onMessageListener().then((payload) => {
			console.log('Notification arrived', payload);
			setNotification({
				title: payload?.notification?.title,
				body: payload?.notification?.body,
			});
		});
	}

	return (
		<div className="App">
			<button onClick={() => getUserPermission()}>Get permission</button>
			{permission}
			<h1>Notifications will show here:</h1>
			<h2>{notification.title}</h2>
			<p>{notification.body}</p>
		</div>
	);
}

export default App;
