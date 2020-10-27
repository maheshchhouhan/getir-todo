import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyCISQLQJ9Uy5yfvHtQWDSA5P_MGXQa7uQw',
  authDomain: 'todo-getir.firebaseapp.com',
  databaseURL: 'https://todo-getir.firebaseio.com',
  projectId: 'todo-getir',
  storageBucket: 'todo-getir.appspot.com',
  messagingSenderId: '477119200905',
  appId: '1:477119200905:web:73acbd13d04fe11c385058',
});

export { firebaseConfig as firebase };
