# MV Editor - 設計ドキュメント

## プロジェクト概要

Remotionを使用したMV（ミュージックビデオ）作成システム。プリセットをコードで用意し、Remotionの編集画面でユーザーがMVを編集できるようにする。

## 設計思想

- **コードベースのプリセット**: よく使われるMVパターンをReactコンポーネントとして実装
- **Remotion Studio**: ビジュアルエディターでパラメータ調整やプレビューを行う
- **再利用性**: プリセットを組み合わせて様々なMVを作成可能

## システムアーキテクチャ

### 1. プリセットシステム

#### 1.1 プリセットの種類

##### シーンプリセット
- **歌詞表示シーン**: 歌詞をアニメーション付きで表示
- **アーティスト表示シーン**: アーティスト名・曲名の表示
- **ビジュアルエフェクトシーン**: パーティクル、グラデーション、幾何学模様など
- **イメージスライドシーン**: 画像のフェード・スライド表示
- **ビデオオーバーレイシーン**: ビデオクリップに効果を適用

##### トランジション
- **フェード**: クロスフェード、フェードイン/アウト
- **スライド**: 左右上下のスライド
- **ワイプ**: 円形、矩形のワイプ効果
- **ズーム**: ズームイン/アウト

##### エフェクト
- **テキストエフェクト**: タイプライター、フェード、スライド、バウンス
- **カラーグレーディング**: フィルター、色調補正
- **オーディオビジュアライザー**: 波形、スペクトラム、パーティクル連動

### 2. プロジェクト構造

```
mv-editor/
├── docs/                       # ドキュメント
│   └── design.md              # 設計書
├── src/
│   ├── Root.tsx               # Remotionのルートコンポーネント
│   ├── Composition.tsx        # メインのコンポジション
│   ├── presets/               # プリセット集
│   │   ├── scenes/            # シーンプリセット
│   │   │   ├── LyricsScene.tsx
│   │   │   ├── ArtistScene.tsx
│   │   │   ├── VisualEffectScene.tsx
│   │   │   ├── ImageSlideScene.tsx
│   │   │   └── VideoOverlayScene.tsx
│   │   ├── transitions/       # トランジション
│   │   │   ├── Fade.tsx
│   │   │   ├── Slide.tsx
│   │   │   ├── Wipe.tsx
│   │   │   └── Zoom.tsx
│   │   ├── effects/           # エフェクト
│   │   │   ├── TextEffects.tsx
│   │   │   ├── ColorGrading.tsx
│   │   │   └── AudioVisualizer.tsx
│   │   └── templates/         # MVテンプレート
│   │       ├── PopMV.tsx
│   │       ├── RockMV.tsx
│   │       └── BalladMV.tsx
│   ├── components/            # 共通コンポーネント
│   │   ├── Text/
│   │   ├── Image/
│   │   └── Video/
│   ├── utils/                 # ユーティリティ
│   │   ├── audio.ts          # オーディオ解析
│   │   ├── timing.ts         # タイミング計算
│   │   └── animation.ts      # アニメーションヘルパー
│   └── types/                 # TypeScript型定義
│       └── index.ts
├── public/                    # 静的ファイル
│   ├── audio/                # 音楽ファイル
│   ├── images/               # 画像素材
│   └── videos/               # ビデオ素材
├── remotion.config.ts        # Remotion設定
└── package.json
```

### 3. データ構造

#### 3.1 プリセットの型定義

```typescript
// シーンの基本インターフェース
interface SceneProps {
  durationInFrames: number;
  fps: number;
  startFrom?: number;
}

// 歌詞シーンのプロパティ
interface LyricsSceneProps extends SceneProps {
  lyrics: string;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  animationType: 'fade' | 'slide' | 'typewriter' | 'bounce';
  position: 'top' | 'center' | 'bottom';
}

// アーティストシーンのプロパティ
interface ArtistSceneProps extends SceneProps {
  artistName: string;
  songTitle: string;
  layout: 'center' | 'split' | 'corner';
  theme: 'minimal' | 'bold' | 'elegant';
}

// ビジュアルエフェクトのプロパティ
interface VisualEffectSceneProps extends SceneProps {
  effectType: 'particles' | 'gradient' | 'geometric' | 'noise';
  colorScheme: string[];
  intensity: number;
}

// MVテンプレート設定
interface MVTemplate {
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
```

### 4. コンポーネント設計

#### 4.1 プリセットコンポーネントの実装方針

各プリセットは以下の原則に従う:

1. **Props駆動**: すべてのパラメータをPropsで受け取る
2. **Remotion Studio対応**: `defaultProps`を設定し、エディターで編集可能にする
3. **フレーム計算**: `useCurrentFrame()`と`useVideoConfig()`を使用
4. **レスポンシブ**: 解像度に応じて適切にスケーリング
5. **パフォーマンス**: 重い処理は`useMemo`で最適化

#### 4.2 プリセットの使用例

```typescript
// LyricsScene.tsx
export const LyricsScene: React.FC<LyricsSceneProps> = ({
  lyrics,
  fontSize,
  color,
  animationType,
  // ...
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // アニメーション計算
  const opacity = interpolate(
    frame,
    [0, 30, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0]
  );

  return (
    <AbsoluteFill style={{ opacity }}>
      {/* 歌詞の表示 */}
    </AbsoluteFill>
  );
};

LyricsScene.defaultProps = {
  lyrics: 'Sample lyrics',
  fontSize: 48,
  color: '#FFFFFF',
  animationType: 'fade',
  // ...
};
```

### 5. ワークフロー

#### 5.1 MV作成の流れ

1. **テンプレート選択**: プリセットのMVテンプレートを選択
2. **素材の配置**: 音楽ファイル、画像、動画をpublicフォルダに配置
3. **Remotion Studio起動**: `npm run start`でエディターを開く
4. **パラメータ調整**: 各シーンのプロパティをGUIで編集
5. **プレビュー**: リアルタイムでプレビューを確認
6. **レンダリング**: `npm run build`で動画を出力

#### 5.2 カスタマイズポイント

Remotion Studioで以下を調整可能:

- **タイミング**: 各シーンの開始時刻と長さ
- **テキスト**: 歌詞、アーティスト名、曲名
- **色**: 背景色、テキスト色、グラデーション
- **エフェクト**: アニメーションタイプ、強度
- **レイアウト**: 位置、サイズ、配置

### 6. 技術スタック

#### 6.1 コア技術

- **Remotion**: ビデオ作成フレームワーク
- **React**: UIコンポーネント
- **TypeScript**: 型安全な開発
- **CSS-in-JS**: スタイリング（Remotion推奨）

#### 6.2 追加ライブラリ（候補）

- **@remotion/media-utils**: オーディオ解析
- **@remotion/shapes**: 図形描画
- **@remotion/transitions**: トランジション
- **@remotion/paths**: SVGパスアニメーション
- **framer-motion**: 高度なアニメーション（Remotion互換）

### 7. 実装の優先順位

#### Phase 1: 基本セットアップ
- [ ] Remotionプロジェクトの初期化
- [ ] 基本的なプロジェクト構造の作成
- [ ] TypeScript型定義の作成

#### Phase 2: コアプリセット実装
- [ ] 歌詞表示シーン
- [ ] アーティスト表示シーン
- [ ] 基本的なトランジション（フェード、スライド）
- [ ] シンプルなMVテンプレート

#### Phase 3: エフェクト拡張
- [ ] テキストエフェクトの追加
- [ ] ビジュアルエフェクト（パーティクル、グラデーション）
- [ ] オーディオビジュアライザー

#### Phase 4: テンプレート拡充
- [ ] 複数のMVテンプレート作成（Pop, Rock, Ballad等）
- [ ] テンプレートのドキュメント作成
- [ ] サンプルMVの作成

### 8. 設定ファイル

#### 8.1 remotion.config.ts

```typescript
import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(8);
Config.setPort(3000);
```

#### 8.2 推奨プロジェクト設定

- **FPS**: 30 or 60（滑らかさと処理速度のバランス）
- **解像度**: 1920x1080 (Full HD) or 3840x2160 (4K)
- **コーデック**: h264（互換性）or h265（高品質）

### 9. ベストプラクティス

1. **パフォーマンス**: 重い計算は`useMemo`でメモ化
2. **再利用性**: 小さなコンポーネントに分割
3. **型安全**: すべてのPropsに型を定義
4. **ドキュメント**: 各プリセットの使い方を明記
5. **テスト**: サンプルデータでの動作確認

### 10. 拡張可能性

将来的な拡張案:

- **プラグインシステム**: カスタムプリセットの追加
- **AI統合**: 歌詞やビートに合わせた自動シーン生成
- **クラウド連携**: オンラインでの編集・レンダリング
- **テンプレートマーケット**: コミュニティ作成のプリセット共有

## 参考リンク

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [Remotion Templates](https://www.remotion.dev/templates)
