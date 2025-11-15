# MV Editor - 設計ドキュメント v2

## プロジェクト概要

Remotionを使用した**一枚絵+歌詞MV**作成システム。背景に一枚の画像を配置し、歌に合わせて様々なエフェクト付きの歌詞を表示する。

## コンセプト

### ターゲット
- ボカロP、歌い手、アーティストなど、手軽にMVを作りたい人
- 動画編集スキルがなくても、プリセットから選ぶだけで高品質なMVを作成可能

### MV構成
1. **背景**: 一枚絵（イラスト、写真など）
2. **歌詞**: 曲に合わせてタイミングよく表示
3. **エフェクト**: 歌詞に多彩な視覚効果を適用

## 設計思想

- **シンプルな構成**: 背景画像 + 歌詞のみに特化
- **豊富な歌詞エフェクト**: 様々なアニメーションとギミックを用意
- **Remotion Studio編集**: GUIで歌詞タイミング、エフェクト、色などを調整
- **プリセットベース**: コードで歌詞エフェクトを実装、UIから選択・カスタマイズ

## システムアーキテクチャ

### 1. 歌詞エフェクトシステム

#### 1.1 基本エフェクト

**フェード系**
- **simpleFade**: シンプルなフェードイン/アウト
- **fadeUp**: 下から浮き上がりながらフェードイン
- **fadeDown**: 上から降りてきながらフェードイン

**スライド系**
- **slideLeft**: 左からスライドイン
- **slideRight**: 右からスライドイン
- **slideUp**: 下からスライドアップ
- **slideDown**: 上からスライドダウン

**バウンス系**
- **bounceIn**: 弾むようにフェードイン
- **elastic**: 伸縮しながら登場
- **spring**: バネのような動き

**タイプライター系**
- **typewriter**: 一文字ずつ表示
- **glitchType**: グリッチ効果付きタイプライター
- **randomType**: ランダムな順序で文字が表示

#### 1.2 特殊エフェクト

**グリッチ系**
- **rgbShift**: RGBずれエフェクト
- **glitch**: グリッチノイズ
- **digitalGlitch**: デジタルエラー風

**3D系**
- **rotate3D**: 3D回転
- **flip**: 反転アニメーション
- **perspective**: 遠近感のある動き

**パーティクル系**
- **particleBurst**: 文字が粒子になって現れる
- **sparkle**: キラキラエフェクト
- **dissolve**: 溶けるように消える

**カラオケ系**
- **karaokeFill**: 歌に合わせて色が変わる
- **highlight**: 単語ごとにハイライト
- **waveColor**: 波のように色が変化

#### 1.3 背景エフェクト

**ブラー**
- **gaussianBlur**: ガウスぼかし
- **motionBlur**: モーションブラー
- **radialBlur**: 放射状ブラー

**カラー調整**
- **brightness**: 明度調整
- **contrast**: コントラスト調整
- **saturation**: 彩度調整
- **hueShift**: 色相シフト

**オーバーレイ**
- **gradientOverlay**: グラデーションオーバーレイ
- **vignette**: ビネット効果
- **grain**: フィルムグレイン

### 2. プロジェクト構造

```
mv-editor/
├── docs/
│   └── design.md              # 設計書
├── src/
│   ├── Root.tsx               # Remotionルート
│   ├── index.ts               # エントリーポイント
│   ├── components/
│   │   ├── Background/        # 背景コンポーネント
│   │   │   └── ImageBackground.tsx
│   │   └── LyricsText/        # 歌詞テキストコンポーネント
│   │       ├── LyricsText.tsx
│   │       └── effects/       # 歌詞エフェクト
│   │           ├── FadeEffects.tsx
│   │           ├── SlideEffects.tsx
│   │           ├── BounceEffects.tsx
│   │           ├── TypewriterEffects.tsx
│   │           ├── GlitchEffects.tsx
│   │           ├── Transform3DEffects.tsx
│   │           ├── ParticleEffects.tsx
│   │           └── KaraokeEffects.tsx
│   ├── templates/
│   │   └── LyricsMV.tsx       # メインMVテンプレート
│   ├── utils/
│   │   ├── animations.ts      # アニメーション関数
│   │   └── easing.ts          # イージング関数
│   └── types/
│       └── index.ts           # 型定義
├── public/
│   ├── audio/                 # 音楽ファイル
│   └── images/                # 背景画像
├── remotion.config.ts
└── package.json
```

### 3. データ構造

#### 3.1 型定義

```typescript
// 歌詞エフェクトタイプ
type LyricsEffectType =
  | 'simpleFade' | 'fadeUp' | 'fadeDown'
  | 'slideLeft' | 'slideRight' | 'slideUp' | 'slideDown'
  | 'bounceIn' | 'elastic' | 'spring'
  | 'typewriter' | 'glitchType' | 'randomType'
  | 'rgbShift' | 'glitch' | 'digitalGlitch'
  | 'rotate3D' | 'flip' | 'perspective'
  | 'particleBurst' | 'sparkle' | 'dissolve'
  | 'karaokeFill' | 'highlight' | 'waveColor';

// 歌詞行の設定
interface LyricsLine {
  text: string;
  startFrame: number;
  durationInFrames: number;
  effect: LyricsEffectType;
  fontSize?: number;
  color?: string;
  position?: 'top' | 'center' | 'bottom';
  fontFamily?: string;
}

// 背景設定
interface BackgroundConfig {
  imageSrc: string;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  vignette?: boolean;
}

// MVテンプレートProps
interface LyricsMVProps {
  audioFile?: string;
  background: BackgroundConfig;
  lyrics: LyricsLine[];
  defaultFontSize: number;
  defaultColor: string;
  defaultFontFamily: string;
}
```

### 4. コンポーネント設計

#### 4.1 ImageBackground

背景画像を表示し、エフェクトを適用するコンポーネント

```typescript
interface ImageBackgroundProps {
  imageSrc: string;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  vignette?: boolean;
}
```

#### 4.2 LyricsText

歌詞テキストを表示し、エフェクトを適用するコンポーネント

```typescript
interface LyricsTextProps {
  text: string;
  effect: LyricsEffectType;
  fontSize: number;
  color: string;
  fontFamily: string;
  position: 'top' | 'center' | 'bottom';
  durationInFrames: number;
}
```

#### 4.3 LyricsMV

メインMVテンプレート。背景と複数の歌詞を管理

### 5. ワークフロー

#### 5.1 MV作成の流れ

1. **素材準備**
   - 背景画像を`public/images/`に配置
   - 音楽ファイルを`public/audio/`に配置

2. **Remotion Studio起動**
   ```bash
   npm start
   ```

3. **MVカスタマイズ**
   - 背景画像のパスを設定
   - 音楽ファイルのパスを設定
   - 歌詞を追加（テキスト、タイミング、エフェクト選択）
   - 各歌詞行のエフェクト、色、サイズを調整

4. **プレビュー**
   - Remotion Studioでリアルタイムプレビュー
   - タイムラインで歌詞のタイミングを微調整

5. **レンダリング**
   ```bash
   npm run build
   ```

#### 5.2 歌詞設定例

```typescript
lyrics: [
  {
    text: "最初のフレーズ",
    startFrame: 0,
    durationInFrames: 60,
    effect: "simpleFade",
    fontSize: 48,
    color: "#FFFFFF",
    position: "center"
  },
  {
    text: "次のフレーズ",
    startFrame: 60,
    durationInFrames: 90,
    effect: "slideUp",
    fontSize: 52,
    color: "#FF6B9D",
    position: "bottom"
  },
  // ...
]
```

### 6. 実装の優先順位

#### Phase 1: 基本実装
- [ ] 背景画像コンポーネント（ImageBackground）
- [ ] 基本的な歌詞表示コンポーネント（LyricsText）
- [ ] フェード系エフェクト（simpleFade, fadeUp, fadeDown）
- [ ] スライド系エフェクト（slideLeft, slideRight, slideUp, slideDown）
- [ ] メインMVテンプレート（LyricsMV）

#### Phase 2: エフェクト拡充
- [ ] バウンス系エフェクト（bounceIn, elastic, spring）
- [ ] タイプライター系エフェクト（typewriter, glitchType）
- [ ] 背景エフェクト（blur, brightness, contrast）

#### Phase 3: 高度なエフェクト
- [ ] グリッチ系エフェクト（rgbShift, glitch）
- [ ] 3D系エフェクト（rotate3D, flip）
- [ ] パーティクル系エフェクト（particleBurst, sparkle）
- [ ] カラオケ系エフェクト（karaokeFill, highlight）

#### Phase 4: UX改善
- [ ] 歌詞エディターUI
- [ ] プリセットテンプレート追加
- [ ] エフェクトプレビュー機能

### 7. 技術スタック

- **Remotion**: ビデオ作成フレームワーク
- **React 19**: UIコンポーネント
- **TypeScript**: 型安全な開発
- **Zod**: スキーマバリデーション
- **ESLint + Husky**: コード品質管理

### 8. 参考リンク

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Remotion Animations](https://www.remotion.dev/docs/animating)
- [Interpolation Guide](https://www.remotion.dev/docs/interpolate)
