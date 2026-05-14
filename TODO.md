# TODO (mywebtools)

## Milestone: v0.0.1 - 基盤構築・スケルトン完成

### 序盤のタスク

以下のタスクは、上から順に依存関係がある。基本的に上から順に実施すること。

- [x] mise 設定（`.mise.toml` に Node.js バージョンを記載）
- [x] Vite で新規プロジェクト作成（React + TypeScript テンプレート）
  - `npm create vite@latest . -- --template react-ts` を実行する
  - テンプレートから生成された不要ファイル・コードを削除する
    - `src/assets/` 配下の不要ファイル
    - `src/App.css` の中身
    - `src/App.tsx` のテンプレートコード（骨格だけ残す）
    - `public/vite.svg`、`src/assets/react.svg` など
- [x] `.editorconfig` を追加する
- [x] Biome の導入・設定
  - ADR-006 参照
  - 早い段階で導入することで、以降のコードを一貫したスタイルで記述できる
  - `npm install --save-dev --save-exact @biomejs/biome`
  - `npx @biomejs/biome init` で `biome.json` を生成する
  - `package.json` の `scripts` にフォーマット・リントのコマンドを追加する
- [x] shadcn/ui の導入
  - **Ref: [Vite - shadcn／ui](https://ui.shadcn.com/docs/installation/vite#existing-vite-project)**
  - 大まかな手順：
    - Tailwind CSS のインストール
    - 関連ファイルの設定
    - shadcn/ui のインストール
    - shadcn/ui のコンポーネントの追加
- [ ] React Router の導入・設定
  - `npm install react-router-dom`
  - 参考: <https://reactrouter.com/en/main/start/tutorial>
- [ ] レイアウトコンポーネントの作成（`src/components/layout.tsx`）
  - サイドバー + ヘッダー構成
  - React Router の `<Outlet />` を使ってネストルーティングに対応させる
- [ ] ホーム画面の作成（`src/components/home.tsx`）
  - ツール一覧をカードで並べるレイアウト
  - 各カードにはツール名とリンクを置く（この時点ではリンク先はまだ空でよい）
- [ ] Vercel へのデプロイ設定
  - GitHub リポジトリと Vercel を連携させる
  - デプロイ完了後、`README.md` の公開URL欄を更新すること

### セキュリティ・バグ修正

無し。

### コード・機能

無し。

### テスト・CI

無し。

### ドキュメント

- [x] `TODO.md` の追加（雛形のみ）
- [x] `ADR.md` の追加（雛形のみ）
- [x] `TODO.md` に序盤のタスクを書く（叩き台で良い）
- [ ] `README.md` に基本的な項目を記述する
  - まずどんなセクションを作るか決める → 各セクションを埋める
- [ ] `README.md` に「このプロジェクトについて」というセクションを追加する
  - [ ] その中には「（このプロジェクトの）目的」「（このプロジェクトの）ポリシー」などのセクションを作る
  - [ ] 「（このプロジェクトの）目的」「（このプロジェクトの）ポリシー」を制定する
- [ ] `README.md` の公開URL欄を更新（Vercel デプロイ後に実施）
- [ ] `README.md` にブランチ戦略について記述する
- [ ] `README.md` に Conventions について記述する（Git コミットメッセージの規約など）
- [ ] `ADR.md` に序盤の技術選定に関する意思決定を書く
  - Biome 採用の判断
  - Vercel 採用の判断
  - Tailwind CSS 採用の判断
  - shadcn/ui 採用の判断
  - その他、判断が必要になったものは随時追加

### プロジェクト管理

- [x] GitHub リポジトリ作成（mywebtools）
- [ ] License を追加する（→ ADR #4 参照。ライセンス選定が未定なら先に ADR #4 を書くこと）

---

## Milestone: v0.0.2 - ツール移植

前身の `my-web-tools` からツールを移植・改善する。

> **注意（移植時に必ず直すこと）**
> `my-web-tools` の `home.tsx` に、`"Random Strong Generator"` という誤字あり（正: `"Random String Generator"`）

### セキュリティ・バグ修正

無し。

### コード・機能

各ツールのサブタスクは共通して以下の構成とする。

- [ ] ツール「Stopwatch」の移植
  - [ ] コンポーネント実装（`src/components/stopwatch.tsx`）
  - [ ] ホーム画面へのリンク追加
  - [ ] 動作確認（主要ブラウザで手動確認）
- [ ] ツール「Timer」の移植
  - [ ] コンポーネント実装（`src/components/timer.tsx`）
  - [ ] ホーム画面へのリンク追加
  - [ ] 動作確認
- [ ] ツール「Pomodoro Timer」の移植
  - [ ] コンポーネント実装（`src/components/pomodoro.tsx`）
  - [ ] ホーム画面へのリンク追加
  - [ ] 動作確認
- [ ] ツール「UUID v4 Generator」の移植
  - [ ] コンポーネント実装（`src/components/uuid-v4.tsx`）
  - [ ] ホーム画面へのリンク追加
  - [ ] 動作確認
- [ ] ツール「Random String Generator」の移植
  - [ ] コンポーネント実装（`src/components/random-string.tsx`）
  - [ ] ホーム画面へのリンク追加
  - [ ] 動作確認

### テスト・CI

無し。

### ドキュメント

無し。

### プロジェクト管理

無し。

---

## Backlog（いつかやる・検討中）

優先度・着手時期は未定。着手が決まったら適切なマイルストーンに移動すること。

### コード・機能

- [ ] ツール拡充（アイデアは末尾のメモ参照）
- [ ] UI/UX 改善

### テスト・CI

- [ ] テストの導入を検討（Vitest + React Testing Library が有力候補）
  - 検討結果は ADR に記録すること

### ドキュメント

無し。

### プロジェクト管理

- [ ] カスタムドメインの取得を検討
- [ ] Cloudflare Pages の導入を検討
  - まずは別プロジェクトで試してから判断する

---

## 追加ツールのアイデアメモ（未着手・未確定）

アイデアが出たら随時追記。

### 🟢 比較的簡単

- 文字数カウンター — 文字数・単語数・行数をリアルタイム表示
- Base64 エンコーダー/デコーダー — テキストをBase64に変換
- カラーピッカー & 変換ツール — HEX / RGB / HSL の相互変換
- QRコードジェネレーター — テキスト入力 → QRコード表示

### 🟡 中くらい

- カレンダー
- IP アドレス計算
- JSONフォーマッター & バリデーター — JSON整形・エラー表示
- 単位変換ツール — 長さ・重さ・温度など複数カテゴリ
- カラーパレットジェネレーター — 1色から補色・類似色を自動生成
- 画像加工ツール（リサイズ・トリミング）— Canvas API を使用

### 🟡 難しそう

- 正規表現テスター — パターン入力 → マッチ箇所ハイライト
- タイピング練習ツール — WPM・精度を計測
- レスポンシブデザインチェッカー — 複数ビューポートサイズでプレビュー
- マークダウンプレビュアー — 左エディタ・右プレビューの2ペイン構成
- Markdownエディタ（localStorage保存付き）
- タスク管理（ToDoリスト）— CRUD操作の基本
- ブレインストーミングボード（付箋ツール）— ドラッグ可能な付箋
- ピクセルアートエディタ — グリッドにクリックで色を塗る
- モールス信号変換器 — テキスト変換 + Web Audio API で音を鳴らす
- ポモドーロ統計トラッカー — 既存ポモドーロタイマーにセッション記録・グラフ追加
- CSS Flexbox/Grid ビジュアライザー — プロパティを変更して即時プレビュー
