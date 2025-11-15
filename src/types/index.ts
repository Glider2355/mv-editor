// 歌詞エフェクトタイプ
export type LyricsEffectType =
  | 'simpleFade'
  | 'fadeUp'
  | 'fadeDown'
  | 'slideLeft'
  | 'slideRight'
  | 'slideUp'
  | 'slideDown'
  | 'bounceIn'
  | 'elastic'
  | 'spring'
  | 'typewriter'
  | 'glitchType'
  | 'randomType'
  | 'rgbShift'
  | 'glitch'
  | 'digitalGlitch'
  | 'rotate3D'
  | 'flip'
  | 'perspective'
  | 'particleBurst'
  | 'sparkle'
  | 'dissolve'
  | 'karaokeFill'
  | 'highlight'
  | 'waveColor';

// 位置
export type LyricsPosition = 'top' | 'center' | 'bottom';

// 書き方向
export type WritingMode = 'horizontal' | 'vertical';

// 歌詞行の設定
export interface LyricsLine {
  text: string;
  startFrame: number;
  durationInFrames: number;
  effect: LyricsEffectType;
  fontSize?: number;
  color?: string;
  position?: LyricsPosition;
  fontFamily?: string;
  writingMode?: WritingMode;
}

// 背景設定
export interface BackgroundConfig {
  imageSrc: string;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  vignette?: boolean;
}

// MVテンプレートProps
export interface LyricsMVProps {
  audioFile?: string;
  background: BackgroundConfig;
  lyrics: LyricsLine[];
  defaultFontSize: number;
  defaultColor: string;
  defaultFontFamily: string;
}

// 背景コンポーネントProps
export interface ImageBackgroundProps {
  imageSrc: string;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  vignette?: boolean;
}

// 歌詞テキストコンポーネントProps
export interface LyricsTextProps {
  text: string;
  effect: LyricsEffectType;
  fontSize: number;
  color: string;
  fontFamily: string;
  position: LyricsPosition;
  durationInFrames: number;
  writingMode?: WritingMode;
}
