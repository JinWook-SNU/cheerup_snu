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

  //--------------------------------------이메일로 회원가입하기
  //1. firebase에 회원정보 등록
  async signUpWithEmail(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
      // alert(email+' '+ password + ' ' + '111')
      // this.signInWithEmail(email,password)
      return true;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
      alert(errorMessage)
      return false;
    });
  }

  //2. 이메일로 로그인 (이후 회원정보 변경 가능)
  async signInWithEmail(email, password){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(){
      this.getUserStatus();
      return true
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorCode, errorMessage);
      alert('아이디 혹은 비밀번호가 틀렸습니다.')
      return(errorCode)
    })
  }

  //3. 인증메일 전송 (현재 로그인된 계정 verification을 true로 변경)
  sendEmailVerification() {
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      alert('서울대학교 이메일을 확인해주세요!');
    });
  }

  //3. 유저 이름 변경 (글쓰기에 뜨는 이름 설정)
  changeUserName(userName) {
    var user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: userName,
    }).then(function() {
      alert(userName)
    }).catch(function(error) {
      console.log(error)
    });
  }

  //5. 로그인 - 유저 정보 가져오기 + 로컬에 정보 저장/ 이 단계 이후로 글쓰기 가능!
  async getUserStatus() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var userName = user.displayName;
        var userEmail = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;
        console.log(emailVerified);
        console.log(userName);
        console.log(userEmail);
        if(userName&&userEmail) {
          localStorage.setItem('userName', userName);
          localStorage.setItem('userEmail', userEmail);
        }
        return userName;
      } else {
        return null;
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

  //메인 - 게시물 받아오기
  async loadBoardList() {
    var rows = [];
    return  firebase.database().ref('board').once('value')
    .then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
          var childData = childSnapshot.val();
          childData.date = dateFormat(childData.date,"yyyy-mm-dd");
          rows.unshift(childData);
      })
      return (rows);
  })
  }
}
