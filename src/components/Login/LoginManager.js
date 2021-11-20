import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebase.config';
import { getAuth, FacebookAuthProvider, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

export const initializeLoginFramework = () => {
    if(firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = () => {
    const googleProvider = new GoogleAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, googleProvider)
      .then(res => {
        const { displayName, photoURL, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL,
          success: true,
        };
        return signedInUser;
      })
      .catch(err => {
        console.log(err)
        console.log(err.message)
      })
}

export const handleFbSignIn = () => {
    const fbProvider = new FacebookAuthProvider();
    const auth = getAuth();
    return signInWithPopup(auth, fbProvider)
      .then((result) => {
        const user = result.user;
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        user.success =true
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
      });
  }

export const handleSignOut = () => {
  const auth = getAuth();
    return signOut(auth)
      .then(res => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          photo: '',
          email: '',
          error: '',
          success: false
        }
        return signOutUser;
      })
      .catch(err => {
        console.log(err)
      })
}

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
  .then( res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    updateUserName(name);
    return newUserInfo;
  })
  .catch( error => {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}

export const signInWithEmailAndPassword = (email, password) =>{
  return firebase.auth().signInWithEmailAndPassword(email, password)
  .then(res => {
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success = true;
    return newUserInfo;
  })
  .catch(function(error) {
    const newUserInfo = {};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    return newUserInfo;
  });
}

const updateUserName = name =>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
  }).then(function() {
    console.log('user name updated successfully')
  }).catch(function(error) {
    console.log(error)
  });
}