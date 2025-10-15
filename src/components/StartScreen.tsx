import { Play, Sword, Trophy } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
  highScore: number;
}

export default function StartScreen({ onStart, highScore }: StartScreenProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
      {/* Logo/Title */}
      <div className="mb-8 animate-bounce-slow">
        <Sword className="w-24 h-24 mx-auto mb-4 text-yellow-400 drop-shadow-glow" strokeWidth={2.5} />
      </div>

      <h1 className="mb-3 text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500 drop-shadow-xl">
        EXPENSE NINJA
      </h1>

      <p className="mb-2 text-2xl font-bold text-white drop-shadow-lg animate-pulse">
        Slash Your Expenses!
      </p>

      <p className="mb-12 text-lg font-semibold text-yellow-200 drop-shadow-md">
        Save Like a Ninja 🥷
      </p>

      {/* High Score Display */}
      {highScore > 0 && (
        <div className="flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-white/20 backdrop-blur-sm">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <span className="text-xl font-bold text-white">Best: {highScore}</span>
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={onStart}
        className="flex items-center gap-3 px-12 py-5 text-2xl font-black text-purple-900 transition-all duration-300 transform bg-gradient-to-r from-yellow-300 to-orange-400 rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-400/50 active:scale-95"
      >
        <Play className="w-8 h-8 fill-current" />
        START GAME
      </button>

      {/* Instructions */}
      <div className="mt-12 text-white/80">
        <p className="text-sm font-medium">Swipe to slash expenses and earn coins!</p>
        <p className="text-xs mt-1">Miss 3 expenses and you're out!</p>
      </div>
    </div>
  );
}
