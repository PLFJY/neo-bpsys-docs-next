// API 文档由 docfx 生成，作为静态文件部署在 /api/ 路径下。
// VuePress 的 AutoLink 对 "/" 开头的链接使用 router-link (SPA 导航)，
// 不会发起 HTTP 请求，无法访问到 docfx 的静态 HTML。
// 因此需要使用完整 URL，让 AutoLink 渲染为 <a> 标签进行整页跳转。
const isProd = process.env.NODE_ENV === "production";
const apiBaseUrl = isProd ? "https://docs.bpsys.plfjy.top" : "http://localhost:8080";

/** API 文档入口链接（完整 URL，触发整页跳转） */
export const apiLink = `${apiBaseUrl}/api/api/index.html`;
