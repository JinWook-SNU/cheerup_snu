import React, { useState, useEffect } from 'react';
import '../App.css';
import Api from '../Api/Api';
// import {Board} from '../Board';
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
  let [cbachats, setcbachats] = useState(0);
  let [humchats, sethumchats] = useState(0);
  let [socchats, setsocchats] = useState(0);
  let [scichats, setscichats] = useState(0);
  let [engchats, setengchats] = useState(0);
  let [calschats, setcalschats] = useState(0);
  let [chechats, setchechats] = useState(0);
  let [muschats, setmuschats] = useState(0);
  let [vetchats, setvetchats] = useState(0);
  let [phachats, setphachats] = useState(0);
  let [medchats, setmedchats] = useState(0);
  let [educhats, seteduchats] = useState(0);
  let [printedchats, setprintedchats] = useState(0);
  let [currentcollege, setcurrentcollege] = useState('경영대');

  const Fill = ({percentage}) => {
    let height = (378*percentage)/100+'px';
    return (
      <div id = "fill" style = {{position : "absolute", backgroundColor : "#FF0000", bottom: "295px", left : "850px", width : "425px", height : height}}>

      </div>
    )

  };

  const Board =({userEmail, board}) => {
    const api = new Api();
    const deleteBoard = () => {
        api.deletBoard(board.Key);
        if(board.College === "경영대")
        {
          setcbachats(cbachats => cbachats-1);
          if(currentcollege === "경영대")
          {
            settocba();
          }
        }
        if(board.College === "인문대")
        {
          sethumchats(humchats => humchats-1);
          if(currentcollege === "인문대")
          {
            settohum();
          }
        }
        if(board.College === "사회대")
        {
          setsocchats(socchats => socchats-1);
          if(currentcollege === "사회대")
          {
            settosoc();
          }
        }
        if(board.College === "자연대")
        {
          setscichats(scichats => scichats-1);
          if(currentcollege === "자연대")
          {
            settosci();
          }
        }
        if(board.College === "공과대")
        {
          setengchats(engchats => engchats-1);
          if(currentcollege === "공과대")
          {
            settoeng();
          }
        }
        if(board.College === "농생대")
        {
          setcalschats(calschats => calschats-1);
          if(currentcollege === "농생대")
          {
            settocals();
          }
        }
        if(board.College === "생활대")
        {
          setchechats(chechats => chechats-1);
          if(currentcollege === "생활대")
          {
            settoche();
          }
        }
        if(board.College === "음미대")
        {
          setmuschats(muschats => muschats-1);
          if(currentcollege === "음미대")
          {
            settomus();
          }
        }
        if(board.College === "수의대")
        {
          setvetchats(vetchats => vetchats-1);
          if(currentcollege === "수의대")
          {
            settovet();
          }
        }
        if(board.College === "약학대")
        {
          setmedchats(medchats => medchats-1);
          if(currentcollege === "약학대")
          {
            settomed();
          }
        }
        if(board.College === "의대")
        {
          setmedchats(medchats => medchats-1);
          if(currentcollege === "의대")
          {
            settomed();
          }
        }
        if(board.College === "사범대")
        {
          seteduchats(educhats => educhats-1);
          if(currentcollege === "사범대")
          {
            settoedu();
          }
        }
    }
  
  return (
    <div id="box" style={{display: "flex"}}>
        <div id="user-box">
            <h5 style={{margin:"0"}}>{board.writerName}  ({board.College})</h5>
        </div>
        <div id="content-box">
            <span>{board.text}</span>
            <div id="date-box">
                {userEmail === board.writerEmail ? <div><button style={{border: "none", marginBottom: "1px"}} onClick={()=>{deleteBoard()}}>삭제</button></div> : null}
                <span style={{marginRight:"2px", marginBottom: "2px"}}>{board.date}</span>
            </div>
        </div>
    </div>)
  };

  // 응원글 reload
  const loadBoardList = async() => {
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
     
      setIsLogin(localStorage.getItem('verified'))
      setUserName(localStorage.getItem('userName'))
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // const countcolleges = () => {
      // 글 작성
  const postBoard = (college, text) => {
    api.postBoard(college, text);
    loadBoardList();
    setcbachats(0);
    sethumchats(0);
    setsocchats(0);
    setscichats(0);
    setengchats(0);
    setcalschats(0);
    setmuschats(0);
    setchechats(0);
    setvetchats(0);
    setphachats(0);
    setmedchats(0);
    seteduchats(0);
    for(let i = 0;i<boardList.length;i++)
    {
      if(boardList[i].College==='경영대')
      {
        setcbachats(cbachats => cbachats+1);
      }
      else if(boardList[i].College==='인문대')
      {
        sethumchats(humchats => humchats +1);
      }
      else if(boardList[i].College==='사회대')
      {
        setsocchats(socchats => socchats + 1);
      }
      else if(boardList[i].College==='자연대')
      {
        setscichats(scichats => scichats + 1);
      }
      else if(boardList[i].College==='공과대')
      {
        setengchats(engchats => engchats + 1);
      }
      else if(boardList[i].College==='농생대')
      {
        setcalschats(calschats => calschats + 1);
      }
      else if(boardList[i].College==='생활대')
      {
        setchechats(chechats => chechats + 1);
      }
      else if(boardList[i].College==='음미대')
      {
        setmuschats(muschats => muschats + 1);
      }
      else if(boardList[i].College==='수의대')
      {
        setvetchats(vetchats => vetchats + 1);
      }
      else if(boardList[i].College==='약학대')
      {
        setphachats(phachats => phachats + 1);
      }
      else if(boardList[i].College==='의대')
      {
        setmedchats(medchats => medchats + 1);
      }
      else if(boardList[i].College==='사범대')
      {
        seteduchats(educhtas => educhats + 1);
      }
    }
    if(currentcollege === '경영대')
    {
      settocba();
    }
    if(currentcollege === '인문대')
    {
      settohum();
    }
    if(currentcollege === '사회대')
    {
      settosoc();
    }
    if(currentcollege === '자연대')
    {
      settosci();
    }
    if(currentcollege === '공과대')
    {
      settoeng();
    }
    if(currentcollege === '농생대')
    {
      settocals();
    }
    if(currentcollege === '생활대')
    {
      settoche();
    }
    if(currentcollege === '음미대')
    {
      settomus();
    }
    if(currentcollege === '수의대')
    {
      settovet();
    }
    if(currentcollege === '약학대')
    {
      settopha();
    }
    if(currentcollege === '의대')
    {
      settomed();
    }
    if(currentcollege === '사범대')
    {
      settoedu();
    }
    
    setChatMessage('');
  }
  const settocba=() => {
    setprintedchats(cbachats);
    setcurrentcollege('경영대');
  }
  const settohum=() => {
    setprintedchats(humchats);
    setcurrentcollege('인문대');
  }
  const settosoc=() => {
    setprintedchats(socchats);
    setcurrentcollege('사회대');
  }
  const settosci=() => {
    setprintedchats(scichats);
    setcurrentcollege('자연대');
  }
  const settoeng=() => {
    setprintedchats(engchats);
    setcurrentcollege('공과대');
  }
  const settocals=() => {
    setprintedchats(calschats);
    setcurrentcollege('농생대');
  }
  const settoche=() => {
    setprintedchats(chechats);
    setcurrentcollege('생활대');
  }
  const settomus=() => {
    setprintedchats(muschats);
    setcurrentcollege('음미대');
  }
  const settovet=() => {
    setprintedchats(vetchats);
    setcurrentcollege('수의대');
  }
  const settopha=() => {
    setprintedchats(phachats);
    setcurrentcollege('약학대');
  }
  const settomed=() => {
    setprintedchats(medchats);
    setcurrentcollege('의대');
  }
  const settoedu=() => {
    setprintedchats(educhats);
    setcurrentcollege('사범대');
  }

  return (
    <body>
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
        {<Fill percentage = {printedchats}/>}
        </div>

        <div id = "heart" style = {{position : "absolute", bottom : '290px', left : "850px"}}>

          <img src = {heart} alt = "empty-heart"/>
          <div>
            <h2 id = "percentnumber" style = {{position : "absolute",width : "425px", textAlign : "center"}}>{printedchats+1}%</h2>
          </div>
        </div>
        <div id = "select" style = {{position : "absolute", width : "425px", bottom : "170px", left : "850px"}}>
            <button id = "cba" onClick = {settocba}>경영대</button>
            <button id = "hum" onClick = {settohum}>인문대</button>
            <button id = "soc" onClick = {settosoc}>사회대</button>
            <button id = "sci" onClick = {settosci}>자연대</button>
            <button id = "eng" onClick = {settoeng}>공과대</button>
            <button id = "cals" onClick = {settocals}>농생대</button>
            <button id = "che" onClick = {settoche}>생활대</button>
            <button id = "mus" onClick = {settomus}>음미대</button>
            <button id = "vet" onClick = {settovet}>수의대</button>
            <button id = "pha" onClick = {settopha}>약학대</button>
            <button id = "med" onClick = {settomed}>의대</button>
            <button id = "edu" onClick = {settoedu}>사범대</button>
          </div>
    </div>
    </body>
  );
}

export default BoardPage;
