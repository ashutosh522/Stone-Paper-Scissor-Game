
import React, { useState, useEffect } from 'react';
import './App.css';

const moves = ['Stone', 'Paper', 'Scissor'];

function App() {
  const [playerMove, setPlayerMove] = useState('');
  const [computerMove, setComputerMove] = useState('');
  const [result, setResult] = useState('');
  const [score, setScore] = useState({
    wins: 0,
    losses: 0,
    draws: 0,
  });

  // Function to get computer's random move
  const getComputerMove = () => {
    const randomIndex = Math.floor(Math.random() * moves.length);
    console.log(randomIndex);
    return moves[randomIndex];
  };

  // Function to determine the winner
  const determineWinner = (player, computer) => {
    if (player === computer) {
      return "It's a draw!";
    }
    if (
      (player === 'Stone' && computer === 'Scissor') ||
      (player === 'Paper' && computer === 'Stone') ||
      (player === 'Scissor' && computer === 'Paper')
    ) {
      return 'You win!';
    }
    return 'You lose!';
  };

  // Function to update the score
  const updateScore = (result) => {
    let newScore = { ...score };

    if (result === 'You win!') {
      newScore.wins += 1;
    } else if (result === 'You lose!') {
      newScore.losses += 1;
    } else {
      newScore.draws += 1;
    }

    setScore(newScore);
    localStorage.setItem('score', JSON.stringify(newScore));
  };

  // Function to handle player's move
  const handlePlayerMove = (move) => {
    const computerMove = getComputerMove();
    setPlayerMove(move);
    setComputerMove(computerMove);
    const gameResult = determineWinner(move, computerMove);
    setResult(gameResult);
    updateScore(gameResult);
  };

  // Load score from localStorage on initial render
  useEffect(() => {
    const storedScore = JSON.parse(localStorage.getItem('score'));
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  const clearScore = () => {
    localStorage.removeItem('score');
    console.log('Score has been cleared from local storage!');
    setScore({
      wins: 0,
      losses: 0,
      draws: 0,
    })
  };
  
  
  

  return (
    <div className="app">
      <h1>Stone Paper Scissor Game</h1>
      <div className="game-buttons">
        {moves.map((move) => (
          <button key={move} onClick={() => handlePlayerMove(move)}>
            {move}
          </button>
        ))}
      </div>
      
      <div className="results">
        {playerMove && <p>You chose: <strong>{playerMove}</strong></p>}
        {computerMove && <p>Computer chose: <strong>{computerMove}</strong></p>}
        {result && <p className="result-message">{result}</p>}
      </div>

      {/* Scorecard */}
      <div className="scorecard">
        <h2>Scorecard</h2>
        
        <p>Wins: {score.wins}</p>
        <p>Losses: {score.losses}</p>
        <p>Draws: {score.draws}</p>
        <button onClick={()=> clearScore()}>Reset</button>
      </div>
    </div>
  );
}

export default App;
