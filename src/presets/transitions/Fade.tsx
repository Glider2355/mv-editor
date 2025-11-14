import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

interface FadeTransitionProps {
  durationInFrames: number;
  children: React.ReactNode;
  type?: 'in' | 'out' | 'cross';
}

export const FadeTransition: React.FC<FadeTransitionProps> = ({
  durationInFrames,
  children,
  type = 'in',
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, durationInFrames],
    type === 'out' ? [1, 0] : [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      {children}
    </AbsoluteFill>
  );
};
