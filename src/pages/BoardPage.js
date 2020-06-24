import React, { useState, useEffect } from 'react';
import '../App.css';
import Api from '../Api/Api';
import {Board} from '../Board';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Icon from '@material-ui/core/Icon';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BoardPage = ({history}) => {
  const [boardList, setBoardList] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatCollege, setChatCollege] = useState('');
  const [userName, setUserName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const api = new Api();

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

  const handleSelectCollege = (e) => {
    setChatCollege(e.target.value);
  };

  const signOut = () => {
    api.signOut();
    setIsLogin(false);
    setIsValid(false);
  }

  useEffect(() => {
    loadBoardList();
    setIsLogin(localStorage.getItem('verified'))
    setUserName(localStorage.getItem('userName'))
  }, []);

  // 글 작성
  const postBoard = (college, text) => {
    api.postBoard(college, text);
    loadBoardList();
    setChatMessage('');
  }

  return (
    <div className="App">
        <div style={{ backgroundColor: '#B2C6D9', width: '800px', height: '700px', border: '1px solid black', overflow: "scroll", overflowX: "hidden"}}>
          <div style={{marginTop : '15px', marginBottom: '10px'}}>
            <div>
              <textarea id="message-box" type="text" placeholder="응원글을 적어주세요!" value={chatMessage} onChange={e => setChatMessage(e.target.value)}>{chatMessage}</textarea>
              <FormControl>
                <InputLabel>단과대</InputLabel>
                <Select
                  value={chatCollege}
                  onChange={handleSelectCollege}
                  inputProps={{name: '단과대'}}
                  style={{width:100, marginRight: "10px"}}
                >
                  <MenuItem value={"경영대"}>경영대</MenuItem>
                  <MenuItem value={"인문대"}>인문대</MenuItem>
                  <MenuItem value={"사회대"}>사회대</MenuItem>
                  <MenuItem value={"자연대"}>자연대</MenuItem>
                  <MenuItem value={"공과대"}>공과대</MenuItem>
                  <MenuItem value={"농생대"}>농생대</MenuItem>
                  <MenuItem value={"생활대"}>생활대</MenuItem>
                  <MenuItem value={"음미대"}>음미대</MenuItem>
                  <MenuItem value={"수의대"}>수의대</MenuItem>
                  <MenuItem value={"약학대"}>약학대</MenuItem>
                  <MenuItem value={"의대"}>의대</MenuItem>
                  <MenuItem value={"사범대"}>사범대</MenuItem>
                </Select>
              </FormControl>
              <Button style={{marginRight: "110px"}} onClick={()=>{postBoard(chatCollege,chatMessage)}} variant="contained" color="primary" disableElevation>
                응원하기
              </Button>
              {!isLogin ? <div>
                <Link className="linkButton" to="/register">
								register
							</Link>
              <Link className="linkButton" to="/login">
								로그인
							</Link>
              </div>
              :
              <div>
                <div>{userName}님</div>
                <Button style={{marginRight: "110px"}} onClick={()=>{signOut()}} variant="contained" color="primary" disableElevation>
                  로그아웃
                </Button>
              </div>
              }
            </div>
          </div>
          <div>
            { (boardList) ? boardList.map((board) => <Board board={board} key={board.Key}/>) : <div>게시글없음.</div>}
          </div>
        </div>
    </div>
  );
}

export default BoardPage;