import { z } from 'zod';

// SimpleMV のスキーマ
export const simpleMVSchema = z.object({
  artistName: z.string(),
  songTitle: z.string(),
  audioFile: z.string().optional(),
});

// Scene設定のスキーマ
const sceneConfigSchema = z.object({
  type: z.enum(['artist', 'lyrics', 'visualEffect', 'none']),
  from: z.number().min(0),
  durationInFrames: z.number().min(1),
  // Artist Scene
  artistName: z.string().optional(),
  songTitle: z.string().optional(),
  layout: z.enum(['center', 'split', 'corner', 'top', 'bottom']).optional(),
  theme: z.enum(['minimal', 'bold', 'elegant']).optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  // Lyrics Scene
  lyrics: z.string().optional(),
  fontSize: z.number().min(12).max(200).optional(),
  fontFamily: z.string().optional(),
  textColor: z.string().optional(),
  backgroundColor: z.string().optional(),
  animationType: z.enum(['fade', 'slide', 'typewriter', 'bounce']).optional(),
  position: z.enum(['top', 'center', 'bottom']).optional(),
  // Visual Effect Scene
  effectType: z.enum(['particles', 'gradient', 'geometric', 'noise']).optional(),
  colorScheme: z.array(z.string()).optional(),
  intensity: z.number().min(0).max(3).optional(),
});

// CustomizableMV のスキーマ
export const customizableMVSchema = z.object({
  audioFile: z.string().optional(),
  scene1: sceneConfigSchema,
  scene2: sceneConfigSchema,
  scene3: sceneConfigSchema,
  scene4: sceneConfigSchema,
  scene5: sceneConfigSchema,
});
