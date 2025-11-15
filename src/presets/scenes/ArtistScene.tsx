import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { ArtistSceneProps } from '../../types';

export const ArtistScene: React.FC<ArtistSceneProps> = ({
  artistName = 'Artist Name',
  songTitle = 'Song Title',
  layout = 'center',
  theme = 'minimal',
  primaryColor = '#667eea',
  secondaryColor = '#764ba2',
  durationInFrames = 120,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  // フェードアニメーション
  const fadeInDuration = fps * 0.8;
  const fadeOutStart = durationInFrames - fps * 0.8;

  const opacity = interpolate(
    frame,
    [0, fadeInDuration, fadeOutStart, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // スケールアニメーション
  const scale = interpolate(
    frame,
    [0, fadeInDuration],
    [0.8, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // テーマに応じたスタイル
  const getThemeStyles = () => {
    switch (theme) {
      case 'bold':
        return {
          artistFontSize: Math.floor(width * 0.08),
          songFontSize: Math.floor(width * 0.045),
          fontWeight: 900,
          letterSpacing: '0.05em',
          textTransform: 'uppercase' as const,
        };
      case 'elegant':
        return {
          artistFontSize: Math.floor(width * 0.06),
          songFontSize: Math.floor(width * 0.035),
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'capitalize' as const,
        };
      case 'minimal':
      default:
        return {
          artistFontSize: Math.floor(width * 0.05),
          songFontSize: Math.floor(width * 0.03),
          fontWeight: 400,
          letterSpacing: '0.1em',
          textTransform: 'none' as const,
        };
    }
  };

  const themeStyles = getThemeStyles();

  // レイアウトに応じたスタイル
  const getLayoutStyles = () => {
    switch (layout) {
      case 'split':
        return {
          flexDirection: 'row' as const,
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 10%',
        };
      case 'corner':
        return {
          flexDirection: 'column' as const,
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          padding: '5%',
        };
      case 'center':
      default:
        return {
          flexDirection: 'column' as const,
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5%',
        };
    }
  };

  const layoutStyles = getLayoutStyles();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`,
        display: 'flex',
        ...layoutStyles,
        opacity,
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          textAlign: layout === 'center' ? 'center' : 'left',
        }}
      >
        <div
          style={{
            fontSize: themeStyles.artistFontSize,
            fontWeight: themeStyles.fontWeight,
            letterSpacing: themeStyles.letterSpacing,
            textTransform: themeStyles.textTransform,
            color: '#FFFFFF',
            marginBottom: height * 0.02,
            textShadow: '3px 3px 6px rgba(0, 0, 0, 0.5)',
          }}
        >
          {artistName}
        </div>
        <div
          style={{
            fontSize: themeStyles.songFontSize,
            fontWeight: themeStyles.fontWeight - 100,
            letterSpacing: themeStyles.letterSpacing,
            color: '#FFFFFF',
            opacity: 0.9,
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          {songTitle}
        </div>
      </div>
    </AbsoluteFill>
  );
};

