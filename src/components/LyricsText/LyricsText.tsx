import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import type { LyricsTextProps } from '../../types';
import { applyEffect } from './effects/applyEffect';

export const LyricsText: React.FC<LyricsTextProps> = ({
  text,
  effect,
  fontSize,
  color,
  fontFamily,
  position,
  durationInFrames,
  writingMode = 'horizontal',
}) => {
  const frame = useCurrentFrame();

  // エフェクトを適用
  const { opacity, transform } = applyEffect(effect, frame, durationInFrames);

  // 縦書きの場合の設定
  const isVertical = writingMode === 'vertical';

  // 位置の設定
  const justifyContent =
    position === 'top' ? 'flex-start' :
    position === 'bottom' ? 'flex-end' :
    'center';

  // 横書き時の配置
  const alignItemsHorizontal = 'center';

  // 縦書き時の配置（左右の位置）
  const alignItemsVertical =
    position === 'top' ? 'flex-end' :    // 縦書きで上 = 右側
    position === 'bottom' ? 'flex-start' : // 縦書きで下 = 左側
    'center';

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        justifyContent: isVertical ? alignItemsVertical : justifyContent,
        alignItems: isVertical ? justifyContent : alignItemsHorizontal,
        padding: '5%',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          fontSize,
          fontFamily,
          color,
          opacity,
          transform,
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: `
            2px 2px 4px rgba(0, 0, 0, 0.8),
            -1px -1px 2px rgba(0, 0, 0, 0.5)
          `,
          maxWidth: isVertical ? '90%' : '90%',
          maxHeight: isVertical ? '90%' : undefined,
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
          writingMode: isVertical ? 'vertical-rl' : 'horizontal-tb',
          textOrientation: isVertical ? 'upright' : undefined,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
