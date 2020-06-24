import React from 'react';
import './App.css';
import Api from './Api/Api'

export const Board =({userEmail, board}) => {
    const api = new Api();
    
return (
    <div id="box" style={{display: "flex"}}>
        <div id="user-box">
            <h5 style={{margin:"0"}}>{board.writerName}  ({board.College})</h5>
        </div>
        <div id="content-box">
            <span>{board.text}</span>
            <div id="date-box"><span>{board.date}</span>{userEmail === board.writerEmail ? <div><button onClick={()=>{api.deletBoard(board.Key)}}>삭제</button></div> : null}</div>
        </div>
    </div>)
};