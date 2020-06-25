import React, { useState, useEffect } from 'react';
import '../App.css';
import Api from '../Api/Api';
import {Board} from '../Board';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import heart from './empty_heart.png';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';




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
  const [currentCollege, setCurrentCollege] = useState('단과대를 선택해주세요');
  const [numOfChat,setNumOfChat] = useState(0)

  const Fill = ({percentage}) => {
    let height = (378*percentage)/100+'px';
    return (
      <div id = "fill" style = {{position : "absolute", backgroundColor : "#FF0000", bottom: "295px", left : "850px", width : "425px", height : height}}>

      </div>
    )

  };

  // 응원글 reload
  const loadBoardList = async() => {
    setUserEmail(localStorage.getItem('userEmail'));
    await api.loadBoardList().then((res) => {
      setBoardList(res)
    });
  };


  const loadChatNum = async(college) => {
    await api.getTopThree().then((res)=>{
      setNumOfChat(res[college]);
      console.log(college);
    })
  }

  const changeCurrentCollege = (college) => {
    console.log(college);
    setCurrentCollege(college)
    console.log(currentCollege);
    loadChatNum(college);
  }

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
    loadChatNum();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
      loadBoardList();
      setIsLogin(localStorage.getItem('verified'));
      setUserName(localStorage.getItem('userName'));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // const countcolleges = () => {
      // 글 작성
  const postBoard = (college, text) => {
    api.postBoard(college, text);
  }
  return (
    <body>
    <div className="App">
        <div style={{ backgroundColor: '#B2C6D9', width: '800px', height: '1000px', border: '1px solid black', overflow: "scroll", overflowX: "hidden"}}>
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
              <TextField
                label="응원글"
                variant="outlined"
                multiline
                rows={1}
                color="primary"
                placeholder="응원글을 적어주세요!"
                value={chatMessage}
                onChange={e => setChatMessage(e.target.value)}
                style={{width: "300px", marginRight: "10px"}}
              />
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
              <Button disabled={!chatCollege | chatMessage.indexOf("응원") === -1 | !isLogin | !userName} style={{marginRight: "10px"}} onClick={()=>{postBoard(chatCollege,chatMessage)}} variant="contained" color="primary" disableElevation>
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
        <div>
        {<Fill percentage = {numOfChat}/>}
        </div>
        <div>
          
        </div>
        <div id = "heart" style = {{position : "absolute", bottom : '290px', left : "850px"}}>
        {currentCollege}
          <img src = {heart} alt = "empty-heart"/>
          <div>
            <h2 id = "percentnumber" style = {{position : "absolute",width : "425px", textAlign : "center"}}>{numOfChat}%</h2>
          </div>
        </div>
        <div id = "select" style = {{position : "absolute", width : "425px", bottom : "170px", left : "850px"}}>
            <button id = "cba" onClick = {()=>{changeCurrentCollege('경영대');}}>경영대</button>
            <button id = "hum" onClick = {()=>{changeCurrentCollege('인문대')}}>인문대</button>
            <button id = "soc" onClick = {()=>{changeCurrentCollege('사회대')}}>사회대</button>
            <button id = "sci" onClick = {()=>{changeCurrentCollege('자연대')}}>자연대</button>
            <button id = "eng" onClick = {()=>{changeCurrentCollege('공과대')}}>공과대</button>
            <button id = "cals" onClick = {()=>{changeCurrentCollege('농생대')}}>농생대</button>
            <button id = "che" onClick = {()=>{changeCurrentCollege('생활대')}}>생활대</button>
            <button id = "mus" onClick = {()=>{changeCurrentCollege('음미대')}}>음미대</button>
            <button id = "vet" onClick = {()=>{changeCurrentCollege('수의대')}}>수의대</button>
            <button id = "pha" onClick = {()=>{changeCurrentCollege('약학대')}}>약학대</button>
            <button id = "med" onClick = {()=>{changeCurrentCollege('의대')}}>의대</button>
            <button id = "edu" onClick = {()=>{changeCurrentCollege('사범대')}}>사범대</button>
          </div>
    </div>
    </body>
  );
}

export default BoardPage;
