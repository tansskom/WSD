import { useEffect, useRef, useState } from 'react';
import { Heart, Coins } from 'lucide-react';
import { ExpenseItem, createExpenseItem, updateExpenseItem, drawExpenseItem } from '../game/expenseItems';
import { SlashEffect, createSlashEffect, updateSlashEffects, drawSlashEffects } from '../game/slashEffects';
import { Particle, updateParticles, drawParticles } from '../game/particles';

interface GameCanvasProps {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
  onGameOver: () => void;
}

export default function GameCanvas({ score, setScore, lives, setLives, onGameOver }: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const itemsRef = useRef<ExpenseItem[]>([]);
  const slashEffectsRef = useRef<SlashEffect[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const [isSlashing, setIsSlashing] = useState(false);
  const [slashPath, setSlashPath] = useState<{ x: number; y: number }[]>([]);
  const animationFrameRef = useRef<number>();
  const lastSpawnTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match mobile aspect ratio (9:16)
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        canvas.width = width;
        canvas.height = height;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gameLoop = (timestamp: number) => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new expense items
      if (timestamp - lastSpawnTimeRef.current > 1000) {
        itemsRef.current.push(createExpenseItem(canvas.width, canvas.height));
        lastSpawnTimeRef.current = timestamp;
      }

      // Update and draw items
      const updatedItems: ExpenseItem[] = [];
      itemsRef.current.forEach(item => {
        const updated = updateExpenseItem(item, canvas.height);

        if (updated.active) {
          drawExpenseItem(ctx, updated);
          updatedItems.push(updated);
        } else if (!updated.slashed) {
          // Item fell off screen without being slashed
          setLives(currentLives => {
            const newLives = currentLives - 1;
            if (newLives <= 0) {
              setTimeout(() => onGameOver(), 500);
            }
            return newLives;
          });
        }
      });
      itemsRef.current = updatedItems;

      // Update and draw slash effects
      slashEffectsRef.current = updateSlashEffects(slashEffectsRef.current);
      drawSlashEffects(ctx, slashEffectsRef.current);

      // Update and draw particles
      particlesRef.current = updateParticles(particlesRef.current);
      drawParticles(ctx, particlesRef.current);

      // Draw slash trail
      if (slashPath.length > 1) {
        ctx.beginPath();
        ctx.moveTo(slashPath[0].x, slashPath[0].y);
        for (let i = 1; i < slashPath.length; i++) {
          ctx.lineTo(slashPath[i].x, slashPath[i].y);
        }
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#FFD700';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrameRef.current = requestAnimationFrame(gameLoop);
    };

    animationFrameRef.current = requestAnimationFrame(gameLoop);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [slashPath, onGameOver, setLives]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsSlashing(true);
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSlashPath([{ x, y }]);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isSlashing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSlashPath(prev => [...prev.slice(-20), { x, y }]);

      // Check collision with items
      itemsRef.current = itemsRef.current.map(item => {
        if (item.slashed || !item.active) return item;

        const dx = x - item.x;
        const dy = y - item.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < item.size) {
          // Item slashed!
          setScore(currentScore => currentScore + item.points);
          slashEffectsRef.current.push(createSlashEffect(item.x, item.y, item.points));

          // Create particles
          const newParticles: Particle[] = [];
          for (let i = 0; i < 15; i++) {
            const angle = (Math.PI * 2 * i) / 15;
            newParticles.push({
              x: item.x,
              y: item.y,
              vx: Math.cos(angle) * (Math.random() * 4 + 2),
              vy: Math.sin(angle) * (Math.random() * 4 + 2),
              life: 1,
              color: item.color,
              size: Math.random() * 6 + 3,
            });
          }
          particlesRef.current.push(...newParticles);

          return { ...item, slashed: true, active: false };
        }

        return item;
      });
    }
  };

  const handlePointerUp = () => {
    setIsSlashing(false);
    setSlashPath([]);
  };

  return (
    <div className="relative w-full h-full">
      {/* HUD */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 bg-gradient-to-b from-black/40 to-transparent">
        {/* Lives */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm">
          {[...Array(3)].map((_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${
                i < lives ? 'text-red-500 fill-red-500' : 'text-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Score */}
        <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 backdrop-blur-sm">
          <Coins className="w-6 h-6 text-yellow-400" />
          <span className="text-2xl font-black text-white drop-shadow-lg">{score}</span>
        </div>
      </div>

      {/* Game Title Overlay */}
      <div className="absolute top-16 left-0 right-0 z-10 text-center pointer-events-none">
        <p className="text-xl font-bold text-yellow-300 drop-shadow-lg animate-pulse">
          Slash Your Expenses!
        </p>
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
}
