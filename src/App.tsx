import { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';

export type GameState = 'start' | 'playing' | 'gameOver';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('expenseNinjaHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameState('playing');
  };

  const endGame = () => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('expenseNinjaHighScore', score.toString());
    }
    setGameState('gameOver');
  };

  const restartGame = () => {
    startGame();
  };

  return (
    <div className="fixed inset-0 overflow-hidden bg-gradient-to-br from-violet-900 via-purple-800 to-fuchsia-900">
      {/* Floating financial icons background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-10 left-10 text-6xl animate-float">₹</div>
        <div className="absolute top-20 right-20 text-7xl animate-float-delayed">$</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-float">💰</div>
        <div className="absolute bottom-20 right-32 text-6xl animate-float-delayed">🏦</div>
        <div className="absolute top-1/2 left-1/4 text-5xl animate-float">💵</div>
        <div className="absolute top-1/3 right-1/4 text-6xl animate-float-delayed">🪙</div>
      </div>

      {gameState === 'start' && <StartScreen onStart={startGame} highScore={highScore} />}

      {gameState === 'playing' && (
        <GameCanvas
          score={score}
          setScore={setScore}
          lives={lives}
          setLives={setLives}
          onGameOver={endGame}
        />
      )}

      {gameState === 'gameOver' && (
        <GameOverScreen
          score={score}
          highScore={highScore}
          onRestart={restartGame}
        />
      )}
    </div>
  );
}

export default App;
