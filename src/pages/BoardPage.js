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
import heart from './empty_heart.png';

const BoardPage = ({history}) => {
  const [boardList, setBoardList] = useState([]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatCollege, setChatCollege] = useState('');
  const [userName, setUserName] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const api = new Api();
  const [userEmail, setUserEmail] = useState('');
  const [userStayTime, setUserStayTime] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // 응원글 reload
  const loadBoardList = async() => {
    // api.loadBoardList()
    // let count = 0;
    // if(!count) {
    //   setInterval(()=> {
    //     count++;
    //     console.log(count);
        
    //   }, 2000);
    //   setUserStayTime(count);
    //   console.log(userStayTime)
    // }
    
    setUserEmail(localStorage.getItem('userEmail'));
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

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      loadBoardList();
    }, 1000);
    return () => clearInterval(interval);
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
          {!isLogin ? <div style={{marginTop: '15px'}}>
            <Link className="linkButton" to="/register">
            register
          </Link>
          <Link className="linkButton" to="/login">
            로그인
          </Link>
          </div> :
          <div>
            <div>{userName}님</div>
            <Button style={{marginRight: "110px"}} onClick={()=>{signOut()}} variant="contained" color="primary" disableElevation>
              로그아웃
            </Button>
          </div>}
          <div style={{marginTop : '15px', marginBottom: '10px'}}>
            <div>
              <textarea id="message-box" type="text" placeholder="응원글을 적고, 단과대를 선택해주세요!" value={chatMessage} onChange={e => setChatMessage(e.target.value)}>{chatMessage}</textarea>
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
              <Button disabled={!chatCollege | chatMessage.indexOf("응원") === -1} style={{marginRight: "10px"}} onClick={()=>{postBoard(chatCollege,chatMessage)}} variant="contained" color="primary" disableElevation>
                응원하기
              </Button>
            </div>
          </div>
          <div style={{marginBottom: "5px",borderTop : "2px solid black", borderBottom : "1px solid black", backgroundColor:"#94B1CE"}}>
            <p style={{textAlign:"left"}}>※ 글에 반드시 <strong>응원</strong>이라는 단어가 들어가야 글을 작성할 수 있습니다.<br></br></p>
            <p style={{textAlign:"left"}}>※ <strong>단과대</strong>를 고르면 응원하기 버튼이 활성화 됩니다.</p>
          </div>
          <div>
            { (boardList) ? boardList.map((board) => <Board userEmail={userEmail} board={board} key={board.Key}/>) : <div>게시글없음.</div>}
          </div>
        </div>
        <div id = "heart" style = {{position : "absolute", bottom : '213px', left : "850px"}}>
          <img src = {heart} alt = "empty-heart"/>
          <div>
            <h2 id = "percentnumber" style = {{position : "absolute",width : "425px", textAlign : "center"}}>//percent//%</h2>
          </div>
        </div>
    </div>
  );
}

export default BoardPage;
