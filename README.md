# Next.js x Apollo Server x Apollo Client

## セットアップ
```
$ npm install
```

## ローカルで動かす
```
$ npm run dev
```

## 環境変数
- `env/.env.[name]` にパブリックなものは置く
- secret的なもの(=サーバーサイドでしか使ってはいけないもの)は実行環境に埋め込む
  - localだけ例外的に.env.localで管理
  - 好みに応じて.gitignoreに追加する
