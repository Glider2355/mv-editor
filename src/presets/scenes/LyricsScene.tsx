import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { LyricsSceneProps } from '../../types';

export const LyricsScene: React.FC<LyricsSceneProps> = ({
  lyrics,
  fontSize,
  fontFamily,
  color,
  backgroundColor,
  animationType,
  position,
  durationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // フェードイン・フェードアウトのアニメーション
  const fadeInDuration = fps * 0.5; // 0.5秒
  const fadeOutStart = durationInFrames - fps * 0.5;

  const opacity = interpolate(
    frame,
    [0, fadeInDuration, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // アニメーションタイプに応じた変換
  let transform = '';
  let textOpacity = opacity;

  switch (animationType) {
    case 'slide':
      const slideX = interpolate(
        frame,
        [0, fadeInDuration],
        [-100, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      transform = `translateX(${slideX}px)`;
      break;

    case 'typewriter':
      const charsToShow = Math.floor(
        interpolate(
          frame,
          [0, durationInFrames * 0.3],
          [0, lyrics.length],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      );
      // タイプライター効果は別途実装
      break;

    case 'bounce':
      const bounceY = interpolate(
        frame,
        [0, fadeInDuration / 2, fadeInDuration],
        [50, -10, 0],
        { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
      );
      transform = `translateY(${bounceY}px)`;
      break;

    case 'fade':
    default:
      // デフォルトはフェードのみ
      break;
  }

  // 位置の設定
  const justifyContent =
    position === 'top' ? 'flex-start' :
    position === 'bottom' ? 'flex-end' :
    'center';

  return (
    <AbsoluteFill
      style={{
        backgroundColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent,
        alignItems: 'center',
        padding: '5%',
      }}
    >
      <div
        style={{
          fontSize,
          fontFamily,
          color,
          opacity: textOpacity,
          transform,
          textAlign: 'center',
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          maxWidth: '90%',
          lineHeight: 1.5,
        }}
      >
        {lyrics}
      </div>
    </AbsoluteFill>
  );
};

// Remotion Studioでのデフォルト値
LyricsScene.defaultProps = {
  lyrics: 'Sample Lyrics',
  fontSize: 48,
  fontFamily: 'Arial, sans-serif',
  color: '#FFFFFF',
  backgroundColor: '#1a1a1a',
  animationType: 'fade',
  position: 'center',
  durationInFrames: 90,
};
