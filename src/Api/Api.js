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
  
  //1. 회원가입 - 이메일로 회원가입
  signUpWithEmail(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  //2. 임시로그인 - 이메일로 로그인
  signInWithEmail(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
    });
  }

  //3. 회원가입 - 이메일 인증 함수(이메일 전송해줌.)
  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert('서울대학교 이메일을 확인해주세요!');
    });
  }

  //4. 회원가입 - 이름 입력
  changeUserName(userName) {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: userName,
    }).then(function() {
    }).catch(function(error) {
      console.log(error)
    });
  }

  //5. 로그인 - 유저 정보 가져오기 + 로컬에 정보 저장/ 이 단계 이후로 글쓰기 가능!
  getUserStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var userName = user.displayName;
        var userEmail = user.email;
        var emailVerified = user.emailVerified;
        console.log(emailVerified);
        console.log(userName);
        console.log(userEmail);
        if(userName&&userEmail) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
        }
      } else {
      }
    });
  }

  //로그아웃 함수
  signOut(){
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
    });
    localStorage.clear();
  }

  //메인 - 게시물 작성하기
  postBoard(college,text) {
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = {
      "Key": newPostKey,
      "College":college,
      "writerName":localStorage.getItem('userName'),
      "writerEmail":localStorage.getItem('userEmail'),
      "text": text,
      "date": Date.now()
    };
    var updates = {};
    updates['/board/' + newPostKey] = postData;
    firebase.database().ref().update(updates);
  }

  //메인 - 게시물 받아오기
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
