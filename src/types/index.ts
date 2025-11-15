// シーンの基本インターフェース
export interface SceneProps {
  durationInFrames: number;
  fps?: number;
  startFrom?: number;
}

// アニメーションタイプ
export type AnimationType = 'fade' | 'slide' | 'typewriter' | 'bounce';

// レイアウトタイプ
export type LayoutType = 'center' | 'split' | 'corner' | 'top' | 'bottom';

// テーマタイプ
export type ThemeType = 'minimal' | 'bold' | 'elegant';

// エフェクトタイプ
export type EffectType = 'particles' | 'gradient' | 'geometric' | 'noise';

// トランジションタイプ
export type TransitionType = 'fade' | 'slide' | 'wipe' | 'zoom';

// 歌詞シーンのプロパティ
export interface LyricsSceneProps extends SceneProps {
  lyrics: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  animationType: AnimationType;
  position: LayoutType;
}

// アーティストシーンのプロパティ
export interface ArtistSceneProps extends SceneProps {
  artistName: string;
  songTitle: string;
  layout: LayoutType;
  theme: ThemeType;
  primaryColor: string;
  secondaryColor: string;
}

// ビジュアルエフェクトのプロパティ
export interface VisualEffectSceneProps extends SceneProps {
  effectType: EffectType;
  colorScheme: string[];
  intensity: number;
}

// 画像スライドシーンのプロパティ
export interface ImageSlideSceneProps extends SceneProps {
  imageSrc: string;
  transitionType: TransitionType;
  blur?: number;
  scale?: number;
}

// ビデオオーバーレイシーンのプロパティ
export interface VideoOverlaySceneProps extends SceneProps {
  videoSrc: string;
  opacity?: number;
  blendMode?: string;
}

// トランジション設定
export interface TransitionConfig {
  type: TransitionType;
  duration: number;
}

// MVテンプレート設定
export interface MVTemplate {
  name: string;
  description: string;
  scenes: Array<{
    type: string;
    props: SceneProps;
    transition?: TransitionConfig;
  }>;
  audioFile: string;
  fps: number;
  width: number;
  height: number;
}

// カラースキーム
export interface ColorScheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

// シーンタイプ
export type SceneType = 'artist' | 'lyrics' | 'visualEffect' | 'none';

// プリセット設定可能なシーン
export interface PresetSceneConfig {
  type: SceneType;
  from: number;
  durationInFrames: number;
  // Artist Scene設定
  artistName?: string;
  songTitle?: string;
  layout?: LayoutType;
  theme?: ThemeType;
  primaryColor?: string;
  secondaryColor?: string;
  // Lyrics Scene設定
  lyrics?: string;
  fontSize?: number;
  fontFamily?: string;
  textColor?: string;
  backgroundColor?: string;
  animationType?: AnimationType;
  position?: LayoutType;
  // Visual Effect Scene設定
  effectType?: EffectType;
  colorScheme?: string[];
  intensity?: number;
}
