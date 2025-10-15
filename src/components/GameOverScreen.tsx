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
      <h1 className="mb-8 text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 drop-shadow-xl animate-pulse">
        GAME OVER
      </h1>

      {/* New High Score Banner */}
      {isNewHighScore && (
        <div className="mb-6 animate-bounce">
          <div className="px-8 py-3 text-2xl font-black text-yellow-900 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full shadow-2xl">
            🎉 NEW HIGH SCORE! 🎉
          </div>
        </div>
      )}

      {/* Score Display */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-md">
          <Coins className="w-10 h-10 text-yellow-400" />
          <div className="text-left">
            <p className="text-sm font-medium text-white/70">Your Score</p>
            <p className="text-4xl font-black text-white">{score}</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/20 backdrop-blur-md">
          <Trophy className="w-10 h-10 text-yellow-400" />
          <div className="text-left">
            <p className="text-sm font-medium text-white/70">High Score</p>
            <p className="text-4xl font-black text-white">{highScore}</p>
          </div>
        </div>
      </div>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="flex items-center gap-3 px-12 py-5 text-2xl font-black text-purple-900 transition-all duration-300 transform bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-2xl hover:scale-110 hover:shadow-green-400/50 active:scale-95"
      >
        <RotateCcw className="w-8 h-8" />
        PLAY AGAIN
      </button>

      {/* Motivational Message */}
      <p className="mt-8 text-lg font-semibold text-yellow-300 drop-shadow-md">
        Keep slashing those expenses! 💪
      </p>
    </div>
  );
}
