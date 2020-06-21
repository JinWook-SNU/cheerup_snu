import React, { useState, useEffect } from 'react';
import './App.css';
import Api from './Api/Api';
import {Board} from './Board';

function App() {
  const [boardList, setBoardList] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatCollege, setChatCollege] = useState('');

  const [userName, setUserName] = useState('');
  const api = new Api();

  // 시간 나타내기!
  function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }


  // 응원글 reload
  const loadBoardList = async() => {
    // api.loadBoardList()

    await api.loadBoardList().then((res) => {
      // for (let i=0; i<res.length; i++){
      //   const timestamp = res[i].date;
      //   res[i].date = timeConverter(timestamp);
      // };
      setBoardList(res)
    });
  };
  
  useEffect(() => {
    loadBoardList();
  }, []);

  // 글 작성
  const postBoard = (college, text) => {
    api.postBoard(college, text);
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ backgroundColor: '#B2C6D9', width: '800px', height: '700px', border: '1px solid black', overflow: "scroll", overflowX: "hidden"}}>
          <div style={{marginTop : '15px', marginBottom: '10px'}}>
            <form>
              <textarea id="message-box" type="text" placeholder="응원글을 적어주세요!" value={chatMessage} onChange={e => setChatMessage(e.target.value)}>{chatMessage}</textarea>
              <select value={chatCollege} size={1}>
                <option value="경영대">경영대</option>
                <option value="인문대">인문대</option>
                <option value="사회대">사회대</option>
                <option value="자연대">자연대</option>
                <option value="공과대">공과대</option>
                <option value="농생대">농생대</option>
                <option value="생활대">생활대</option>
                <option value="음미대">음미대</option>
                <option value="수의대">수의대</option>
                <option value="약학대">약학대</option>
                <option value="의대">의대</option>
                <option value="사범대">사범대</option>
              </select>
              <button type="submit" id="submit-button"> 응원하기 </button>
              <button onClick={postBoard('경영대','힘내세요!!')}>postBoard</button>
            </form>
          </div>
        </div>
        <div>
          <div>
            { (boardList) ? boardList.map((board) => <Board board={board} key={board.Key}/>) : <div>게시글없음.</div>}
          </div>
        </div>
        <div>
          <button onClick={loadBoardList}> loadBoardList! </button>
          <button onClick={()=>{api.signInWithEmail('wlsdnr330@snu.ac.kr','password')}}> Sign in with Email </button>
          <button onClick={()=>{api.signUpWithEmail('wlsdnr330@snu.ac.kr','password')}}> Sign up with Email </button>
          <button onClick={()=>{api.getUserStatus()}}> User Status </button>
          <button onClick={()=>{api.sendEmailVerification()}}> Send-Email </button>
          <form>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="submit" value="이름결정" onClick={()=>{api.changeUserName(userName)}} />
          </form>
          <form>
            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="submit" value="이름결정" onClick={()=>{api.changeUserName(userName)}} />
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
