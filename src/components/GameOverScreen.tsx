import { RotateCcw, Trophy, Coins } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  highScore: number;
  onRestart: () => void;
}

export default function GameOverScreen({ score, highScore, onRestart }: GameOverScreenProps) {
  const isNewHighScore = score === highScore && score > 0;

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
      {/* Game Over Title */}
      <h1 className="mb-8 text-5xl font-black drop-shadow-xl animate-pulse" style={{
        background: 'linear-gradient(to right, #F15623, #FF9900)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        GAME OVER
      </h1>

      {/* New High Score Banner */}
      {isNewHighScore && (
        <div className="mb-6 animate-bounce">
          <div className="px-8 py-3 text-2xl font-black text-white rounded-full shadow-2xl" style={{ background: 'linear-gradient(to right, #FF9900, #F15623)' }}>
            🎉 NEW HIGH SCORE! 🎉
          </div>
        </div>
      )}

      {/* Score Display */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl backdrop-blur-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
          <Coins className="w-10 h-10" style={{ color: '#FF9900' }} />
          <div className="text-left">
            <p className="text-sm font-medium" style={{ color: '#66CCCC', opacity: 0.9 }}>Your Score</p>
            <p className="text-4xl font-black" style={{ color: '#66CCCC' }}>{score}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl backdrop-blur-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
          <Trophy className="w-10 h-10" style={{ color: '#FF9900' }} />
          <div className="text-left">
            <p className="text-sm font-medium" style={{ color: '#66CCCC', opacity: 0.9 }}>High Score</p>
            <p className="text-4xl font-black" style={{ color: '#66CCCC' }}>{highScore}</p>
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="flex items-center gap-3 px-12 py-5 text-2xl font-black text-white transition-all duration-300 transform rounded-full shadow-2xl hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(to right, #66CCCC, #F15623)' }}
      >
        <RotateCcw className="w-8 h-8" />
        PLAY AGAIN
      </button>

      {/* Motivational Message */}
      <p className="mt-8 text-lg font-semibold drop-shadow-md" style={{ color: '#F15623' }}>
        Keep slashing those expenses! 💪
      </p>
    </div>
  );
}
