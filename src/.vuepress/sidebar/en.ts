import { sidebar } from "vuepress-theme-hope";

export const enSidebar = sidebar({
  "/en/user-guide/": [
    { text: "Introduction", icon: "book-open", link: "introduction" },
    { text: "Quick Start", icon: "compass", link: "quick-start" },
    { text: "Game Information and Guided Workflow", icon:"signs-post", link: "game-info-and-guidance" },
    { text: "Factions and Side Switching", icon:"right-left", link: "camp-and-swap" },
    { text: "Team Information", icon:"users", link: "team-info" },
    { text: "Countdown Timer", icon:"stopwatch", link: "countdown" },
    { text: "Overlay Window Management", icon:"window-maximize", link: "fronted-manager" },
    { text: "Map Ban/Pick", icon:"map", link: "map-bp" },
    { text: "Ban Characters", icon:"user-lock", link: "ban-character" },
    { text: "Pick Characters", icon:"user-check", link: "pick-character" },
    { text: "Persona Talents and Traits", icon:"person-running", link: "talents-and-trait" },
    { text: "Score System", icon:"table", link: "score-system" },
    { text: "Post-game Statistics", icon:"list-ol", link: "match-statistics" },
    { text: "SmartBP", icon:"robot", link: "smart-bp" },
    { text: "Settings", icon:"gears", link: "settings" },
    {
      text: "Advanced Options",
      icon: "screwdriver-wrench",
      children: [
        { text: "Edit Guidance Rules", icon: "list-check", link: "advanced/edit-guidance-rule" },
        { text: "Import Team Information from JSON", icon: "file-import", link: "advanced/import-team-from-json" },
        { text: "v3 Overlay Designer", icon: "pen-ruler", link: "advanced/v3-designer" },
        { text: "Plugin System", icon: "puzzle-piece", link: "advanced/plugin-system" },
      ],
    },
    { text: "FAQ and Troubleshooting", icon: "question", link: "faq" },
  ],
});
