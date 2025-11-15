import { z } from 'zod';

// JSONファイルから読み込むテンプレート用のスキーマ
export const lyricsMVFromJSONSchema = z.object({
  jsonFile: z.string(),
});
