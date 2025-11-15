# 歌詞JSONファイル

このフォルダには歌詞データのJSONファイルを配置します。

## サンプルファイル

### demo-ballad.json
バラード風のゆったりとしたMVデモ
- 落ち着いた色合い（青、ベージュ系）
- simpleFade, fadeUp, fadeDown, elastic を使用
- ビネット効果とぼかしで雰囲気を演出

### demo-pop.json
ポップで元気なMVデモ
- カラフルな色使い（ピンク、黄色、水色、緑）
- bounceIn, slideLeft, slideRight, elastic, spring を使用
- 明るく彩度高めの設定

### demo-rock.json
ロック風の激しいMVデモ
- 赤系の強い色使い
- bounceIn, slideUp, elastic, spring を使用
- コントラスト高め、ビネット効果あり
- 大きめのフォントサイズ

### demo-vertical.json
縦書き表示のデモ
- 日本語の縦書き歌詞
- 桜をテーマにした優しい色合い
- 縦書きモード (`writingMode: "vertical"`) を使用

## JSONファイルの使い方

1. このフォルダにJSONファイルを配置
2. Remotion Studioで「LyricsMV-FromJSON」を選択
3. `jsonFile`プロパティでファイルパスを指定（例: `/lyrics/demo-pop.json`）
4. プレビューで確認

## JSONフォーマット

```json
{
  "title": "曲名",
  "artist": "アーティスト名",
  "background": {
    "imageSrc": "",
    "blur": 0,
    "brightness": 100,
    "contrast": 100,
    "saturation": 100,
    "vignette": false
  },
  "audioFile": "",
  "defaultFontSize": 52,
  "defaultColor": "#FFFFFF",
  "defaultFontFamily": "Arial, Hiragino Sans, sans-serif",
  "lyrics": [
    {
      "text": "歌詞テキスト",
      "startFrame": 0,
      "durationInFrames": 120,
      "effect": "simpleFade",
      "fontSize": 56,
      "color": "#FFFFFF",
      "position": "center",
      "writingMode": "horizontal"
    }
  ]
}
```

## エフェクト一覧

### フェード系
- `simpleFade` - シンプルなフェード
- `fadeUp` - 下から浮き上がる
- `fadeDown` - 上から降りてくる

### スライド系
- `slideLeft` - 右からスライド
- `slideRight` - 左からスライド
- `slideUp` - 下からスライド
- `slideDown` - 上からスライド

### バウンス系
- `bounceIn` - 弾むように登場
- `elastic` - 伸縮しながら登場
- `spring` - バネのような動き

## 位置

- `top` - 上部（縦書きの場合は右側）
- `center` - 中央
- `bottom` - 下部（縦書きの場合は左側）

## 表示モード

- `horizontal` - 横書き（デフォルト）
- `vertical` - 縦書き（日本語・中国語など）

## ヒント

- `startFrame`: フレーム番号（30fps × 秒数）
- `durationInFrames`: 表示時間（30fps × 秒数）
- 改行は `\n` で指定
- 色はHEX形式（`#FF6B9D`）で指定
