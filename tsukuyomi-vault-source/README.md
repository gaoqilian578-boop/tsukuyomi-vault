# 月読｜夜の保管庫

LINE登録者限定の特典サイトです。合言葉認証後、彼の本音、復縁と執着、四柱推命、タロットと夜ワークに関する40個の特典を閲覧できます。

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
```

## Vercel公開手順

1. GitHubリポジトリをVercelにImportします。
2. Framework Presetは `Vite` を選択します。
3. Build Commandは `npm run build`、Output Directoryは `dist` にします。
4. Deployを実行します。

`vercel.json` でSPA用のリライトを設定しているため、`/bonus/1` のような詳細URLへ直接アクセスしても表示できます。
