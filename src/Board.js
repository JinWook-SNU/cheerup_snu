import React from 'react';
import './App.css';

export const Board =({board}) => {
return (
    <div id="box" style={{display: "flex"}}>
        <div id="user-box">
            <h5 style={{margin:"0"}}>{board.writerName} ({board.College})</h5>
        </div>
        <div id="content-box">
            <span>{board.text}</span>
            <div id="date-box"><span>{board.date}</span></div>
        </div>
    </div>)
};