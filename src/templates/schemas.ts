import { z } from 'zod';

// 歌詞エフェクトのEnum
const lyricsEffectSchema = z.enum([
  'simpleFade',
  'fadeUp',
  'fadeDown',
  'slideLeft',
  'slideRight',
  'slideUp',
  'slideDown',
  'bounceIn',
  'elastic',
  'spring',
  'typewriter',
  'glitchType',
  'randomType',
  'rgbShift',
  'glitch',
  'digitalGlitch',
  'rotate3D',
  'flip',
  'perspective',
  'particleBurst',
  'sparkle',
  'dissolve',
  'karaokeFill',
  'highlight',
  'waveColor',
]);

// 位置のEnum
const positionSchema = z.enum(['top', 'center', 'bottom']);

// 書き方向のEnum
const writingModeSchema = z.enum(['horizontal', 'vertical']);

// 歌詞行のスキーマ
const lyricsLineSchema = z.object({
  text: z.string(),
  startFrame: z.number().min(0),
  durationInFrames: z.number().min(1),
  effect: lyricsEffectSchema,
  fontSize: z.number().min(12).max(200).optional(),
  color: z.string().optional(),
  position: positionSchema.optional(),
  fontFamily: z.string().optional(),
  writingMode: writingModeSchema.optional(),
});

// 背景設定のスキーマ
const backgroundConfigSchema = z.object({
  imageSrc: z.string(),
  blur: z.number().min(0).max(50).optional(),
  brightness: z.number().min(0).max(200).optional(),
  contrast: z.number().min(0).max(200).optional(),
  saturation: z.number().min(0).max(200).optional(),
  vignette: z.boolean().optional(),
});

// LyricsMVのスキーマ
export const lyricsMVSchema = z.object({
  audioFile: z.string().optional(),
  background: backgroundConfigSchema,
  lyrics: z.array(lyricsLineSchema),
  defaultFontSize: z.number().min(12).max(200),
  defaultColor: z.string(),
  defaultFontFamily: z.string(),
});
