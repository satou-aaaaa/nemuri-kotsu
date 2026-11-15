# AGENTS.md

眠りのコツ：だれかの夜や朝の過ごし方を2つ比べ、よく眠れるほう（ときどき、よくないほう）を選ぶ1日5問の学習ゲーム。正解したら「何のためのコツ？」（朝と昼・寝る前・寝床と昼寝・眠る時間）も選ぶ。`index.html` と `data.js`（問題の種類）を GitHub Pages で公開する。

## 準備（最初に一度）

```bash
bash scripts/setup.sh   # Node.js（版は .nvmrc）を確かめ、検査の依存とブラウザを入れる。何度実行してもよい
```

Claude Code のクラウドセッションでは `.claude/settings.json` のフックが自動で実行する。

## push する前の確認

```bash
node qa/run.mjs   # 問題（15種類×3000問：選び肢2つ・答えは1つ・よいほうと分け方が資料の表どおり・問いの向き・出典）・今日の5問と上級（3年分）・とことん・通しで遊ぶ・続きから・2段目・復習・幅320px・PWA・引き継ぎ・見やすさ（CI の QA と同じ）
```

## このリポジトリの決まり

- 中身は厚生労働省「健康づくりのための睡眠ガイド 2023」本文（<https://www.mhlw.go.jp/content/001305530.pdf>、印刷ページ p.8〜21）で確かめたことだけ（2026-11-15 に読んだ。要点は共有フォルダ `games/nemuri-research.md`）。参考情報（p.22〜43）は読めなかったので、入浴の時刻・寝室の温度湿度・カフェインの量や何時間前・ブルーライトの数字は出さない（QA が見る）。種類を足すときも資料を読み、`src` に出典のページを付け、`qa/run.mjs` の `TB`（別に書いた資料の表）にも足す。
- 医療の助言にしない：遊び方と「このゲームについて」と README に、医療の助言・公式の情報の代わりではないこと、眠れない日が長く続くときは医師に相談することを置く（QA が見る）。「必ず眠れる」「治る」と言い切らない。
- 人はすべて架空で、年や立場（小学生・会社員・70代の人など）だけで書き、性別を決めない。こども版にしかない数字（9〜12時間・60分・2時間など）は子どもの場面だけ、床上時間の8時間は高齢の人の場面だけに使う。
- 問題はどれも2つの選び肢。ふつう・むずかしいでは4回に1回「よくないのはどっち？」と逆に聞く（`P.rev`）。2段目は「何のためのコツ？」（4つ）で、種類（`grp`）で決まる。選び肢が2つなので、2回目のヒントは選び肢を消さず、資料の言葉（`key`）を見せる。
- 今日の5問（やさしい2・ふつう2・むずかしい1、種類は重ねない）・上級（むずかしい3、今日のむずかしいと別）は日本時間の日付の種で決まり、だれでも同じ。`Math.random()` は練習・とことんの種だけ。乱数は `sort` の比較の中で引かない。`KINDS`・言い回しの並びは最後に足すだけ（QA の `PIN` が第1回の1問目を見る）。`data.js` を変える PR は自動ではマージされない（`hold_paths`）。
- ★はまちがい＋ヒントの数（0で★3・1で★2・2以上で★1）。上級はヒントなし。時間制限なし。
- 好きなだけ遊べる：チケット・ライフ・回数制限・🔒で開くモードを入れない（shared-workflows `routines/game-dev.md` F1〜F7。QA が見る）。とことん（`runs.e`）はまちがえても続き、「ここで降りる」で終わる。
- 1問を深くする：`depth.js` と `qa/depth-check.mjs` は shared-workflows `template/` の写しで、ここでは直さない。自信あり・2段目「何のためのコツ？」・復習（1→3→7日後）。記録 `nmk-v1`・文字 `nmk-fs`・復習 `nmk-depth`。
- 共有は遊ぶ人が押したときに開くリンクだけ。シェアの文に問題・答えを出さない。感想は Issue フォーム（`.github/ISSUE_TEMPLATE/feedback.yml`）を開くだけ。応援は Ko-fi へのただのリンクだけ。
- 外へ通信しない（CSP の `connect-src 'self'` を広げない）。見やすさ（`<!-- a11y:begin -->`〜`end`・`qa/a11y.mjs`）と引き継ぎ（`transfer.js`・`qa/transfer-check.mjs`）は shared-workflows `template/` の写しで、ここでは直さない。
- 画面の土台は雲の名前あて（kumo-namae）から写した。写し元の言葉が残っていないかを QA が見る。
- PWA：画面のファイルを足したら `sw.js` の `SHELL` にも足し、中身を大きく変えたら `CACHE` の版を上げる。アイコンは `node tools/make-icons.cjs`、`og.png` は `node tools/make-og.cjs`。
- 公開リポジトリなので、個人情報・鍵を入れない。

## 公開

- GitHub Pages は `main` のルート（`/`）を公開する。PR の QA と Secret scan が ✅ になると `automerge.yml` が自動でマージする。止めたいときは下書きにするか、ラベル「自動マージしない」を付ける。
- `sw.js`・`manifest.webmanifest`・`data.js` を変える PR は自動ではマージされない（`hold_paths`）。CodeRabbit のレビューを読み、手でマージする直前に今の head へのレビューを読み直す。CodeRabbit は PR に `@coderabbitai review` とコメントして頼む。

## 共通のきまり

- PR の作り方・マージの仕方は satou-aaaaa/shared-workflows の `routines/pr.md`、全体のきまりは `routines/common.md` に従う。
- CI の部品は shared-workflows の共通部品を呼ぶ。リポジトリ側の .github/workflows には呼び出しと設定値だけを書く。
- Claude 以外の AI・人が作業するときは、shared-workflows の `routines/tool-map.md` と `routines/without-claude.md` を読む。
