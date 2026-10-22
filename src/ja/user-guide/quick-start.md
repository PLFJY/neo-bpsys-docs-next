# クイックスタート

## インストール

### システム要件の確認

使用を始める前に、以下の推奨要件を確認してください。

- Windows 10 20H2 以降。
- 推奨構成：i5 13400F + RTX 3060 + 16GBメモリー。最低構成：i5 8300H + GTX 1060 + 8GBメモリー。*
- [.NET 10.0 デスクトップランタイム](https://dotnet.microsoft.com/zh-cn/download/dotnet/10.0)がインストール済みであること（通常はインストーラーが自動で処理します）。

> *内蔵GPUでも動作しますが、配信操作での使用は推奨しません。<br>
> *macOSでも理論上はWineで起動できますが、ウィンドウ管理の都合上、配信操作には推奨しません。

---

### ソフトウェアのダウンロード

以下の場所からダウンロードできます。

公式（随時更新）：

- [公式ダウンロードセンター](/ja/#download-center)
- [GitHub Releases](https://github.com/PLFJY/neo-bpsys-wpf/releases)

第三者による配布（コミュニティによる管理のため、**最新版とは限りません**）：

- [Lanzou Cloud](https://wwsm.lanzouo.com/b009hclqvi)（ログイン不要、パスワード：零风NB）
- [Baidu Netdisk](https://pan.baidu.com/s/5_8kzq0n-09o6T1LreZHisg)
- [Aliyun Drive](https://www.alipan.com/s/t8SByXpso8o)（アクセスコード：86em）

## 基本操作

初めて使用する場合は、以下の手順に沿って操作してください。

### 0. 画面構成を知る

![画面の全体像](../../user-guide/images/QuickStart-UiOverview.webp)

画面は次の2つの領域に分かれています。

① クイック操作領域：対戦設定、ゲーム切り替え、対戦進行ガイドなど、ゲーム全体に関わる操作を行います。<br>
② 操作領域：チーム情報、マップBAN/PICK、キャラクターBAN/PICK、スコア操作、試合後の統計データ、配信用ウィンドウ管理など、配信画面の詳細を操作します。

### 1. 両チームの情報を設定する

ソフトウェアを開き、左側の【チーム情報】を選択します。基本情報を入力したら、出場する全選手を【出場に設定】します。

![チーム情報ページ](../../user-guide/images/TeamInfo-TeamInfoPage.webp)

ページ下部に現在の出場選手が表示されます。サバイバー側の選手名の後ろにある数字をクリックすると、位置を変更できます。

![出場選手の順番を変更](../../user-guide/images/TeamInfo-ReorderActivePlayers.webp)

情報をすばやく読み込む方法は、[JSONファイルからチーム情報をインポート](advanced/import-team-from-json.md)を参照してください。

---

### 2. 大会形式を設定する

ソフトウェアのウィンドウでBO5またはBO3を選択します。**この設定は[対戦進行ガイド](game-info-and-guidance.md)やスコア計算などに影響するため、実際の形式に合わせてください。**

![大会形式の設定](../../user-guide/images/QuickStart-SetCompetitionRule.webp)

---

### 3. 配信用ウィンドウを開く

左側のナビゲーションで[配信用ウィンドウ管理](fronted-manager.md)を選択すると、各配信画面を開いたり閉じたりできます。通常はすべて開き、[OBS](https://obsproject.com/download)、Bilibiliの配信ソフト、Douyin Live Companionなどで表示・非表示を管理することをお勧めします。

![配信用ウィンドウ管理ページ](../../user-guide/images/QuickStart-FrontendManagerPage.webp)

---

### 4. 対戦進行ガイドを開始する

本ソフトウェアの対戦進行ガイドは、公式大会のBPルールに基づいています。第1ゲーム前半戦など、現在の対戦進行状況を選択して【対戦進行ガイドを開始】をクリックします。その後は【次のステップ】でルールに沿って操作します。【前のステップ】や【対戦進行ガイドを終了】も使用できます。

![大会形式と対戦進行ガイドの設定領域|500](../../user-guide/images/GameInfoAndGuidance-MatchGuidanceNotStarted.webp)

ガイドに従ってBPを進めてください。各ステップの詳細は以下を参照してください。

- [マップBAN/PICK](map-bp.md)
- [キャラクターBAN](ban-character.md)
- [キャラクターPICK](pick-character.md)
- [内在人格と補助特質](talents-and-trait.md)

---

### 5. 試合後の統計データを入力する

【試合後データ表示ウィンドウ】には、現在のゲームの両陣営のデータを表示できます。試合後の統計データページに各選手のデータを入力すると、ウィンドウに反映されます。

![試合後の統計データページ](../../user-guide/images/QuickStart-MatchStatisticsPage.webp)

---

### 6. スコアを操作する

対戦終了後、[スコア管理](score-system.md)ページでスコアを入力・計算すると、【スコア表示ウィンドウ】に同期されます。

![スコア操作ページ](../../user-guide/images/ScoreSystem-ScorePage.webp)

上部で対戦進行状況を選択し、スコア操作欄でゲーム結果を選びます。すべての配信画面のスコアコントロールが、記録された進行状況に基づいて自動表示されます。

フリーモードでは動作が異なります。詳細は[スコア管理](score-system.md)を参照してください。

加点は公式大会と同じ方式です。

| **ゲーム結果** | **サバイバーチームの加点** | **ハンターチームの加点** |
| --- | --- | --- |
| 4人脱落 | 0 | 5 |
| 3人脱落 | 1 | 3 |
| 引き分け | 2 | 2 |
| 3人脱出 | 3 | 1 |
| 4人脱出 | 5 | 0 |

---

### 7. ゲームを終了する

ゲーム終了後に【次のゲーム（リセット）】をクリックすると、現在のBP情報が消去されます。マップBP、グローバルBAN履歴、スコアなど、ゲームをまたいで使用する情報は保持されます。
