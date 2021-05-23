## PWA「新潟トイレマップ」
githubリポジトリ: https://github.com/masapon06/toilet-map
<br>アプリURL: http://sugano-dev.jamtest.tk

## 環境
### 開発環境
Node.js/React.js/create-react-app/SPARQL
### 本番環境
Node.js/React.js/AWS EC2/Route53/Nginx
### 開発期間と平均作業時間
開発期間：約1週間
<br>1日あたりの平均作業時間：約7時間

## アプリ概要
「ベビーカーや車椅子で外出したとき、トイレがない。」「使いたいのに目の前のトイレが混んでいる。」そんなとき、広いトイレを素早く探すことができるのが本アプリケーションです。スマホのホーム画面に追加してお使いください。

### 特徴
- 現在地近辺にあるベビーカーや車椅子で使用できるトイレを気軽に検索することができます。
- マップ画面からは目的地周辺にトイレが有るかどうか検索することが可能です
- マップ画面のピンをクリックすると描画されるトイレ名や、リスト画面のトイレ名をクリックするとマップアプリに遷移し、行き方がわかります
- トイレがない地域を赤色の円で確認することができます(実装予定)

## 制作背景
知り合いのベビーカーを使っている方が、でかけた先でベビーカーで使えるトイレがなくて困ったというエピソードを話しているのを聞きました。そこで調べてみると、ベビーカーの利用者は多機能トイレを普段つかっており、多機能トイレは数が少ない上車椅子利用者やオストメイトの方や、子連れの方など、様々な方が利用するため大変混雑しやすいという課題があることがわかりました。さらには、現行のアプリが使いにくいこともわかりました。そこで、多機能トイレのオープンデータをデータプラットフォームに登録し、開発したのが本アプリです。目的地周辺に多機能トイレがあるか・トイレが混雑していた場合に周囲に代替のトイレがあるかを簡単に検索することができます。

## デモ
- 目的地マップ画面
<img width="250" alt="purpose-site-map" src="https://user-images.githubusercontent.com/78773789/119251159-f9530200-bbdf-11eb-9a4e-015e8d09fa67.PNG">

- 目的地検索後画面
<img width="250" alt="purpose-site-search" src="https://user-images.githubusercontent.com/78773789/119251233-96ae3600-bbe0-11eb-81a2-e49418266e9e.PNG">

- 目的地リスト表示画面
<img width="250" alt="purpose-site-list" src="https://user-images.githubusercontent.com/78773789/119251257-ba717c00-bbe0-11eb-952b-c7c24867948e.PNG">

- 現在地近辺トイレ早見画面
<img width="250" alt="current-place" src="https://user-images.githubusercontent.com/78773789/119251293-ea208400-bbe0-11eb-826b-6618812db031.PNG">

- ファーストビュー画面
<img width="250" alt="about" src="https://user-images.githubusercontent.com/78773789/119251351-13411480-bbe1-11eb-8380-2185f07e85e7.PNG">
