// import firebase from 'react-native-firebase';
import * as firebase from 'firebase';

import Constants from 'expo-constants';
import md5 from 'md5';

const firebaseConfig = {
  apiKey: 'AIzaSyA50dxa7QwsaIZH5YOoYrcmqR_EbFqne54',
  authDomain: 'obanky-6d9e0.firebaseapp.com',
  databaseURL: 'https://obanky-6d9e0.firebaseio.com',
  projectId: 'obanky-6d9e0',
  storageBucket: 'obanky-6d9e0.appspot.com',
  messagingSenderId: '550593315055',
  appId: '1:550593315055:web:adcaa5cdf7760734331b1a',
};

firebase.initializeApp(firebaseConfig);

class FirebaseService {
  static async signIn(idToken, accessToken) {
    const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
    return await firebase.auth().signInWithCredential(credential);
  }

  static async signOut() {
    return await firebase.auth().signOut();
  }

  static addProduct(imageUrl, name, price, color, size) {
    return this.productsCollection().add({ imageUrl, name, price, color, size });
  }

  static setProduct(id, imageUrl, name, price, color, size) {
    return this.productsCollection().doc(id).set({ imageUrl, name, price, color, size });
  }

  static deleteProduct(id) {
    return this.productsCollection().doc(id).delete();
  }

  static productsCollection() {
    return firebase.firestore().collection('products');
  }

  static uploadImage(path) {
    const id = imageId();
    const metadata = { cacheControl: 'public,max-age=604800', contentType: 'image/jpeg' };
    return firebase.storage().ref(`/products/images/${id}.jpg`).putFile(path, metadata);
  }
}

// used only to generate a unique id
// ideally, the server would generate this unique id
function imageId() {
  const uniqueID = Constants.sessionId;
  const date = Date.parse(Date());
  return md5(`${uniqueID}-${date}`);
}

export { FirebaseService };
