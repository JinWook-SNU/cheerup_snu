import * as firebase from 'firebase';
import {firebaseConfig} from './firebaseConfig';
import * as dateFormat from 'dateformat'

export default class Api {

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  //일단은 샘플로 넣어놓겠습니다.
  localLogin(userName, userEmail) {
    localStorage.setItem('userName', userName);
    localStorage.setItem('userEmail', userEmail);
  }

  //구글로 로그인
  signInWithGoogle() {
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({prompt:'select_account'});
    const signInWithGoogle = () => auth.signInWithPopup(provider);
    signInWithGoogle();
  }
  
  //유저 정보 가져오기
  changeUserStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var userName = user.displayName;
        var userEmail = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        // ...
        console.log(emailVerified);
        // this.localLogin(userName, userEmail)
      } else {

      }
    });
  }
  //이메일로 로그인
  signInWithEmail(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
      this.changeUserStatus();
    });
  }

  //이메일로 회원가입
  signUpWithEmail(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  //이메일 인증 함수 - 이메일 전송해줌.
  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert('서울대학교 이메일을 확인해주세요!');
    });
  }

  //로그아웃 함수
  signOut(){
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
    });
  }



  postBoard(College,text) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    //15개 단과대
    var postData = {
      "Key": newPostKey,
      "College":College,
      "writerName":localStorage.getItem('userName'),
      "writerEmail":localStorage.getItem('userEmail'),
      "text": text,
      "date": Date.now()
    };
    var updates = {};
    updates['/board/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
  }

  loadBoardList() {
    var rows = [];
    return  firebase.database().ref('board').once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          childData.date = dateFormat(childData.date,"yyyy-mm-dd");
          rows.push(childData);
      })
      return (rows);
  })
  }
}