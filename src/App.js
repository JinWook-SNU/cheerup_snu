import React, { useState, useEffect } from 'react';
import './App.css';
import Api from './Api/Api'

function App() {
  const [boardList, setBoardList] = useState([]);

  const api = new Api();

  const postBoard = () => {
    api.postBoard()
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
          <button onClick={postBoard}> postBoard </button>
          <div>
            { (boardList) ? boardList.map((board) => <div> {board.text} </div>) : <div>게시글없음.</div>}
          </div>
          <button onClick={loadBoardList}> loadBoardList! </button>
          <button onClick={api.signInWithGoogle}> Sign in with Google </button>
          <button onClick={api.signInWithEmail}> Sign in with Email </button>
          <button onClick={api.signUpWithEmail}> Sign up with Email </button>
          <button onClick={api.changeUserStatus}> User Status </button>
          <button onClick={api.sendEmailVerification}> Send-Email </button>
        </div>
      </header>
    </div>
  );
}

export default App;
