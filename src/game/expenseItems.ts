export interface ExpenseItem {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
  size: number;
  type: string;
  emoji: string;
  color: string;
  points: number;
  active: boolean;
  slashed: boolean;
}

const expenseTypes = [
  { emoji: '⚡', color: '#FFD700', points: 10, name: 'electricity' },
  { emoji: '🍕', color: '#FF6B6B', points: 15, name: 'pizza' },
  { emoji: '🛍️', color: '#4ECDC4', points: 20, name: 'shopping' },
  { emoji: '🚗', color: '#95E1D3', points: 25, name: 'parking' },
  { emoji: '📦', color: '#F38181', points: 15, name: 'delivery' },
  { emoji: '🎬', color: '#AA96DA', points: 20, name: 'movie' },
  { emoji: '☕', color: '#FCBAD3', points: 10, name: 'coffee' },
];

let itemIdCounter = 0;

export function createExpenseItem(canvasWidth: number, canvasHeight: number): ExpenseItem {
  const expenseType = expenseTypes[Math.floor(Math.random() * expenseTypes.length)];
  const x = Math.random() * (canvasWidth - 100) + 50;
  const y = canvasHeight + 50;

  return {
    id: itemIdCounter++,
    x,
    y,
    vx: (Math.random() - 0.5) * 4,
    vy: -(Math.random() * 8 + 18),
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.2,
    size: 40,
    type: expenseType.name,
    emoji: expenseType.emoji,
    color: expenseType.color,
    points: expenseType.points,
    active: true,
    slashed: false,
  };
}

export function updateExpenseItem(item: ExpenseItem, canvasHeight: number): ExpenseItem {
  if (!item.active) return item;

  const gravity = 0.4;
  const newVy = item.vy + gravity;
  const newY = item.y + newVy;
  const newX = item.x + item.vx;
  const newRotation = item.rotation + item.rotationSpeed;

  // Deactivate if off screen (both top and bottom)
  const active = newY < canvasHeight + 100 && newY > -100;

  return {
    ...item,
    x: newX,
    y: newY,
    vy: newVy,
    rotation: newRotation,
    active,
  };
}

export function drawExpenseItem(ctx: CanvasRenderingContext2D, item: ExpenseItem): void {
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.rotate(item.rotation);

  // Draw shadow
  ctx.shadowBlur = 20;
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;

  // Draw background circle
  ctx.fillStyle = item.color;
  ctx.beginPath();
  ctx.arc(0, 0, item.size, 0, Math.PI * 2);
  ctx.fill();

  // Draw emoji
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.font = `${item.size * 1.2}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(item.emoji, 0, 0);

  ctx.restore();
}
