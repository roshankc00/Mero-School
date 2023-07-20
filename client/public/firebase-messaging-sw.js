importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');
// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCm5ofguOPYYNLtxZ2gRZR-Xg-G5VdxDmE",
    authDomain: "mero-school-66a74.firebaseapp.com",
    projectId: "mero-school-66a74",
    storageBucket: "mero-school-66a74.appspot.com",
    messagingSenderId: "572335667716",
    appId: "1:572335667716:web:a29dd94f3fb82b2cc11351",
    measurementId: "G-C9HY35G1SX"
  };
  
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
    console.log('Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
    };

    self.registration.showNotification(notificationTitle,
        notificationOptions);
});