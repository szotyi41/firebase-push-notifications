import { initializeApp } from "firebase/app";

import { getMessaging, getToken, onMessage } from 'firebase/messaging';



// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyDp91oefJzulevUOX2XY9AIsGczjtkorT0",
	authDomain: "credentialy.firebaseapp.com",
	projectId: "credentialy",
	storageBucket: "credentialy.appspot.com",
	messagingSenderId: "378447087146",
	appId: "1:378447087146:web:35fe21d40526a993042553"
};

const keyPair = `BBbxSPpr5co9ai-CW-GaUX03utv-OpNlK0sdGLRenNTaYuUcgg_zHrhw2mMFxrkY7mVZNcMdwhpijBH4nwEnZEk`;

// Initialize Firebase
const firebaseClient = initializeApp(firebaseConfig);
const firebaseMessaging = getMessaging(firebaseClient);


function askNotificationPermission() {
	return new Promise((resolve, reject) => {
		if (checkNotificationPromise()) {
			Notification.requestPermission().then(resolve)
		} else {
			Notification.requestPermission(resolve)
		}
	})
}

function checkNotificationPromise() {
	try {
		Notification.requestPermission().then();
	} catch (e) {
		return false;
	}

	return true;
}

export const requestPermission = async () => {

	document.body.innerHTML += 'Get persmission';
	console.log("Requesting User Permission......");

	askNotificationPermission().then(permission => {

		if (permission === "granted") {

			console.log("Notification User Permission Granted.");
			return getToken(firebaseMessaging, { vapidKey: keyPair })
				.then((currentToken) => {

					if (currentToken) {
						document.body.innerHTML += 'Token: ' + currentToken;
						console.log('Client Token: ', currentToken);
					} else {
						document.body.innerHTML += 'Failed to generate the app registration token.';
						console.log('Failed to generate the app registration token.');
					}
				})
				.catch((err) => {
					document.body.innerHTML += 'An error occurred when requesting to receive the token.' + err.toString();
					console.log('An error occurred when requesting to receive the token.', err);
				});
		} else {
			document.body.innerHTML += "User Permission Denied." + permission;
			console.log("User Permission Denied.", permission);
		}

	});

}

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(firebaseMessaging, (payload) => {
			resolve(payload);
		});
	});