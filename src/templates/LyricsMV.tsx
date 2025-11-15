import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { ImageBackground } from '../components/Background/ImageBackground';
import { LyricsText } from '../components/LyricsText/LyricsText';
import type { LyricsMVProps } from '../types';

export const LyricsMV: React.FC<LyricsMVProps> = ({
  audioFile,
  background,
  lyrics,
  defaultFontSize = 48,
  defaultColor = '#FFFFFF',
  defaultFontFamily = 'Arial, sans-serif',
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000000' }}>
      {/* 背景画像 */}
      <ImageBackground {...background} />

      {/* オーディオトラック */}
      {audioFile && <Audio src={staticFile(audioFile)} />}

      {/* 歌詞を順番に表示 */}
      {lyrics.map((line, index) => (
        <Sequence
          key={index}
          from={line.startFrame}
          durationInFrames={line.durationInFrames}
        >
          <LyricsText
            text={line.text}
            effect={line.effect}
            fontSize={line.fontSize || defaultFontSize}
            color={line.color || defaultColor}
            fontFamily={line.fontFamily || defaultFontFamily}
            position={line.position || 'center'}
            durationInFrames={line.durationInFrames}
            writingMode={line.writingMode || 'horizontal'}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
