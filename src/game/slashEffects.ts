export interface SlashEffect {
  x: number;
  y: number;
  points: number;
  life: number;
  scale: number;
}

export function createSlashEffect(x: number, y: number, points: number): SlashEffect {
  return {
    x,
    y,
    points,
    life: 1,
    scale: 1,
  };
}

export function updateSlashEffects(effects: SlashEffect[]): SlashEffect[] {
  return effects
    .map(effect => ({
      ...effect,
      life: effect.life - 0.02,
      scale: effect.scale + 0.03,
      y: effect.y - 2,
    }))
    .filter(effect => effect.life > 0);
}

export function drawSlashEffects(ctx: CanvasRenderingContext2D, effects: SlashEffect[]): void {
  effects.forEach(effect => {
    ctx.save();
    ctx.globalAlpha = effect.life;
    ctx.translate(effect.x, effect.y);
    ctx.scale(effect.scale, effect.scale);

    // Draw "+points" text
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Gold outline
    ctx.strokeStyle = '#FFD700';
    ctx.lineWidth = 4;
    ctx.strokeText(`+${effect.points}`, 0, 0);

    // White fill
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(`+${effect.points}`, 0, 0);

    // Draw coin emoji
    ctx.font = '25px Arial';
    ctx.fillText('💰', 0, -35);

    ctx.restore();
  });
}
