# MV Editor

Remotionを使用したMV（ミュージックビデオ）作成システムです。プリセットをコードで用意し、Remotion Studioの編集画面でMVを編集できます。

## 特徴

- プリセットベースのMV作成
- Remotion Studioでのビジュアル編集
- リアルタイムプレビュー
- カスタマイズ可能なシーン・トランジション・エフェクト

## プリセット

### シーン
- **LyricsScene**: 歌詞表示シーン（フェード、スライド、タイプライター、バウンスアニメーション対応）
- **ArtistScene**: アーティスト名・曲名表示シーン（3種類のテーマ、3種類のレイアウト）
- **VisualEffectScene**: ビジュアルエフェクト（グラデーション、パーティクル、幾何学模様、ノイズ）

### テンプレート
- **SimpleMV**: シンプルなMVテンプレート（約30秒）

## プロジェクト構造

```
mv-editor/
├── src/
│   ├── Root.tsx                    # Remotionルートコンポーネント
│   ├── index.ts                    # エントリーポイント
│   ├── presets/
│   │   ├── scenes/                 # シーンプリセット
│   │   │   ├── LyricsScene.tsx
│   │   │   ├── ArtistScene.tsx
│   │   │   └── VisualEffectScene.tsx
│   │   ├── transitions/            # トランジション
│   │   │   └── Fade.tsx
│   │   └── templates/              # MVテンプレート
│   │       └── SimpleMV.tsx
│   └── types/                      # TypeScript型定義
│       └── index.ts
├── public/
│   ├── audio/                      # 音楽ファイル配置場所
│   ├── images/                     # 画像素材配置場所
│   └── videos/                     # ビデオ素材配置場所
├── docs/
│   └── design.md                   # 設計ドキュメント
├── remotion.config.ts              # Remotion設定
└── package.json
```

## セットアップ

### 必要要件

- Node.js 18以上
- npm または yarn

### インストール

依存関係は既にインストール済みです。

## 使い方

### 1. 音楽ファイルの準備

`public/audio/` ディレクトリに音楽ファイルを配置します。

```bash
# 例
cp your-song.mp3 public/audio/sample.mp3
```

### 2. Remotion Studioの起動

```bash
npm start
```

このコマンドでRemotion Studioが起動し、ブラウザで `http://localhost:3000` が開きます。

### 3. MV編集

Remotion Studioで以下の編集が可能です：

- **アーティスト名・曲名の変更**: 左側のパネルで編集
- **シーンの調整**: 各シーンの長さ、色、フォント、アニメーションタイプを変更
- **リアルタイムプレビュー**: 変更が即座に反映されます
- **タイムライン操作**: 再生・一時停止・シーク

### 4. MVのレンダリング

編集が完了したら、動画ファイルとして出力します：

```bash
npm run build
```

デフォルトでは `out/SimpleMV.mp4` に出力されます。

### 5. 停止方法

Remotion Studioを停止するには、ターミナルで `Ctrl + C` を押します。

## カスタマイズ

### テンプレートの編集

`src/presets/templates/SimpleMV.tsx` を編集して、シーンの順序や内容をカスタマイズできます：

```typescript
// 例: 歌詞を変更
<LyricsScene
  lyrics="あなたの歌詞をここに"
  fontSize={56}
  color="#FFFFFF"
  animationType="fade"
  position="center"
  durationInFrames={120}
/>
```

### 新しいテンプレートの追加

1. `src/presets/templates/` に新しいファイルを作成
2. `src/Root.tsx` で新しいCompositionを登録

```typescript
<Composition
  id="YourMV"
  component={YourMV}
  durationInFrames={900}
  fps={30}
  width={1920}
  height={1080}
/>
```

### プロパティ一覧

#### LyricsScene
- `lyrics`: 歌詞テキスト
- `fontSize`: フォントサイズ（デフォルト: 48）
- `color`: テキスト色（デフォルト: #FFFFFF）
- `backgroundColor`: 背景色（デフォルト: #1a1a1a）
- `animationType`: アニメーション（fade/slide/typewriter/bounce）
- `position`: 位置（top/center/bottom）

#### ArtistScene
- `artistName`: アーティスト名
- `songTitle`: 曲名
- `layout`: レイアウト（center/split/corner）
- `theme`: テーマ（minimal/bold/elegant）
- `primaryColor`: メインカラー
- `secondaryColor`: サブカラー

#### VisualEffectScene
- `effectType`: エフェクトタイプ（gradient/particles/geometric/noise）
- `colorScheme`: カラースキーム（配列）
- `intensity`: 強度（0.0-2.0）

## トラブルシューティング

### ポートが既に使用されている

```bash
# 別のポートで起動
npx remotion studio --port 3001
```

### 音楽ファイルが再生されない

- ファイルパスが正しいか確認してください
- 対応フォーマット: MP3, WAV, AAC

### レンダリングが遅い

- 解像度を下げる（1920x1080 → 1280x720）
- FPSを下げる（60 → 30）
- `remotion.config.ts` で `Config.setConcurrency()` を調整

## 参考リンク

- [Remotion Documentation](https://www.remotion.dev/docs/)
- [設計ドキュメント](docs/design.md)

## ライセンス

ISC
