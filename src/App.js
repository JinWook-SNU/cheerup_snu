import React, { useState, useEffect } from 'react';
import './App.css';
import Api from './Api/Api'

function App() {
  const [boardList, setBoardList] = useState([]);
  const [userName, setUserName] = useState('');
  const api = new Api();

  const postBoard = (college, text) => {
    api.postBoard(college, text)
  }

  const loadBoardList = () => {
    // api.loadBoardList()
    api.loadBoardList().then((res) => {
      setBoardList(res)
    })
  }

  useEffect(() => {
    loadBoardList();
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <button onClick={()=>{postBoard('농생대','힘내세요!!')}}> postBoard </button>
          <div>
            { (boardList) ? boardList.map((board) => <div> {board.text} </div>) : <div>게시글없음.</div>}
          </div>
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
