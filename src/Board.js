import React from 'react';
import './App.css';
import Api from './Api/Api'




// export const Board =({userEmail, board}) => {
//     const api = new Api();
//     const deleteBoard = () => {
//         api.deletBoard(board.Key);
//     }

// return (
//     <div id="box" style={{display: "flex"}}>
//         <div id="user-box">
//             <h5 style={{margin:"0"}}>{board.writerName}  ({board.College})</h5>
//         </div>
//         <div id="content-box">
//             <span>{board.text}</span>
//             <div id="date-box">
//                 {userEmail === board.writerEmail ? <div><button style={{border: "none", marginBottom: "1px"}} onClick={()=>{deleteBoard}}>삭제</button></div> : null}
//                 <span style={{marginRight:"2px", marginBottom: "2px"}}>{board.date}</span>
//             </div>
//         </div>
//     </div>)
// };
