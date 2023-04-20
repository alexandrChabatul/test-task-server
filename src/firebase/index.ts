import { FirebaseApp, initializeApp } from 'firebase/app';
import firebaseConfig from './config/config';

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
