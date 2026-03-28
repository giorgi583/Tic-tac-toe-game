import React, { useState, useRef, useEffect, use} from 'react'
import {  X, XIcon, CircleIcon, PointerIcon, } from 'lucide-react';
const data = ["", "", "", "", "", "", "", "", ""];
const Ticatactoe = () => {
  const titleref = useRef(null);
  const [playerx, setPlayerx] = useState("");
  const [showpointer, setShowpointer] = useState(true);
  const [playerO, setPlayerO] = useState("");
  const [colorx, setColorx] = useState("#c2a110");
  const [coloro, setColoro] = useState("#00ffc8");
  const [scoreX, setScorex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [rounds, setRounds] = useState(undefined);
  const [showPopup, setShowPopup] = useState(true);
  const [scoreO, setScoreo] = useState(0);
    const [count, setCount] = React.useState(0);
const [lock, setLock] = React.useState(false);
    const render = (e,num) => {
      setShowpointer(false);
      if(lock) return;
      if(data[num] !== "") return;
      if(count % 2 === 0) {
        data[num] = "X";
        setCount(count + 1);
      }
      else {
        data[num] = "O";
        setCount(count + 1);
      }
      checkWin();
    }
    const resetscore = () => {
      setScoreo(0);
      setScorex(0);
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
        titleref.current.innerHTML = `Congratulations: ${playerx || 'X'} won!`;
        titleref.current.style.color = colorx;
        setScorex(prevscore => { const newscore = prevscore + 1; return newscore });
      }
      else if(winner === 'O') {
        titleref.current.innerHTML = `Congratulations: ${playerO || 'O'} won!`;
        titleref.current.style.color = coloro;
        setScoreo(prevscore => { const newscore = prevscore + 1; return newscore });
      }
      else {
        titleref.current.innerHTML = "Draw!";
        titleref.current.style.color = "#fff";
      }
      
    } 
    useEffect(() => {
      if(scoreO + scoreX > rounds-1) {
        if(scoreO > scoreX) {
          setWinner(playerO || "Player O");
        }
        else if(scoreX > scoreO) {
          setWinner(playerx || "Player X");
        }
        else {
          setWinner('draw');
        }
      }
      // if(scoreO + scoreX > rounds-2) {
      //   if(scoreO > scoreX) {
      //     document.querySelector(".os").classList.add("alert");
      //   }
      //   else if(scoreX > scoreO) {
      //     document.querySelector(".xs").classList.add("alert");
      //   }
    }, [scoreO, scoreX])
    const reset = () => {
      setCount(0);
      setLock(false);
      for(let i = 0; i < data.length; i++) {
        data[i] = "";
      }
      titleref.current.innerHTML = "Tic Tac Toe Game in <span>React</span>";
      titleref.current.style.color = "white";
    }
    const startthegame = (e) => {
      e.preventDefault();
      if(playerO.trim() === "" || playerx.trim() === "") {
        alert("Please enter names for both players.");
        return;
      }
      if(playerO.trim() === playerx.trim()) {
        alert("Player names must be different.");
        return;
      }
      if(rounds <= 0) {
        alert("Please enter a valid number of rounds.");
        return;
      }
      if(rounds > 100) {
        alert("Please enter a number of rounds less than or equal to 100.");
        return;
      }
      setShowPopup(false);
      reset();
    } 
  return (
    <div className='tictac'>
     { showPopup && (
      <div className='overlay'>
<div className='popup'>
  <X className='close' onClick={()=> setShowPopup(false)}/>
  <form onSubmit={startthegame}>
    <label htmlFor='playerx' style={{color: colorx}}>Player {<XIcon />}</label>
    <input maxLength={10} autoComplete='off' id='playerx' type="text" placeholder='Enter your name' value={playerx} onChange={e=> setPlayerx(e.target.value)}/>
    <label htmlFor="colorx">choose Color</label>
    <input autoComplete='off' id='colorx' type="color" value={colorx} onChange={e=> setColorx(e.target.value)}/>
    <hr />
    <label htmlFor='playero' style={{color: coloro}}>Player {<CircleIcon />}</label>
    <input maxLength={10} autoComplete='off' id='playero' type="text" placeholder='Enter your name' value={playerO} onChange={e=> setPlayerO(e.target.value)}/>
    <label htmlFor="coloro">choose Color</label>
    <input autoComplete='off' id='coloro' type="color" value={coloro} onChange={e=> setColoro(e.target.value)}/>
    <hr />
    <label htmlFor='rounds'>Number of Rounds</label>
    <input autoComplete='off' id='rounds' type="number" max={100} placeholder='Enter number of rounds' value={rounds} onChange={e=> setRounds(e.target.value)} />
    <button type='submit'>Start Game</button>
  </form>

</div>
      </div>) }
      <div className="scoreboard">
        <h3>Scoreboard</h3>
        <p className={`xs ${scoreX + scoreO > rounds-2 && scoreX>scoreO ? "alert" : ""}`} style={{color: colorx}}>{playerx || <XIcon size={40}/>} : {scoreX}</p>
        <p className={`os ${scoreX + scoreO > rounds-2 && scoreO>scoreX ? "alert" : ""}`} style={{color: coloro}}>{playerO || <CircleIcon size={40} />} : {scoreO}</p>
        {rounds && <p>Best of {rounds}</p>}
        <button onClick={resetscore}>Reset</button>
      </div>
        <h1 ref={titleref}>Tic Tac Toe Game in <span>React</span></h1>
        <div className="board">
<div className='square' onClick={(e)=> render(e,0)}>{data[0] === "X" && <XIcon size={90} color={colorx} />}{data[0] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,1)}>{data[1] === "X" && <XIcon size={90} color={colorx} />}{data[1] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,2)}>{data[2] === "X" && <XIcon size={90} color={colorx} />}{data[2] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,3)}>{data[3] === "X" && <XIcon size={90} color={colorx} />}{data[3] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,4)}>{data[4] === "X" && <XIcon size={90} color={colorx} />}{data[4] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,5)}>{data[5] === "X" && <XIcon size={90} color={colorx} />}{data[5] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,6)}>{data[6] === "X" && <XIcon size={90} color={colorx} />}{data[6] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,7)}>{data[7] === "X" && <XIcon size={90} color={colorx} />}{data[7] === "O" && <CircleIcon size={90} color={coloro} />}</div>
<div className='square' onClick={(e)=> render(e,8)}>{data[8] === "X" && <XIcon size={90} color={colorx} />}{data[8] === "O" && <CircleIcon size={90} color={coloro} />}</div>
 {showpointer && <PointerIcon size={50} className='pointer' color="#fff" /> }
        </div>
       <div className='btns'> <button onClick={reset}>Reset</button>
        <button onClick={()=> window.location.reload(true)}>New Game</button> </div>
       {winner && ( <div className='overlay'>
        <div className='popup'>
          <X className='close' onClick={()=> {setWinner(null); resetscore(); reset();}}/>
          <h1>Game Over!</h1>
          <h2 style={{color: winner !== 'draw' ? winner === playerx ? colorx : coloro : 'inherit'}}>
            {winner !== 'draw' ? `Winner: ${winner}` : "It's a Tie!"}
          </h2>
          <p>{playerx} scored: {scoreX} </p> <p> {playerO} scored: {scoreO}</p>
          <button onClick={()=> {setWinner(null); resetscore(); reset();}}>Play Again</button>
        </div> </div>)}
    </div>
  )

}
export default Ticatactoe