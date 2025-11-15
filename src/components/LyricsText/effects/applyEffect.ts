import { interpolate } from 'remotion';
import type { LyricsEffectType } from '../../../types';

interface EffectResult {
  opacity: number;
  transform: string;
}

export const applyEffect = (
  effect: LyricsEffectType,
  frame: number,
  durationInFrames: number
): EffectResult => {
  const fadeInDuration = Math.min(20, durationInFrames * 0.2);
  const fadeOutStart = durationInFrames - Math.min(20, durationInFrames * 0.2);

  // 基本的なフェード
  const baseOpacity = interpolate(
    frame,
    [0, fadeInDuration, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  switch (effect) {
    case 'simpleFade':
      return {
        opacity: baseOpacity,
        transform: '',
      };

    case 'fadeUp': {
      const translateY = interpolate(
        frame,
        [0, fadeInDuration],
        [50, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `translateY(${translateY}px)`,
      };
    }

    case 'fadeDown': {
      const translateY = interpolate(
        frame,
        [0, fadeInDuration],
        [-50, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `translateY(${translateY}px)`,
      };
    }

    case 'slideLeft': {
      const translateX = interpolate(
        frame,
        [0, fadeInDuration],
        [100, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `translateX(${translateX}px)`,
      };
    }

    case 'slideRight': {
      const translateX = interpolate(
        frame,
        [0, fadeInDuration],
        [-100, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `translateX(${translateX}px)`,
      };
    }

    case 'slideUp': {
      const translateY = interpolate(
        frame,
        [0, fadeInDuration],
        [100, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `translateY(${translateY}px)`,
      };
    }

    case 'slideDown': {
      const translateY = interpolate(
        frame,
        [0, fadeInDuration],
        [-100, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `translateY(${translateY}px)`,
      };
    }

    case 'bounceIn': {
      const scale = interpolate(
        frame,
        [0, fadeInDuration * 0.6, fadeInDuration],
        [0, 1.2, 1],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      return {
        opacity: baseOpacity,
        transform: `scale(${scale})`,
      };
    }

    case 'elastic': {
      const progress = Math.min(frame / fadeInDuration, 1);
      const elasticScale =
        1 +
        Math.sin(progress * Math.PI * 4) *
          Math.exp(-progress * 4) *
          0.3;
      return {
        opacity: baseOpacity,
        transform: `scale(${elasticScale})`,
      };
    }

    case 'spring': {
      const progress = Math.min(frame / fadeInDuration, 1);
      const springY =
        Math.sin(progress * Math.PI * 3) *
        Math.exp(-progress * 5) *
        50;
      return {
        opacity: baseOpacity,
        transform: `translateY(${springY}px)`,
      };
    }

    // 他のエフェクトは今後実装
    default:
      return {
        opacity: baseOpacity,
        transform: '',
      };
  }
};
