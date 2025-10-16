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
        <Sword className="w-24 h-24 mx-auto mb-4 drop-shadow-glow" style={{ color: '#F15623' }} strokeWidth={2.5} />
      </div>

      <h1 className="mb-3 text-6xl font-black drop-shadow-xl" style={{
        background: 'linear-gradient(to right, #F15623, #FF9900)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        EXPENSE NINJA
      </h1>

      <p className="mb-2 text-2xl font-bold drop-shadow-lg animate-pulse" style={{ color: '#66CCCC' }}>
        Slash Your Expenses!
      </p>

      <p className="mb-12 text-lg font-semibold drop-shadow-md" style={{ color: '#FF9900' }}>
        Save Like a Ninja 🥷
      </p>

      {/* High Score Display */}
      {highScore > 0 && (
        <div className="flex items-center gap-2 px-6 py-3 mb-8 rounded-full backdrop-blur-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.15)' }}>
          <Trophy className="w-6 h-6" style={{ color: '#FF9900' }} />
          <span className="text-xl font-bold" style={{ color: '#66CCCC' }}>Best: {highScore}</span>
        </div>
      )}

      {/* Start Button */}
      <button
        onClick={onStart}
        className="flex items-center gap-3 px-12 py-5 text-2xl font-black text-white transition-all duration-300 transform rounded-full shadow-2xl hover:scale-110 active:scale-95"
        style={{ background: 'linear-gradient(to right, #F15623, #FF9900)' }}
      >
        <Play className="w-8 h-8 fill-current" />
        START GAME
      </button>

      {/* Instructions */}
      <div className="mt-12" style={{ color: '#66CCCC', opacity: 0.9 }}>
        <p className="text-sm font-medium">Swipe to slash expenses and earn coins!</p>
        <p className="text-xs mt-1">Miss 3 expenses and you're out!</p>
      </div>
    </div>
  );
}
