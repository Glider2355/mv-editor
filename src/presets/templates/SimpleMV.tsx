import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { LyricsScene } from '../scenes/LyricsScene';
import { ArtistScene } from '../scenes/ArtistScene';
import { VisualEffectScene } from '../scenes/VisualEffectScene';

interface SimpleMVProps {
  artistName: string;
  songTitle: string;
  audioFile: string;
}

export const SimpleMV: React.FC<SimpleMVProps> = ({
  artistName,
  songTitle,
  audioFile,
}) => {
  const fps = 30;

  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* オーディオトラック */}
      <Audio src={staticFile(audioFile)} />

      {/* シーン1: アーティスト・曲名表示 (0-4秒) */}
      <Sequence from={0} durationInFrames={120}>
        <ArtistScene
          artistName={artistName}
          songTitle={songTitle}
          layout="center"
          theme="bold"
          primaryColor="#667eea"
          secondaryColor="#764ba2"
          durationInFrames={120}
        />
      </Sequence>

      {/* シーン2: ビジュアルエフェクト背景 (4-10秒) */}
      <Sequence from={120} durationInFrames={180}>
        <VisualEffectScene
          effectType="gradient"
          colorScheme={['#667eea', '#764ba2', '#f093fb']}
          intensity={1}
          durationInFrames={180}
        />
        {/* 歌詞オーバーレイ */}
        <Sequence from={30} durationInFrames={120}>
          <LyricsScene
            lyrics="First verse lyrics here"
            fontSize={56}
            fontFamily="Arial, sans-serif"
            color="#FFFFFF"
            backgroundColor="transparent"
            animationType="fade"
            position="center"
            durationInFrames={120}
          />
        </Sequence>
      </Sequence>

      {/* シーン3: パーティクルエフェクト (10-16秒) */}
      <Sequence from={300} durationInFrames={180}>
        <VisualEffectScene
          effectType="particles"
          colorScheme={['#fa709a', '#fee140', '#30cfd0']}
          intensity={1.2}
          durationInFrames={180}
        />
        {/* 歌詞オーバーレイ */}
        <Sequence from={30} durationInFrames={120}>
          <LyricsScene
            lyrics="Chorus lyrics here"
            fontSize={64}
            fontFamily="Arial, sans-serif"
            color="#FFFFFF"
            backgroundColor="transparent"
            animationType="bounce"
            position="center"
            durationInFrames={120}
          />
        </Sequence>
      </Sequence>

      {/* シーン4: 幾何学模様 (16-22秒) */}
      <Sequence from={480} durationInFrames={180}>
        <VisualEffectScene
          effectType="geometric"
          colorScheme={['#4facfe', '#00f2fe', '#43e97b']}
          intensity={0.8}
          durationInFrames={180}
        />
        {/* 歌詞オーバーレイ */}
        <Sequence from={30} durationInFrames={120}>
          <LyricsScene
            lyrics="Second verse lyrics here"
            fontSize={56}
            fontFamily="Arial, sans-serif"
            color="#FFFFFF"
            backgroundColor="transparent"
            animationType="slide"
            position="center"
            durationInFrames={120}
          />
        </Sequence>
      </Sequence>

      {/* シーン5: エンディング - アーティスト名再表示 (22-30秒) */}
      <Sequence from={660} durationInFrames={240}>
        <ArtistScene
          artistName={artistName}
          songTitle={songTitle}
          layout="center"
          theme="elegant"
          primaryColor="#2c3e50"
          secondaryColor="#3498db"
          durationInFrames={240}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
