# hack-2021-1-a

## 概要
極限まで頑張るあなたを「[つくよみちゃん](https://tyc.rei-yumesaki.net/)」が応援してくれる Chrome拡張機能


## 使い方
### ダウンロード
Release ページ から最新のリリースのビルド済み zip ファイルをダウンロードしてください。

### インストール
1. ビルド済み zip ファイルをダウンロードし展開する
2. Google Chrome 拡張機能ページ  ([chrome://extensions](chrome://extensions)) を開く
3. ページ右上の Developer mode トグルスイッチをオンにし、ページをリロードする
4. 「パッケージ化されていない拡張機能を読み込む」 から展開したフォルダを選択する
5. 拡張機能アイコン欄から拡張機能を起動する


## 開発
はじめに，VSCode拡張機能の[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)と[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)をインストールする

### 最初だけ
```sh
git clone https://github.com/ritscc/hack-2021-1-a.git
cd $_
```

### 作業前に毎回する
```sh
git pull
yarn install
```

### ビルド
1. `yarn build` を実行
2. `build/` を「パッケージ化されていない拡張機能を読み込む」 から読み込ませる


## クレジット
このソフトウェアでは、フリー素材キャラクター「つくよみちゃん」（© Rei Yumesaki）を使用しています。
詳しくは、同梱している「LICENSE.txt」をご覧ください。
