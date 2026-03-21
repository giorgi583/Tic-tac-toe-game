import React, { useState, useRef, useEffect} from 'react'
import x from '../Assets/cross.png'
import o from '../Assets/circle.png'
const data = ["", "", "", "", "", "", "", "", ""];
const Ticatactoe = () => {
  const titleref = useRef(null);
  const [scoreX, setScorex] = useState(0);
  const [scoreO, setScoreo] = useState(0);
    const [count, setCount] = React.useState(0);
const [lock, setLock] = React.useState(false);
    const render = (e,num) => {
      if(lock) return;
      if(data[num] !== "") return;
      if(count % 2 === 0) {
        e.target.style.backgroundImage = `url(${x})`;
        data[num] = "X";
        setCount(count + 1);
      }
      else {
        e.target.style.backgroundImage = `url(${o})`;
        data[num] = "O";
        setCount(count + 1);
      }
      checkWin();
    }
    const checkWin = () => {
      if(data[0] === data[1] && data[0] === data[2] && data[0] !== "") {
        win(data[0]);
      }
      else if(data[3] === data[4] && data[3] === data[5] && data[3] !== "") {
        win(data[3]);
      }
      else if(data[6] === data[7] && data[6] === data[8] && data[6] !== "") {
        win(data[6]);
      }
      else if(data[0] === data[3] && data[0] === data[6] && data[0] !== "") {
        win(data[0]);
      }
      else if(data[1] === data[4] && data[1] === data[7] && data[1] !== "") {
        win(data[1]);
      }
      else if(data[2] === data[5] && data[2] === data[8] && data[2] !== "") {
        win(data[2]);
      }
      else if(data[0] === data[4] && data[0] === data[8] && data[0] !== "") {
        win(data[0]);
      }
      else if(data[2] === data[4] && data[2] === data[6] && data[2] !== "") {
        win(data[2]);
      }
      else if(count === 8) {
        win("draw");
      }
    }
    const win = (winner) => {
      setLock(true);
      if(winner === 'X') {
        titleref.current.innerHTML = `Congratulations: <img src=${x} /> won!`;
        setScorex(scoreX + 1);
      }
      else if(winner === 'O') {
        titleref.current.innerHTML = `Congratulations: <img src=${o} /> won!`;
        setScoreo(scoreO + 1);
      }
      else {
        titleref.current.innerHTML = "Draw!";
      }
    }
    const reset = () => {
      setCount(0);
      setLock(false);
      for(let i = 0; i < data.length; i++) {
        data[i] = "";
      }
      document.querySelectorAll(".square").forEach((el) => {
        el.style.backgroundImage = "";
      })
      titleref.current.innerHTML = "Tic Tac Toe Game in <span>React</span>";
    }
  return (
    <div className='tictac'>
      <div className="scoreboard">
        <h3>Scoreboard</h3>
        <p className='xs'><img src={x} /> : {scoreX}</p>
        <p className='os'><img src={o} /> : {scoreO}</p>
        <button onClick={()=> {setScoreo(0); setScorex(0)}}>Reset</button>
      </div>
        <h1 ref={titleref}>Tic Tac Toe Game in <span>React</span></h1>
        <div className="board">
<div className='square' onClick={(e)=> render(e,0)}></div>
<div className='square' onClick={(e)=> render(e,1)}></div>
<div className='square' onClick={(e)=> render(e,2)}></div>
<div className='square' onClick={(e)=> render(e,3)}></div>
<div className='square' onClick={(e)=> render(e,4)}></div>
<div className='square' onClick={(e)=> render(e,5)}></div>
<div className='square' onClick={(e)=> render(e,6)}></div>
<div className='square' onClick={(e)=> render(e,7)}></div>
<div className='square' onClick={(e)=> render(e,8)}></div>
        </div>
        <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Ticatactoe