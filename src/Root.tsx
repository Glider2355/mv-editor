import React from 'react';
import { Composition } from 'remotion';
import { SimpleMV } from './presets/templates/SimpleMV';
import { CustomizableMV } from './presets/templates/CustomizableMV';
import { simpleMVSchema, customizableMVSchema } from './presets/templates/schemas';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* シンプルなMVテンプレート（固定シーン構成） */}
      <Composition
        id="SimpleMV"
        component={SimpleMV as React.ComponentType<unknown>}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={simpleMVSchema}
        defaultProps={{
          artistName: 'Your Artist Name',
          songTitle: 'Your Song Title',
        }}
      />

      {/* カスタマイズ可能なMVテンプレート（UIからプリセット選択可能） */}
      <Composition
        id="CustomizableMV"
        component={CustomizableMV as React.ComponentType<unknown>}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={customizableMVSchema}
        defaultProps={{
          audioFile: undefined,
          scene1: {
            type: 'artist',
            from: 0,
            durationInFrames: 120,
            artistName: 'Your Artist Name',
            songTitle: 'Your Song Title',
            layout: 'center',
            theme: 'bold',
            primaryColor: '#667eea',
            secondaryColor: '#764ba2',
          },
          scene2: {
            type: 'visualEffect',
            from: 120,
            durationInFrames: 180,
            effectType: 'gradient',
            colorScheme: ['#667eea', '#764ba2', '#f093fb'],
            intensity: 1,
          },
          scene3: {
            type: 'lyrics',
            from: 300,
            durationInFrames: 180,
            lyrics: 'Your lyrics here',
            fontSize: 56,
            textColor: '#FFFFFF',
            backgroundColor: 'transparent',
            animationType: 'fade',
            position: 'center',
          },
          scene4: {
            type: 'visualEffect',
            from: 480,
            durationInFrames: 180,
            effectType: 'particles',
            colorScheme: ['#fa709a', '#fee140', '#30cfd0'],
            intensity: 1.2,
          },
          scene5: {
            type: 'artist',
            from: 660,
            durationInFrames: 240,
            artistName: 'Your Artist Name',
            songTitle: 'Your Song Title',
            layout: 'center',
            theme: 'elegant',
            primaryColor: '#2c3e50',
            secondaryColor: '#3498db',
          },
        }}
      />
    </>
  );
};
