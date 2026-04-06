import React, { useState, useRef, useEffect} from 'react'
import {  X, XIcon, CircleIcon, PointerIcon, } from 'lucide-react';
import winSoundfile from '../sounds/win.mp3';
import loseSoundfile from '../sounds/lose.mp3'; 
import clickSoundfile from '../sounds/click.wav';
import drawSoundfile from '../sounds/draw.wav';
import startSoundfile from '../sounds/start.wav';
import alertSoundfile from '../sounds/alert.wav';

const Ticatactoe = () => {
  const clickSound = new Audio(clickSoundfile);
const winSound = new Audio(winSoundfile);
const loseSound = new Audio(loseSoundfile);
const drawSound = new Audio(drawSoundfile);
const startSound = new Audio(startSoundfile);
const alertSound = new Audio(alertSoundfile);
  const [data, setData] = useState(Array(9).fill(""));
  const [isscoreboardvisible, setscoreboardvisible] = useState(false);
  const titleref = useRef(null);
  const [alertscore, setalertscore] = useState(false);
  const [humanSymbol, setHumanSymbol] = useState("X");
  const [vsAI, setVsAI] = useState(false);
  const [AIDifficulty, setAIDifficulty] = useState("");
  const [styles, setStyles] = useState({});
  const [playerx, setPlayerx] = useState("");
  const [humanName, setHumanName] = useState("");
  const [humanColor, setHumanColor] = useState("#c2a110");
  const [AIColor, setAIColor] = useState("#00ffc8");
  const [showpointer, setShowpointer] = useState(true);
  const [playerO, setPlayerO] = useState("");
  const [colorx, setColorx] = useState("#c2a110");
  const [coloro, setColoro] = useState("#00ffc8");
  const [scoreX, setScorex] = useState(0);
  const [winner, setWinner] = useState(null);
  const [rounds, setRounds] = useState(undefined);
  const [show2v2popup, setshow2v2popup] = useState(false);
  const [showAIpopup, setshowAIpopup] = useState(false);
  const [initialPopup, setInitialPopup] = useState(true);
  const [scoreO, setScoreo] = useState(0);
    const [count, setCount] = React.useState(0);
const [lock, setLock] = React.useState(false);
// calculations
  const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
 const getBestMove = (board, humanSymbol) => {
  const aiSymbol = humanSymbol === "X" ? "O" : "X";
  let bestScore = -Infinity;
  let move;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = aiSymbol;
      let score = minimax(board, false, aiSymbol, humanSymbol);
      board[i] = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
};
const checkWinnerForAI = (board) => {
  for (let [a, b, c] of winPatterns) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  if (board.every(cell => cell !== "")) return "draw";
  return null;
};
const minimax = (board, isMaximizing, aiSymbol, humanSymbol) => {
  const result = checkWinnerForAI(board);

  if (result !== null) {
    if (result === aiSymbol) return 1;
    if (result === humanSymbol) return -1;
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = aiSymbol;
        let score = minimax(board, false, aiSymbol, humanSymbol);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = humanSymbol;
        let score = minimax(board, true, aiSymbol, humanSymbol);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};
    const render = (num) => {
      setShowpointer(false);
      if(lock) return;
      if(data[num] !== "") return;
      clickSound.play();
      const newBoard = [...data];
if(vsAI) {
  if(humanSymbol === 'X') { 
    newBoard[num] = humanSymbol;
    setData(newBoard);
        setCount(count + 1);
        const result = checkWinnerForAI(newBoard);
if (result !== null) return;
        if(!lock) {
      setTimeout(() => {
        if(lock) return;
   AIDifficulty === 'Impossible' && aiMove(newBoard);
   AIDifficulty === 'Easy' && easyAIMove(newBoard, humanSymbol === "X" ? "O" : "X");
   AIDifficulty === 'Medium' && normalAIMove(newBoard, humanSymbol === "X" ? "O" : "X", humanSymbol);

  }, 300); }
  }
      
        else {
          const result = checkWinnerForAI(newBoard);
if (result !== null) return;
          if(!lock) {
          setTimeout(() => {
            if(lock) return;
           AIDifficulty === 'Impossible' && aiMove(newBoard);
           AIDifficulty === 'Easy' && easyAIMove(newBoard, humanSymbol === "X" ? "O" : "X");
           AIDifficulty === 'Medium' && normalAIMove(newBoard, humanSymbol === "X" ? "O" : "X", humanSymbol);
    
          }, 300);
            newBoard[num] = humanSymbol;
            setData(newBoard);
            setCount(count + 1);
        }
      }  }
      else { 
        const symbol = count % 2 === 0 ? "X" : "O";
        newBoard[num] = symbol;
        setData(newBoard);
        setCount(count + 1);
      }
     }
    const resetscore = () => {
      setScoreo(0);
      setScorex(0);
    } 
    const aiMove = (currentBoard = data) => {
  if (lock) return;
const aiSymbol = humanSymbol === "X" ? "O" : "X";
  const bestMove = getBestMove([...currentBoard], humanSymbol);
  if (bestMove === undefined) return;

  const newBoard = [...currentBoard];
  newBoard[bestMove] = aiSymbol;
  setData(newBoard);
  setCount(prev => prev + 1);
 
};
const easyAIMove = (board, aiSymbol) => {
   if (checkWinnerForAI(board) !== null) return;
  if (lock) return;
  const emptyCells = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const move = emptyCells[randomIndex];

  board[move] = aiSymbol;
  setData([...board]);
  setCount(prev => prev + 1);
 
};
const normalAIMove = (board, aiSymbol, humanSymbol) => {
   if (checkWinnerForAI(board) !== null) return;
  if (lock) return;
  const useMinimax = Math.random() < 0.5; // 50% chance
  let move;
  if(useMinimax) {
    move = getBestMove([...board], humanSymbol); // optimal
  } else {
    const emptyCells = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
    move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  board[move] = aiSymbol;
  setData([...board]);
  setCount(prev => prev + 1);
  
};
const isTablet = window.matchMedia("(max-width: 1150px)").matches;
const isMobile = window.matchMedia("(max-width: 678px)").matches;
    const checkWin = (board = data) => {
    if(lock) return;
const winStyles = [
  {top: isTablet ? 47 : 72, left:30, rotate:0, width: isTablet ? 250 : 400},   // 0,1,2
  {top: isTablet ? 153 : 227, left:30, rotate:0, width: isTablet ? 250 : 400},  // 3,4,5
  {top:isTablet ? 256 : 382, left:30, rotate:0, width: isTablet ? 250 : 400},  // 6,7,8
  {top:isTablet ? 148 :223, left: isTablet ? -80 : -129, rotate:90, width:isTablet ? 250 : 400}, // 0,3,6
  {top:isTablet ? 148 : 223, left:26, rotate:90, width:isTablet ? 250 : 400},   // 1,4,7
  {top:isTablet ? 148 : 223, left: isTablet ? 131 : 180, rotate:90, width:isTablet ? 250 : 400},  // 2,5,8
  {top: isTablet ? 150 : 224, left: isTablet ? -24 : -50, rotate:45, width:isTablet ? 350 : 550},  // 0,4,8
  {top:isTablet ? 148 : 224, left:isTablet ? -15 : -40, rotate:-45, width:isTablet ? 350 : 550}  // 2,4,6
];
for(let i = 0; i < winPatterns.length; i++) {
  const [a, b, c] = winPatterns[i];
  if(board[a] && board[a] === board[b] && board[a] === board[c]) {
    win(board[a]);
    applystyles(winStyles[i].top, winStyles[i].left, winStyles[i].rotate, winStyles[i].width, board[a]);
    return;
  }
}
if (board.every(cell => cell !== "")) {
  win("draw");
  applystyles(0, 0, 0, 0, "draw");
}
    }
   const applystyles = (top, left, rotate, width, winner) => {
  setStyles({
    top: top + 'px',
    left: left + 'px',
    width: width + 'px',
    rotate: rotate, // keep rotation here
    backgroundColor: vsAI
      ? winner === humanSymbol
        ? humanColor
        : AIColor
      : winner === 'X'
      ? colorx
      : coloro,
    opacity: 0.7,
    transformOrigin:
      rotate === 0
        ? 'left center'
        : rotate === 90
        ? 'top center'
        : 'center',
    transformScale: 'scaleX(0)', // start hidden
  });

  requestAnimationFrame(() => {
   setTimeout(() => {
    setStyles(prev => ({
      ...prev,
      transformScale: 'scaleX(1)', // animate only scaleX
    }));
   }, 50); 
  });
};
    const win = (winner) => {
      setLock(true);
      if(winner === 'X') {
        titleref.current.innerHTML = `Congratulations: ${playerx || 'X'} won!`;
       vsAI ? titleref.current.style.color = humanSymbol === 'X' ? humanColor : AIColor : titleref.current.style.color = colorx;
        setScorex(prevscore =>  prevscore + 1 );
      }
      else if(winner === 'O') {
        titleref.current.innerHTML = `Congratulations: ${playerO || 'O'} won!`;
       vsAI ? titleref.current.style.color = humanSymbol === 'O' ? humanColor : AIColor : titleref.current.style.color = coloro;
        setScoreo(prevscore =>  prevscore + 1 );
      }
      else {
        titleref.current.innerHTML = "Draw!";
        titleref.current.style.color = "#fff";
      }
      
    } 
    useEffect(() => {
      const limitscore = rounds%2 === 0 ? (rounds / 2)+1 : Math.ceil(rounds / 2);
      
        if(scoreO > limitscore-1 && !vsAI) {
          setWinner(playerO || "Player O");
          winSound.play();
        }
        else if(scoreX > limitscore-1 && !vsAI) {
          setWinner(playerx || "Player X");
          winSound.play();
        }
        if(rounds % 2 === 0 && scoreO === limitscore-1 && scoreX === limitscore-1) {
          setWinner("draw");
       drawSound.play();
        }
        if(scoreO === limitscore-1 || scoreX === limitscore-1) {
setalertscore(true);
 if(scoreO + scoreX < rounds) alertSound.play();
        }
        if(vsAI) {
  if(humanSymbol === 'O') {
   if( scoreO > limitscore-1 ) 
    { setWinner(humanName); winSound.play(); }
   if( scoreX > limitscore-1 ) 
    {setWinner("AI");  loseSound.play(); }
  }
  else {
    if(scoreX > limitscore-1) {
      setWinner(humanName);
      winSound.play();
    }
    if(scoreO > limitscore-1) {
      setWinner("AI");
      loseSound.play();
    }
  }
        }
        return () => {  setalertscore(false);
        }
    }, [scoreO, scoreX, rounds])
    const reset = () => {
      setCount(0);
      setLock(false);
      setData(Array(9).fill(""));
      titleref.current.innerHTML = "Tic Tac Toe Game in <span>React</span>";
      titleref.current.style.color = "white";
    }
    useEffect(() => {
  if(vsAI && humanSymbol === 'O' && count === 0 && !lock) {
    aiMove(data);
  }
   if (count > 0) checkWin(data);
}, [data]);

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
      setshow2v2popup(false);
      reset();
      startSound.play();
    } 
    const startthegamevsAI = (e) => {
      e.preventDefault();
      if(humanName.trim() === "") {
        alert("Please enter your name.");
        return;
      }
      if(AIDifficulty === "") {
        alert("Please select a difficulty level for the AI.");
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
        setshowAIpopup(false);
        reset();
        startSound.play();
      }


  return (
    <div className='tictac'>
      {initialPopup && (
        <div className='overlay'>
          <div className='popup'>
            <h1>Welcome to Tic Tac Toe!</h1>
            <p>Choose a game mode:</p>
            <div className='btns'>
            <button onClick={() => {setshow2v2popup(true); setInitialPopup(false)}}>2 Player</button>
            <button onClick={()=> {setInitialPopup(false); setVsAI(true); setshowAIpopup(true)}}>1 Player(vs AI)</button>
            </div>
             </div>
            </div>)}
     { show2v2popup && (
      <div className='overlay'>
<div className='popup'>
  <X className='close' onClick={()=> setshow2v2popup(false)}/>
  <form onSubmit={startthegame}>
  <div className='playerinput'>
    <label htmlFor='playerx' style={{color: colorx}}>Player {<XIcon />}</label>
    <input maxLength={10} autoComplete='off' id='playerx' type="text" placeholder='Enter your name' value={playerx} onChange={e=> setPlayerx(e.target.value)}/>
    <label htmlFor="colorx">choose Color</label>
    <input autoComplete='off' id='colorx' type="color" value={colorx} onChange={e=> setColorx(e.target.value)}/>
    </div>
    <div className='playerinput'>
    <label htmlFor='playero' style={{color: coloro}}>Player {<CircleIcon />}</label>
    <input maxLength={10} autoComplete='off' id='playero' type="text" placeholder='Enter your name' value={playerO} onChange={e=> setPlayerO(e.target.value)}/>
    <label htmlFor="coloro">choose Color</label>
    <input autoComplete='off' id='coloro' type="color" value={coloro} onChange={e=> setColoro(e.target.value)}/>
    </div>
    <div className='playerinput'>
    <label htmlFor='rounds'>Number of Rounds</label>
    <input autoComplete='off' id='rounds' type="number" max={100} placeholder='Enter number of rounds' value={rounds} onBlur={e=> setRounds(Number(e.target.value))} />
    </div>
    <button type='submit'>Start Game</button>
  </form>

</div>
      </div>) }
      {showAIpopup && (
        <div className='overlay'>
          <div className='popup'>
            <form onSubmit={startthegamevsAI}>
            <div className='playerinput'>
            <label htmlFor='playerx' style={{color: humanColor}}>{humanName || 'You'}</label>
            <input maxLength={10} autoComplete='off' id='playerx' type="text" placeholder='Enter your name' value={humanName} onChange={e=> setHumanName(e.target.value)}/>
            <label htmlFor="colorx">choose Color</label>
            <input autoComplete='off' id='colorx' type="color" value={humanColor} onChange={e=> setHumanColor(e.target.value)}/>
            <label htmlFor="humansymbol">Select Symbol</label>
            <select name="" id="humansymbol" value={humanSymbol} onChange={e=> setHumanSymbol(e.target.value)}>
              <option value="X">X</option>
              <option value="O">O</option>
            </select>
            </div>
            <div className='playerinput'>
            <label htmlFor='playero' style={{color: AIColor}}>{'AI ' + (AIDifficulty ? `(${AIDifficulty})` : '')}</label>
            <select name="" defaultValue='' id="selectdifficulty" value={AIDifficulty} onChange={e=> setAIDifficulty(e.target.value)}>
              <option value='' disabled >choose difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Impossible">Impossible</option>
            </select>
            <label htmlFor="coloro">choose Color</label>
            <input autoComplete='off' id='coloro' type="color" value={AIColor} onChange={e=> setAIColor(e.target.value)}/>
            </div>
            <div className='playerinput'>
            <label htmlFor='rounds'>Number of Rounds</label>
            <input autoComplete='off' id='rounds' type="number" max={100} placeholder='Enter number of rounds' value={rounds} onChange={e=> setRounds(e.target.value)} />
            </div>
            <button type='submit'>Start Game</button>
          </form>
          </div>
          </div>
      )}
      <div className="scoreboard" style={{display: isMobile ? (isscoreboardvisible ? 'flex' : 'none') : 'flex'}}>
        <h3>Scoreboard</h3>
        {alertscore && <h4>Gamepoint!</h4>}
        {vsAI ? <p className={`xs ${alertscore && scoreX > scoreO && humanSymbol === 'X' || alertscore && scoreO > scoreX && humanSymbol === 'O' ? "alert" : ""}`} style={{color: humanColor}}>You {humanSymbol === 'X' ? <XIcon size={40} /> : <CircleIcon size={40} />} : {humanSymbol === 'X' ? scoreX : scoreO}</p> : <p className={`xs ${alertscore && scoreX > scoreO ? "alert" : ""}`} style={{color: colorx}}>{playerx || <XIcon size={40}/>} : {scoreX}</p> }
        {vsAI ? <p className={`os ${alertscore && scoreO > scoreX && humanSymbol === 'X' || alertscore && scoreX > scoreO && humanSymbol === 'O' ? "alert" : ""}`} style={{color: AIColor}}>AI({AIDifficulty}) {humanSymbol === 'X' ? <CircleIcon size={40} /> : <XIcon size={40} />} : {humanSymbol === 'X' ? scoreO : scoreX}</p> :  <p className={`os ${alertscore && scoreO > scoreX ? "alert" : ""}`} style={{color: coloro}}>{playerO || <CircleIcon size={40} />} : {scoreO}</p>}
        {rounds && <p>Best of {rounds}</p>}
        <button onClick={resetscore}>Reset</button>
      </div>  
     {isMobile && <div className='viewscore' onClick={()=> setscoreboardvisible(prev => !prev)}><p>View Scoreboard</p></div> }
        <h1 ref={titleref}>Tic Tac Toe Game in <span>React</span></h1>
        <div className="board">
        {lock &&  <div
  className="crossing-outer"
  style={{
    top: styles.top,
    left: styles.left,
    width: styles.width,
    transform: `rotate(${styles.rotate}deg)`,
    position: 'absolute',
  }}
>
  <div
    className="crossing-inner"
    style={{
      backgroundColor: styles.backgroundColor,
      opacity: styles.opacity,
      width: '100%',
      height: '6px', // line thickness
      transform: styles.transformScale, // only scaleX here
      transformOrigin: styles.transformOrigin,
      transition: 'transform 0.4s ease',
    }}
  />
</div> }
<div className='square' onClick={()=> render(0)}>{data[0] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[0] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(1)}>{data[1] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[1] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(2)}>{data[2] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[2] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(3)}>{data[3] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[3] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(4)}>{data[4] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[4] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(5)}>{data[5] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[5] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(6)}>{data[6] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[6] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(7)}>{data[7] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[7] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
<div className='square' onClick={()=> render(8)}>{data[8] === "X" && <XIcon className='mark animate' size={isTablet ? 70 : 90} color={vsAI ? humanSymbol === 'X' ? humanColor : AIColor : colorx} />}{data[8] === "O" && <CircleIcon className='mark' size={isTablet ? 65 : 85} color={vsAI ? humanSymbol === 'O' ? humanColor : AIColor : coloro} />}</div>
 {showpointer && <PointerIcon size={50} className='pointer' color="#fff" /> }
        </div>
       <div className='btns'> <button onClick={reset}>Reset</button>
        <button onClick={()=> window.location.reload(true)}>New Game</button> </div>
       {winner && ( <div className='overlay'>
        <div className='popup '>
          <X className='close' onClick={()=> {setWinner(null); resetscore(); reset();}}/>
          <h1>Game Over!</h1>
          {vsAI ? (<> <h2 style={{color: winner !== 'draw' ? winner === humanName ? humanColor : AIColor : 'inherit'}}>{winner !== 'draw' ? `Winner: ${winner}` : "It's a Tie!"}</h2> 
           <p>{humanSymbol === 'X' ? humanName : 'AI'} scored: {scoreX} </p> <p> {humanSymbol === 'O' ? humanName : 'AI'} scored: {scoreO}</p>   </>) : (<>
          <h2 style={{color: winner !== 'draw' ? winner === playerx ? colorx : coloro : 'inherit'}}>
            {winner !== 'draw' ? `Winner: ${winner}` : "It's a Tie!"}
          </h2>
          <p>{playerx ? playerx : 'X'} scored: {scoreX} </p> <p> {playerO ? playerO : 'O'} scored: {scoreO}</p> </>) }
          <div>
          <button onClick={()=> {setWinner(null); resetscore(); reset();}}>Play Again</button>
          <button onClick={()=> {setWinner(null); resetscore(); reset(); window.location.reload(true);}}>New Game</button> </div>
        </div> </div>)}
    </div>
  )

}
export default Ticatactoe