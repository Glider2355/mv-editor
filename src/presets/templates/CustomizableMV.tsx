import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { LyricsScene } from '../scenes/LyricsScene';
import { ArtistScene } from '../scenes/ArtistScene';
import { VisualEffectScene } from '../scenes/VisualEffectScene';
import type { PresetSceneConfig } from '../../types';

interface CustomizableMVProps {
  audioFile?: string;
  scene1: PresetSceneConfig;
  scene2: PresetSceneConfig;
  scene3: PresetSceneConfig;
  scene4: PresetSceneConfig;
  scene5: PresetSceneConfig;
}

const SceneRenderer: React.FC<{ config: PresetSceneConfig }> = ({ config }) => {
  switch (config.type) {
    case 'artist':
      return (
        <ArtistScene
          artistName={config.artistName || 'Artist Name'}
          songTitle={config.songTitle || 'Song Title'}
          layout={config.layout || 'center'}
          theme={config.theme || 'minimal'}
          primaryColor={config.primaryColor || '#667eea'}
          secondaryColor={config.secondaryColor || '#764ba2'}
          durationInFrames={config.durationInFrames}
        />
      );

    case 'lyrics':
      return (
        <LyricsScene
          lyrics={config.lyrics || 'Your lyrics here'}
          fontSize={config.fontSize || 48}
          fontFamily={config.fontFamily || 'Arial, sans-serif'}
          color={config.textColor || '#FFFFFF'}
          backgroundColor={config.backgroundColor || 'transparent'}
          animationType={config.animationType || 'fade'}
          position={config.position || 'center'}
          durationInFrames={config.durationInFrames}
        />
      );

    case 'visualEffect':
      return (
        <VisualEffectScene
          effectType={config.effectType || 'gradient'}
          colorScheme={config.colorScheme || ['#667eea', '#764ba2', '#f093fb']}
          intensity={config.intensity || 1}
          durationInFrames={config.durationInFrames}
        />
      );

    case 'none':
    default:
      return (
        <AbsoluteFill style={{ backgroundColor: '#000000' }} />
      );
  }
};

export const CustomizableMV: React.FC<CustomizableMVProps> = ({
  audioFile,
  scene1,
  scene2,
  scene3,
  scene4,
  scene5,
}) => {
  const scenes = [scene1, scene2, scene3, scene4, scene5];

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* オーディオトラック（ファイルがある場合のみ） */}
      {audioFile && <Audio src={staticFile(audioFile)} />}

      {/* 各シーンをレンダリング */}
      {scenes.map((scene, index) => (
        <Sequence
          key={index}
          from={scene.from}
          durationInFrames={scene.durationInFrames}
        >
          <SceneRenderer config={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
