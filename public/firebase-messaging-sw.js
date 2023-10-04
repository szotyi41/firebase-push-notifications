importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

 //the Firebase config object 
const firebaseConfig = {
  apiKey: "AIzaSyDp91oefJzulevUOX2XY9AIsGczjtkorT0",
  authDomain: "credentialy.firebaseapp.com",
  projectId: "credentialy",
  storageBucket: "credentialy.appspot.com",
  messagingSenderId: "378447087146",
  appId: "1:378447087146:web:35fe21d40526a993042553"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});