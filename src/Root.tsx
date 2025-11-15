import React from 'react';
import { Composition, Folder } from 'remotion';
import { LyricsMV } from './templates/LyricsMV';
import { LyricsMVFromJSON } from './templates/LyricsMVFromJSON';
import { lyricsMVSchema } from './templates/schemas';
import { lyricsMVFromJSONSchema } from './templates/jsonSchemas';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Lyrics-MV">
        {/* JSONファイルから読み込むテンプレート */}
        <Composition
          id="LyricsMV-FromJSON"
          component={LyricsMVFromJSON as React.ComponentType<unknown>}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
          schema={lyricsMVFromJSONSchema}
          defaultProps={{
            jsonFile: '/lyrics/sample.json',
          }}
        />

        {/* 直接編集するテンプレート */}
        <Composition
          id="LyricsMV-Direct"
          component={LyricsMV as React.ComponentType<unknown>}
          durationInFrames={900}
          fps={30}
          width={1920}
          height={1080}
          schema={lyricsMVSchema}
          defaultProps={{
            background: {
              imageSrc: '', // 空にするとグラデーション背景を表示。画像を使う場合は '/images/background.jpg' などを指定
              blur: 0,
              brightness: 100,
              contrast: 100,
              saturation: 100,
              vignette: false,
            },
            lyrics: [
              {
                text: '最初の歌詞',
                startFrame: 0,
                durationInFrames: 90,
                effect: 'simpleFade',
                fontSize: 56,
                color: '#FFFFFF',
                position: 'center',
              },
              {
                text: '次の歌詞\nフェードアップ',
                startFrame: 90,
                durationInFrames: 90,
                effect: 'fadeUp',
                fontSize: 52,
                color: '#FF6B9D',
                position: 'center',
              },
              {
                text: 'スライドイン',
                startFrame: 180,
                durationInFrames: 90,
                effect: 'slideLeft',
                fontSize: 48,
                color: '#4ECDC4',
                position: 'bottom',
              },
              {
                text: 'バウンスエフェクト',
                startFrame: 270,
                durationInFrames: 90,
                effect: 'bounceIn',
                fontSize: 60,
                color: '#FFE66D',
                position: 'center',
              },
              {
                text: 'エラスティック',
                startFrame: 360,
                durationInFrames: 90,
                effect: 'elastic',
                fontSize: 54,
                color: '#A8DADC',
                position: 'top',
              },
            ],
            defaultFontSize: 48,
            defaultColor: '#FFFFFF',
            defaultFontFamily: 'Arial, Hiragino Sans, sans-serif',
          }}
        />
      </Folder>
    </>
  );
};
