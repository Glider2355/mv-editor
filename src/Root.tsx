import React from 'react';
import { Composition } from 'remotion';
import { SimpleMV } from './presets/templates/SimpleMV';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SimpleMV"
        component={SimpleMV}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          artistName: 'Your Artist Name',
          songTitle: 'Your Song Title',
          audioFile: '/audio/sample.mp3',
        }}
      />
    </>
  );
};
