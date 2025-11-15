import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import type { VisualEffectSceneProps } from '../../types';

export const VisualEffectScene: React.FC<VisualEffectSceneProps> = ({
  effectType = 'gradient',
  colorScheme = ['#667eea', '#764ba2', '#f093fb'],
  intensity = 1,
  durationInFrames = 120,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const renderEffect = () => {
    switch (effectType) {
      case 'gradient':
        return renderGradient();
      case 'particles':
        return renderParticles();
      case 'geometric':
        return renderGeometric();
      case 'noise':
        return renderNoise();
      default:
        return renderGradient();
    }
  };

  const renderGradient = () => {
    const rotation = interpolate(frame, [0, durationInFrames], [0, 360]);
    const scale = 1 + Math.sin(frame / 30) * 0.1 * intensity;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(${rotation}deg, ${colorScheme.join(', ')})`,
          transform: `scale(${scale})`,
        }}
      />
    );
  };

  const renderParticles = () => {
    const particleCount = Math.floor(50 * intensity);
    const particles = Array.from({ length: particleCount }, (_, i) => {
      const x = (Math.sin(i * 0.5 + frame * 0.05) * width) / 2 + width / 2;
      const y = (Math.cos(i * 0.3 + frame * 0.03) * height) / 2 + height / 2;
      const size = 5 + Math.sin(frame * 0.1 + i) * 3;
      const colorIndex = i % colorScheme.length;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: size,
            height: size,
            borderRadius: '50%',
            backgroundColor: colorScheme[colorIndex],
            opacity: 0.6,
            boxShadow: `0 0 ${size * 2}px ${colorScheme[colorIndex]}`,
          }}
        />
      );
    });

    return <>{particles}</>;
  };

  const renderGeometric = () => {
    const shapeCount = Math.floor(10 * intensity);
    const shapes = Array.from({ length: shapeCount }, (_, i) => {
      const rotation = interpolate(
        frame,
        [0, durationInFrames],
        [0, 360 * (i % 2 === 0 ? 1 : -1)]
      );
      const x = (width / shapeCount) * i;
      const y = height / 2 + Math.sin(frame * 0.05 + i) * height * 0.2;
      const size = 50 + Math.sin(frame * 0.03 + i) * 30;
      const colorIndex = i % colorScheme.length;

      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: size,
            height: size,
            backgroundColor: colorScheme[colorIndex],
            opacity: 0.5,
            transform: `rotate(${rotation}deg)`,
            borderRadius: i % 3 === 0 ? '50%' : '0',
          }}
        />
      );
    });

    return <>{shapes}</>;
  };

  const renderNoise = () => {
    const opacity = 0.1 * intensity;
    const translateX = Math.sin(frame * 0.1) * 10;
    const translateY = Math.cos(frame * 0.1) * 10;

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: `repeating-linear-gradient(
            ${frame}deg,
            ${colorScheme[0]} 0px,
            ${colorScheme[1]} 2px,
            ${colorScheme[2] || colorScheme[0]} 4px
          )`,
          opacity,
          transform: `translate(${translateX}px, ${translateY}px)`,
          filter: 'blur(1px)',
        }}
      />
    );
  };

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#000000',
        overflow: 'hidden',
      }}
    >
      {renderEffect()}
    </AbsoluteFill>
  );
};

