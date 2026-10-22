import { sidebar } from "vuepress-theme-hope";

export const jaSidebar = sidebar({
  "/ja/user-guide/": [
    { text: "はじめに", icon: "book-open", link: "introduction" },
    { text: "クイックスタート", icon: "compass", link: "quick-start" },
    { text: "対戦情報と進行ガイド", icon:"signs-post", link: "game-info-and-guidance" },
    { text: "陣営と陣営切り替え", icon:"right-left", link: "camp-and-swap" },
    { text: "チーム情報の編集", icon:"users", link: "team-info" },
    { text: "カウントダウンタイマー", icon:"stopwatch", link: "countdown" },
    { text: "配信用ウィンドウ管理", icon:"window-maximize", link: "fronted-manager" },
    { text: "マップBAN/PICK", icon:"map", link: "map-bp" },
    { text: "キャラクターBAN", icon:"user-lock", link: "ban-character" },
    { text: "キャラクターPICK", icon:"user-check", link: "pick-character" },
    { text: "内在人格と補助特質", icon:"person-running", link: "talents-and-trait" },
    { text: "スコア管理", icon:"table", link: "score-system" },
    { text: "試合後の統計データ", icon:"list-ol", link: "match-statistics" },
    { text: "SmartBP（スマートBP）", icon:"robot", link: "smart-bp" },
    { text: "設定", icon:"gears", link: "settings" },
    {
      text: "詳細設定",
      icon: "screwdriver-wrench",
      children: [
        { text: "進行ガイドルールの編集", icon: "list-check", link: "advanced/edit-guidance-rule" },
        { text: "JSONファイルからチーム情報をインポート", icon: "file-import", link: "advanced/import-team-from-json" },
        { text: "v3配信画面デザイナー", icon: "pen-ruler", link: "advanced/v3-designer" },
        { text: "プラグインシステム", icon: "puzzle-piece", link: "advanced/plugin-system" },
      ],
    },
    { text: "よくある質問とトラブルシューティング", icon: "question", link: "faq" },
  ],
});
