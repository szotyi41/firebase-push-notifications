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

async function handlePermission() {
  return new Promise((resolve) => {
    const timeoutId = setInterval(() => {
      if (Notification.permission === 'granted') {
        handleComplete(Notification.permission);
      }
    }, 3000);


    const handleComplete = (permission) => {
      clearInterval(timeoutId);
      resolve(permission);
    };

    Notification.requestPermission(handleComplete)?.then?.(handleComplete);
  });
}

export const getPermission = async () => {
	return new Promise(async (resolve, reject) => {
		document.body.innerHTML += 'Get persmission';
		console.log("Requesting User Permission......");

		const permission = await handlePermission();

		if (permission === "granted") {

			console.log("Notification User Permission Granted.");
			return getToken(firebaseMessaging, { vapidKey: keyPair })
				.then((currentToken) => {

					if (currentToken) {
						document.body.innerHTML += 'Token: ' + currentToken;
						console.log('Client Token: ', currentToken);
						resolve(currentToken);
					} else {
						document.body.innerHTML += 'Failed to generate the app registration token.';
						console.log('Failed to generate the app registration token.');
						reject('Failed to generate the app registration token.');
					}
				})
				.catch((err) => {
					document.body.innerHTML += 'An error occurred when requesting to receive the token.' + err.toString();
					console.log('An error occurred when requesting to receive the token.', err);
					reject('An error occurred when requesting to receive the token.' + err.toString());
				});
		} else {
			document.body.innerHTML += "User Permission Denied." + permission;
			console.log("User Permission Denied.", permission);
			reject('User Permission Denied.' + permission);
		}
	})

}

export const onMessageListener = () =>
	new Promise((resolve) => {
		onMessage(firebaseMessaging, (payload) => {
			resolve(payload);
		});
	});