import React, { useMemo } from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import type { ImageBackgroundProps } from '../../types';

export const ImageBackground: React.FC<ImageBackgroundProps> = ({
  imageSrc,
  blur = 0,
  brightness = 100,
  contrast = 100,
  saturation = 100,
  vignette = false,
}) => {
  const filterStyle = useMemo(() => {
    const filters: string[] = [];

    if (blur > 0) {
      filters.push(`blur(${blur}px)`);
    }
    if (brightness !== 100) {
      filters.push(`brightness(${brightness}%)`);
    }
    if (contrast !== 100) {
      filters.push(`contrast(${contrast}%)`);
    }
    if (saturation !== 100) {
      filters.push(`saturate(${saturation}%)`);
    }

    return filters.length > 0 ? filters.join(' ') : 'none';
  }, [blur, brightness, contrast, saturation]);

  // 画像がない場合はグラデーション背景
  const hasImage = imageSrc && imageSrc.trim() !== '';

  return (
    <AbsoluteFill>
      {hasImage ? (
        /* 背景画像 */
        <Img
          src={staticFile(imageSrc)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: filterStyle,
          }}
        />
      ) : (
        /* デフォルトのグラデーション背景 */
        <AbsoluteFill
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            filter: filterStyle,
          }}
        />
      )}

      {/* ビネットエフェクト */}
      {vignette && (
        <AbsoluteFill
          style={{
            background:
              'radial-gradient(circle, transparent 30%, rgba(0,0,0,0.5) 100%)',
            pointerEvents: 'none',
          }}
        />
      )}
    </AbsoluteFill>
  );
};
