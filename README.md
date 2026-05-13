# mywebtools

## 概要

ブラウザで使える React.js 製ユーティリティツールを置いた静的サイト。

## 目的

このプロジェクトの目的。

- 私が自分でユーティリティとして使う
- 私のフロントエンドスキルを向上させる

## 公開URL

TODO: Vercel デプロイ後に追記

## 技術スタック

| 分類 | 項目 | 技術 |
|---|---|---|
| コア | UI | React + TypeScript |
| コア | ビルド | Vite |
| コア | スタイリング | Tailwind CSS |
| コア | UIコンポーネント | shadcn/ui |
| コア | ルーティング | React Router |
| 開発環境 | リンター・フォーマッター | Biome |
| 開発環境 | Node.js 管理 | mise |
| 開発環境 | パッケージマネージャー | npm |
| インフラ | デプロイ | Vercel |

## 開発環境構築

前提：[mise](https://mise.jdx.dev/) を利用できること

```bash
# リポジトリをクローン
git clone git@github.com:rnazmo/mywebtools.git
cd mywebtools

# Node.js のインストール（mise を使用）
mise install

# 依存パッケージのインストール
npm install

# 開発サーバーの起動
npm run dev
```

## 規約

### 規約の強さ

RFC 2119 を参考にした仕様や要件の強さ。

- **MUST**: 必須
- **SHOULD**: 原則として守るべきだが、理由があれば例外を許す
- **MAY**: 任意
- **MUST NOT** / **SHOULD NOT**: それぞれ「絶対禁止」「原則禁止」

### コード

- Biome に従う (SHOULD)
- TODO: Biome のどのルールを適用する、などの詳細もメモしておく？

### コミットメッセージ

- [Conventional Commits](https://www.conventionalcommits.org/) に準拠する (SHOULD)
    - 個人開発のため厳密でなくてよい。
- 言語は英語 (MUST)
- 接頭辞の例：
    - feat: add stopwatch tool
    - fix: fix timer reset bug
    - chore: setup biome
    - docs: update README
    - refactor: simplify stopwatch component

### ブランチ戦略

- `main` ブランチに直接コミットせず、作業ブランチを切って開発する (SHOULD)
- 接頭辞：
    - feature/add-timer-tool   # 新機能追加
    - fix/stopwatch-bug        # バグ修正
    - chore/setup-biome        # 環境構築・設定変更
    - docs/update-readme       # ドキュメント更新
    - refactor/stopwatch       # リファクタリング

### Issues / Pull requests (GitHub)

TODO: Issues などの機能を使うのかどうか。使うとしたらどう使うのか。規約はどうするのか

### ADR

- 新しいADRをファイルの先頭に追加していく（降順）(MUST)
    - 私が管理・編集しやすくするため
