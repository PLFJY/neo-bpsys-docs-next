# neo-bpsys-wpf 文档本地化：第五人格术语对照与 Codex 翻译规范

> **版本**：2026-10-22 | **基准仓库**：`PLFJY/neo-bpsys-docs-next`（`main`）  
> **源语言**：`zh-CN` | **目标语言**：`en-US`、`ja-JP`  
> **适用范围**：`src/user-guide/**/*.md`、站点导航与 UI 说明中的专业术语。  
> **文件性质**：给 AI 翻译器用的**项目术语规范**，不是声称所有软件 UI 都已经提供英语或日语对应资源。

## 0. Codex 使用说明（优先阅读）

在执行翻译前，请把本文件作为**最高优先级的项目术语表**载入上下文，然后按以下要求翻译中文文档。

1. **只翻译自然语言**：标题、段落、表格说明、图片 alt、frontmatter 可见文案和导航显示文本。保留 YAML keys、Vue/TS/JSON 结构、代码块、终端命令、API 名称、标识符、URL、文件名、GitHub Issue 编号、版本号、扩展名以及资源路径。
2. **遵循游戏专名**：角色、地图、监管者辅助特质使用本表给出的 `en-US`、`ja-JP` 值，**不得按中文字面直译**。例如：`先知 → Seer / 占い師`；`前锋 → Forward / オフェンス`；`宿伞之魂 → Wu Chang / 白黒無常`；`26号守卫 → Guard 26 / ガードNo.26`。
3. **游戏规则先于中文直觉**：`Match` 是整场 BO3/BO5 系列赛；`Game` 是含上下半场的一局；`Half` 是上/下半场。`Round` 只用于赛程轮次或文中确实指 round 的地方。不可把一局、一场、半场全部译成 `match`。
4. **Ban 和 Pick 保留电竞表达**：`BP`、`Ban/Pick`；日语正文优先 `BAN/PICK`，`グローバルBAN`。不要把 `BP` 翻译成血压，也不要将每个 `Ban` 翻译为永久封号。
5. **理解本项目的“前台/后台”**：这里的“前台”是 OBS 等直播软件捕获的**展示窗口**，英文建议 `broadcast overlay` / `overlay window`，日语 `配信画面` / `配信用ウィンドウ`；“后台”是给导播操作的**控制界面**（operator control panel），**不是**服务器 backend。
6. **禁止改动绑定字段**：包括 `MinorHalfScore`、`CurrentMinorScore`、`TotalMinorScore`、`CurrentGame.MatchScore.HalfByProgress[CurrentGame.GameProgress].SurMinorScore`、`{0} : {1}` 等；可以翻译其前后的解释，但字段、路径、占位符与大小写必须保持原样。
7. **链接保持可用**：按中文的同名文章结构在 `src/en/user-guide/`、`src/ja/user-guide/` 下创建译文。相对 Markdown 链接指向对应语言下已存在的同名文件；锚点应校验目标标题生成的 slug，必要时使用固定显式锚点；不要盲目复制中文锚点或错误地指回中文根站。
8. **不可机翻专有名称**：项目名 `neo-bpsys-wpf`、模块名 `SmartBP`、文件格式 `BPUI` / `.bpui`、`GameRule.json`、库名、技术和协议名称原样保留。
9. **界面名称以实际软件为准**：表中“软件·”类别为适合文档的**推荐译名**，并不代表已经核验主程序中的现成英文/日文资源。如果主程序本地化资源已有不同的确定译名，先核对、统一，再修改本表；不要默默在文档中制造第三种名称。
10. **文档里的吐槽、俚语**：不能直接机翻为海外用户不懂的双关、黑话或冒犯性措辞。保持原意、语气与信息密度；必要时改写为自然英语或日语，且不得更改技术事实。

### 翻译顺序建议

- 先处理 `src/.vuepress/sidebar/{en,ja}.ts`、`src/.vuepress/navbar/{en,ja}.ts` 的显示文本和路由，与中文页面结构对齐。
- 翻译 `src/user-guide/` 的 16 篇顶层指南，再翻译 `advanced/` 下 4 篇高级指南；最后校验首页 `README.md` 和站点 `config.ts` 的本地化信息。
- 特别检查 `smart-bp.md`、`score-system.md`、`advanced/v3-designer.md`、`advanced/plugin-system.md` 的技术字段、长段落和站内链接。
- 运行 `pnpm docs:build`，修复失效链接并检查所有语言导航；生成文件不能取代编译和真实页面检查。
- **不要**凭当前翻译任务修改游戏业务逻辑、分数计算、JSON schema 或 C# 代码。

## 1. 高频歧义与固定译法

| 中文 / 写法 | 英语固定处理 | 日语固定处理 | 关键区别 |
| --- | --- | --- | --- |
| 一场比赛 | Match | 試合 | 整个 BO3/BO5；不是一局 |
| 一局（含上下半场） | Game | ゲーム | 官方赛事规则定义的 Game |
| 上半场、下半场 | First half, Second half | 前半戦、後半戦 | 两个相反阵营的半场 |
| 回合 | Round（按上下文判断） | ラウンド（按上下文判断） | 不能无条件替代 Game |
| 当局禁用 | Current-game Ban | 当該ゲームのBAN | 当前局生效；区别 Global Ban |
| 全局禁选 | Global Ban | グローバルBAN | 队伍后续 BP 的禁选记录；依项目实际规则执行 |
| 前台窗口 | Broadcast overlay window | 配信用ウィンドウ | 软件输出窗口，不是前端技术栈 |
| 后台 | Operator interface | 操作画面 | 导播控制界面，不是网络服务器 |
| 天赋 | Persona talents | 内在人格 | 与监管者辅助特质 Trait 分开 |
| 监管者辅助特质 | Trait | 補助特質 | 不译为通用 Character Skill |
| 小比分 | Minor score | 小スコア | 软件自定义分数字段的用户可读名称 |
| 赛后数据 | Post-game Statistics | 試合後の統計データ | 软件读取的一场游戏结算统计 |
| 角色分配 | Character assignment | キャラクター割り当て | 不是重复 Pick 阶段 |
| 布局包 | Layout Package | レイアウトパッケージ | `.bpui` 数据包，不是插件包 |

**`MinorHalfScore` / `CurrentMinorScore` / `TotalMinorScore` 的区别：**

- `MinorHalfScore`：**当前回合累计小比分**。用于 BP 主界面与游戏内比分；`Current game cumulative minor score` / `現在のゲームの累計小スコア`。
- `CurrentMinorScore`：**当前半场小比分**。用于赛后数据和 BP 总览；`Current half minor score` / `現在のハーフの小スコア`。
- `TotalMinorScore`：**总小比分**。用于总小比分与全局比分；`Total minor score` / `小スコア合計`。
- 三者是**实际代码属性名**，任何语言都必须照原样拼写，不可取别名或互相替换。

### 来源冲突说明（不要机械套用一个 Wiki）

- `月亮河公园`：本表采用英文 Wiki 常见 `Moonlit River Park`；**官方英文公告也出现 `Moon River Park`**。若翻译正式赛事规则或引用某条官方公告，应遵守该具体来源，不要混改固定引文。
- `红教堂`：英文 Wiki 用 `The Red Church`，官方赛事公告可能省略冠词写 `Red Church`；正文提及地图名称统一使用本表。
- `唐人街`：本表采用通行英文写法 `Chinatown`；部分社区表列为 `China Town`。正文统一用 `Chinatown`。
- `克雷伯格赛马场`：日语优先采用指定的 5ch Wiki 当前导航中的 `クレイバーグ競馬場`，而不是直接照抄其他社区的近似拼写。
- 软件功能名（例如 `Guided Workflow`、`Pulsing highlight`、`Overlay Designer`）是**项目推荐译名**，与角色/地图的游戏内专有名称具有不同证据等级。

## 2. 三语言完整对照表

以下各分类均按 `中文（zh-CN） → 英语（en-US） → 日语（ja-JP）` 使用。  
“GAME”=游戏名称/术语，经中英日游戏 Wiki 资料比对；“OFFICIAL+PROJECT”=赛事英文规则和本项目文档结合；“PROJECT”=根据中文文档语义拟定的翻译规范（不是宣称游戏或软件官方本地化）。请勿将后两者误标记为官方译名。

### 游戏·阵营与机制（39 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 第五人格 | Identity V | Identity V（第五人格） |
| 求生者 | Survivor | サバイバー |
| 监管者 | Hunter | ハンター |
| 角色 | Character | キャラクター |
| 阵营 | Faction | 陣営 |
| 求生者阵营 | Survivor faction | サバイバー陣営 |
| 监管者阵营 | Hunter faction | ハンター陣営 |
| 求生者玩家 | Survivor player | サバイバー側のプレイヤー |
| 监管者玩家 | Hunter player | ハンター側のプレイヤー |
| 密码机 | Cipher Machine | 暗号機 |
| 破译 | Decode | 解読 |
| 破译进度 | Decoding progress | 解読進捗 |
| 校准 | Calibration | 調整 |
| 加速破译 | Accelerated decoding | 解読加速 |
| 狂欢之椅 | Rocket Chair | ロケットチェア |
| 地窖 | Dungeon | ハッチ |
| 地下室 | Basement | 地下室 |
| 逃生门 | Exit Gate | ゲート |
| 求生者逃脱 | Survivor escape | サバイバーの脱出 |
| 监管者淘汰 | Hunter elimination | ハンターによる脱落 |
| 牵制 | Contain / kite | チェイス |
| 救援 | Rescue | 救助 |
| 辅助 | Assist | サポート |
| 治疗 | Heal | 治療 |
| 倒地 | Downed | ダウン |
| 淘汰 | Eliminated | 脱落 |
| 板子 | Pallet | 板 |
| 窗户 | Window | 窓 |
| 翻窗 | Vault a window | 窓乗り越え |
| 恐惧震慑 | Terror Shock | 恐怖の一撃 |
| 出生点 | Spawn point | スポーン位置 |
| 区域选择 | Spawn point selection / Area selection | スポーン位置選択 / エリア選択 |
| 角色分配 | Character assignment | キャラクター割り当て |
| 求生者角色分配 | Survivor character assignment | サバイバーのキャラクター割り当て |
| 内在人格 | Persona | 内在人格 |
| 天赋 | Persona talents | 内在人格 |
| 终极天赋 | Ultimate talent | 究極天賦 |
| 辅助特质 | Trait | 補助特質 |
| 天赋选择 | Talent selection | 内在人格の選択 |

### 游戏·地图（13 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 军工厂 | Arms Factory | 軍需工場 |
| 红教堂 | The Red Church | 赤の教会 |
| 圣心医院 | Sacred Heart Hospital | 聖心病院 |
| 湖景村 | Lakeside Village | 湖景村 |
| 月亮河公园 | Moonlit River Park | 月の河公園 |
| 里奥的回忆 | Leo's Memory | レオの思い出 |
| 白沙街疯人院 | White Sand Street Asylum | ホワイトサンド精神病院 |
| 永眠镇 | Eversleeping Town | 永眠町 |
| 闪金石窟 | Golden Cave | 黄金の石窟 |
| 唐人街 | Chinatown | 中華街 |
| 不归林 | Darkwoods | 罪の森 |
| 克雷伯格赛马场 | Kreiburg Racecourse | クレイバーグ競馬場 |
| 爱德华的心愿 | Edward's Wish | エドワードの願い |

### 游戏·求生者（53 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 幸运儿 | Lucky Guy | 幸運児 |
| 医生 | Doctor | 医師 |
| 律师 | Lawyer | 弁護士 |
| “慈善家” | Thief | 泥棒 |
| 园丁 | Gardener | 庭師 |
| 魔术师 | Magician | マジシャン |
| 冒险家 | Explorer | 冒険家 |
| 佣兵 | Mercenary | 傭兵 |
| 空军 | Coordinator | 空軍 |
| 机械师 | Mechanic | 機械技師 |
| 前锋 | Forward | オフェンス |
| 盲女 | The Mind's Eye | 心眼 |
| 祭司 | Priestess | 祭司 |
| 调香师 | Perfumer | 調香師 |
| 牛仔 | Cowboy | カウボーイ |
| 舞女 | Female Dancer | 踊り子 |
| 先知 | Seer | 占い師 |
| 入殓师 | Embalmer | 納棺師 |
| 勘探员 | Prospector | 探鉱者 |
| 咒术师 | Enchantress | 呪術師 |
| 野人 | Wildling | 野人 |
| 杂技演员 | Acrobat | 曲芸師 |
| 大副 | First Officer | 一等航海士 |
| 调酒师 | Barmaid | バーメイド |
| 邮差 | Postman | ポストマン |
| 守墓人 | Grave Keeper | 墓守 |
| “囚徒” | "Prisoner" | 「囚人」 |
| 昆虫学者 | Entomologist | 昆虫学者 |
| 画家 | Painter | 画家 |
| 击球手 | Batter | バッツマン |
| 玩具商 | Toy Merchant | 玩具職人 |
| 病患 | Patient | 患者 |
| “心理学家” | "Psychologist" | 「心理学者」 |
| 小说家 | Novelist | 小説家 |
| “小女孩” | "Little Girl" | 「少女」 |
| 哭泣小丑 | Weeping Clown | 泣きピエロ |
| 教授 | Professor | 教授 |
| 古董商 | Antiquarian | 骨董商 |
| 作曲家 | Composer | 作曲家 |
| 记者 | Journalist | 記者 |
| 飞行家 | Aeroplanist | 航空エンジニア |
| 拉拉队员 | Cheerleader | 応援団 |
| 木偶师 | Puppeteer | 人形師 |
| 火灾调查员 | Fire Investigator | 火災調査員 |
| “法罗女士” | "Faro Lady" | 「レディ・ファウロ」 |
| “骑士” | "Knight" | 「騎士」 |
| 气象学家 | Meteorologist | 気象学者 |
| 弓箭手 | Archer | 弓使い |
| “逃脱大师” | "Escapologist" | 「脱出マスター」 |
| 幻灯师 | Lanternist | 幻灯師 |
| 斗牛士 | Matador | 闘牛士 |
| 默剧艺人 | Mime Artist | マイムアーティスト |
| “神童” | "Prodigy" | 「神童」 |

### 游戏·监管者（36 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 厂长 | Hell Ember | 復讐者 |
| 小丑 | Smiley Face | 道化師 |
| 鹿头 | Gamekeeper | 断罪狩人 |
| “杰克” | The Ripper | リッパー |
| 蜘蛛 | Soul Weaver | 結魂者 |
| 红蝶 | Geisha | 芸者 |
| 黄衣之主 | The Feaster | 黄衣の王 |
| 宿伞之魂 | Wu Chang | 白黒無常 |
| 摄影师 | Photographer | 写真家 |
| 疯眼 | Mad Eyes | 狂眼 |
| 梦之女巫 | Dream Witch | 夢の魔女 |
| 爱哭鬼 | Axe Boy | 泣き虫 |
| 孽蜥 | Evil Reptilian | 魔トカゲ |
| 红夫人 | Bloody Queen | 血の女王 |
| 26号守卫 | Guard 26 | ガードNo.26 |
| “使徒” | "Disciple" | 「使徒」 |
| 小提琴家 | Violinist | ヴァイオリニスト |
| 雕刻家 | Sculptor | 彫刻師 |
| “博士” | "Undead" | 「アンデッド」 |
| 破轮 | The Breaking Wheel | 破輪 |
| 渔女 | Naiad | 漁師 |
| 蜡像师 | Wax Artist | 蝋人形師 |
| “噩梦” | "Nightmare" | 「悪夢」 |
| “记录员” | Clerk | 書記官 |
| 隐士 | Hermit | 隠者 |
| 守夜人 | Night Watch | 夜の番人 |
| 歌剧演员 | Opera Singer | オペラ歌手 |
| “愚人金” | "Fool's Gold" | 「フールズ・ゴールド」 |
| 时空之影 | The Shadow | 時空の影 |
| “跛脚羊” | "Goatman" | 「足萎えの羊」 |
| “喧嚣” | "Hullabaloo" | 「フラバルー」 |
| 杂货商 | Peddler | 雑貨商 |
| 台球手 | "Cueist" | 「ビリヤードプレイヤー」 |
| “女王蜂” | "Queen Bee" | 「女王蜂」 |
| “牙医” | "Dentist" | 「歯医者」 |
| “心兽” | "Herztier" | 「心の獣」 |

### 游戏·辅助特质（8 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 聆听 | Listen | リッスン |
| 失常 | Abnormal | 異常 |
| 兴奋 | Excitement | 興奮 |
| 巡视者 | Patroller | 巡視者 |
| 传送 | Teleport | 瞬間移動 |
| 窥视者 | Peeper | 監視者 |
| 闪现 | Blink | 神出鬼没 |
| 移形 | Warp | 移行 |

### 赛事·结构与 BP（64 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 比赛 | Match | 試合 |
| 赛事 | Tournament | 大会 |
| 赛制 | Match format | 大会形式 |
| BO3 | Best of 3 (BO3) | BO3（3戦形式） |
| BO5 | Best of 5 (BO5) | BO5（5戦形式） |
| 局 | Game | ゲーム |
| 对局 | Game / current game | ゲーム / 現在のゲーム |
| 第一局 | Game 1 | 第1ゲーム |
| 第二局 | Game 2 | 第2ゲーム |
| 第三局 | Game 3 | 第3ゲーム |
| 第四局 | Game 4 | 第4ゲーム |
| 第五局 | Game 5 | 第5ゲーム |
| 半场 | Half | ハーフ |
| 上半场 | First half | 前半戦 |
| 下半场 | Second half | 後半戦 |
| 第一局上半场 | First half of Game 1 | 第1ゲーム前半戦 |
| 第一局下半场 | Second half of Game 1 | 第1ゲーム後半戦 |
| 回合 | Round | ラウンド |
| 对局进度 | Game progress | 対戦進行状況 |
| BP | Ban/Pick (BP) | BAN/PICK（BP） |
| 角色 BP | Character Ban/Pick | キャラクターBAN/PICK |
| 地图 BP | Map Ban/Pick | マップBAN/PICK |
| 禁用 | Ban | BAN |
| 选择 | Pick | PICK |
| 地图禁选 | Map Ban/Pick | マップBAN/PICK |
| 禁用角色 | Ban Characters | キャラクターBAN |
| 选择角色 | Pick Characters | キャラクターPICK |
| 禁用监管者 | Ban Hunters | ハンターBAN |
| 禁用求生者 | Ban Survivors | サバイバーBAN |
| 监管者禁用阶段 | Hunter Ban Phase | ハンターBANフェーズ |
| 求生者禁用阶段 | Survivor Ban Phase | サバイバーBANフェーズ |
| 求生者选择阶段 | Survivor Pick Phase | サバイバーPICKフェーズ |
| 监管者选择阶段 | Hunter Pick Phase | ハンターPICKフェーズ |
| 当局禁用 | Current-game Ban | 当該ゲームのBAN |
| 全局禁用 | Global Ban | グローバルBAN |
| 全局禁选 | Global Ban | グローバルBAN |
| 全局禁选记录 | Global Ban Records | グローバルBAN履歴 |
| 当局 Ban 位 | Current-game Ban slot | 当該ゲームのBAN枠 |
| 全局 Ban 位 | Global Ban slot | グローバルBAN枠 |
| 禁用槽位 | Ban slot | BAN枠 |
| 地图全局禁用 | Global Map Ban | マップのグローバルBAN |
| 禁用数量控制 | Ban slot count | BAN枠数の設定 |
| 角色选择器 | Character selector | キャラクター選択欄 |
| 天赋选择器 | Talent selector | 内在人格の選択欄 |
| 禁用结果 | Ban result | BAN結果 |
| 选择结果 | Pick result | PICK結果 |
| 阵营选择 | Faction selection | 陣営選択 |
| 换边 | Swap sides | 陣営を入れ替える |
| 主队 | Home team | ホームチーム |
| 客队 | Away team | アウェイチーム |
| 战队 | Team | チーム |
| 战队名 | Team name | チーム名 |
| 队徽 | Team logo | チームロゴ |
| 队员 | Team member | チームメンバー |
| 选手 | Player | 選手 |
| 上场选手 | Starting player | 出場選手 |
| 替补选手 | Substitute player | 控え選手 |
| 上场 | Set as active | 出場に設定 |
| 下场 | Set as inactive | 控えに変更 |
| 选手顺序 | Player order | 選手の順番 |
| 选手槽位 | Player slot | 選手枠 |
| 角色换位 | Swap character assignments | キャラクター割り当ての入れ替え |
| 游戏内 ID | In-game ID | ゲーム内ID |
| 选手 ID | Player ID | 選手ID |

### 赛事·结果与比分（27 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 对局结果 | Game result | ゲーム結果 |
| 求生者获胜 | Survivor victory | サバイバー勝利 |
| 监管者获胜 | Hunter victory | ハンター勝利 |
| 平局 | Draw | 引き分け |
| 四抓 | Four eliminations | 4人脱落 |
| 三抓 | Three eliminations | 3人脱落 |
| 三跑 | Three escapes | 3人脱出 |
| 四跑 | Four escapes | 4人脱出 |
| 比分 | Score | スコア |
| 比分系统 | Score System | スコア管理 |
| 比分控制 | Score Control | スコア操作 |
| 小比分 | Minor score | 小スコア |
| 大比分 | Major score | 大スコア |
| 当前回合累计小比分 | Cumulative minor score for current game | 現在のゲームの累計小スコア |
| 当前半场小比分 | Current half minor score | 現在のハーフの小スコア |
| 总小比分 | Total minor score | 小スコア合計 |
| 全局比分 | Overall score | 総合スコア |
| 游戏内比分 | In-game score | ゲーム内スコア |
| 赛后数据 | Post-game Statistics | 試合後の統計データ |
| 赛后结算 | Post-game results | ゲーム終了後の結果 |
| 结算 | Settle scores | スコアを確定 |
| 大比分结算 | Finalize major score | 大スコアを集計 |
| 自动计算比分 | Calculate scores automatically | スコアを自動計算 |
| 标准对局 | Standard Game Mode | 標準対戦モード |
| 自由对局 | Free Game Mode | フリーモード |
| 下一局（重置） | Next Game (Reset) | 次のゲーム（リセット） |
| 仅重置 | Reset Only | リセットのみ |

### 软件·页面与引导（46 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 前言 | Introduction | はじめに |
| 快速开始 | Quick Start | クイックスタート |
| 对局信息及对局引导 | Game Information and Guided Workflow | 対戦情報と進行ガイド |
| 双方阵营及换边 | Factions and Side Switching | 陣営と陣営切り替え |
| 队伍信息编辑 | Team Information | チーム情報の編集 |
| 计时器 | Countdown Timer | カウントダウンタイマー |
| 前台管理 | Overlay Window Management | 配信用ウィンドウ管理 |
| 前台窗口 | Broadcast overlay window | 配信用ウィンドウ |
| 前台界面 | Broadcast overlay | 配信オーバーレイ |
| 后台界面 | Operator control panel | 操作パネル |
| 后台 | Operator interface | 操作画面 |
| BP 画面 | BP overlay | BP表示画面 |
| 地图 BP 窗口 | Map BP overlay window | マップBP表示ウィンドウ |
| 比分窗口 | Score overlay window | スコア表示ウィンドウ |
| 赛后数据窗口 | Post-game statistics window | 試合後データ表示ウィンドウ |
| 过场画面 | Transition overlay | トランジション画面 |
| 直播画面 | Live broadcast output | 配信画面 |
| 导播 | Broadcast operator | 配信オペレーター |
| 开始对局引导 | Start Guided Workflow | 対戦進行ガイドを開始 |
| 结束对局引导 | Stop Guided Workflow | 対戦進行ガイドを終了 |
| 对局引导 | Guided Workflow | 対戦進行ガイド |
| 步骤引导 | Step-by-step Guidance | ステップガイド |
| 上一步 | Previous Step | 前のステップ |
| 下一步 | Next Step | 次のステップ |
| 对局规则 | Game rules | 対戦ルール |
| 引导规则 | Guidance rules | 進行ガイドのルール |
| 修改引导规则 | Edit Guidance Rules | 進行ガイドルールの編集 |
| 预设规则 | Preset rules | プリセットルール |
| 呼吸灯 | Pulsing highlight | 呼吸アニメーション |
| 停止所有循环动画 | Stop All Looping Animations | すべてのループアニメーションを停止 |
| 待选框呼吸灯 | Pulsing highlight for available map slots | 選択可能なマップ枠の呼吸アニメーション |
| 阵营选择结果展示 | Faction Selection Result Display | 陣営選択結果の表示 |
| 开始 | Start | 開始 |
| 停止 | Stop | 停止 |
| 预览 | Preview | プレビュー |
| 设置页面 | Settings | 設定 |
| 高级选项 | Advanced Options | 詳細設定 |
| 常见问题及解决方案 | FAQ and Troubleshooting | よくある質問とトラブルシューティング |
| 经典模式 | Classic Mode | クラシックモード |
| 选项开关 | Toggle switches | 切り替えスイッチ |
| 快捷入口 | Quick Access | クイックアクセス |
| 下载中心 | Download Center | ダウンロードセンター |
| 预览版 | Preview Release | プレビュー版 |
| 日志目录 | Log Directory | ログフォルダー |
| 错误日志 | Error log | エラーログ |
| 屏幕缩放 | Display scaling | ディスプレイの拡大縮小 |

### 软件·设计器与布局（85 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| v3 前台设计器 | v3 Overlay Designer | v3配信画面デザイナー |
| 设计器 | Designer | デザイナー |
| 编辑器 | Editor | エディター |
| 布局包 | Layout Package | レイアウトパッケージ |
| 前台布局包 | Overlay Layout Package | 配信画面レイアウトパッケージ |
| 内置布局包 | Built-in Layout Package | 組み込みレイアウトパッケージ |
| 用户布局 | User Layout | ユーザーレイアウト |
| 激活布局包 | Activate Layout Package | レイアウトパッケージを有効化 |
| 布局副本 | Layout Copy | レイアウトのコピー |
| 导入布局包 | Import Layout Package | レイアウトパッケージをインポート |
| 导出布局包 | Export Layout Package | レイアウトパッケージをエクスポート |
| 创建副本 | Create Copy | コピーを作成 |
| 自动格式升级 | Automatic format upgrade | フォーマットの自動更新 |
| 前台设计 | Overlay Design | 配信画面デザイン |
| 自定义前台窗口 | Custom Overlay Window | カスタム配信用ウィンドウ |
| 顶部工具栏 | Top Toolbar | 上部ツールバー |
| 图层面板 | Layers Panel | レイヤーパネル |
| 预览画布 | Preview Canvas | プレビューキャンバス |
| 属性面板 | Properties Panel | プロパティパネル |
| 状态栏 | Status Bar | ステータスバー |
| 窗口 | Window | ウィンドウ |
| 画布 | Canvas | キャンバス |
| 控件 | Control | コントロール |
| 窗口宽度 | Window Width | ウィンドウの幅 |
| 窗口高度 | Window Height | ウィンドウの高さ |
| 允许透明 | Allow Transparency | 透過を許可 |
| 背景颜色 | Background Color | 背景色 |
| 背景图片 | Background Image | 背景画像 |
| 文本 | Text | テキスト |
| 本地化文本 | Localized Text | ローカライズされたテキスト |
| 图片 | Image | 画像 |
| 带边框图片 | Bordered Image | 枠付き画像 |
| 矩形 | Rectangle | 長方形 |
| 多边形 | Polygon | 多角形 |
| 染色矩形 | Tinted Rectangle | 色付き長方形 |
| 染色多边形 | Tinted Polygon | 色付き多角形 |
| 地图名称 | Map Name | マップ名 |
| 地图 v2 | Map v2 | マップv2 |
| 全局比分控件 | Overall Score Control | 総合スコアコントロール |
| 地图卡片 | Map Card | マップカード |
| 图层 | Layer | レイヤー |
| 显示层级 | Z-order | 重なり順 |
| 调整手柄 | Resize Handle | サイズ変更ハンドル |
| 吸附 | Snapping | スナップ |
| 对齐 | Alignment | 配置揃え |
| 微调位置 | Nudge Position | 位置の微調整 |
| 撤销 | Undo | 元に戻す |
| 重做 | Redo | やり直す |
| 数据绑定 | Data Binding | データバインディング |
| 文本绑定 | Text Binding | テキストバインディング |
| 绑定源 | Binding Source | バインディングソース |
| 绑定路径 | Binding Path | バインディングパス |
| 静态图片路径 | Static Image Path | 固定画像パス |
| 浏览绑定 | Browse Bindings | バインディングを参照 |
| 文本格式 | String Format | 文字列フォーマット |
| 动态索引绑定 | Dynamic Index Binding | 動的インデックスバインディング |
| 静态文本 | Static Text | 固定テキスト |
| 触发器 | Trigger | トリガー |
| 事件 | Event | イベント |
| 过滤器 | Filter | フィルター |
| 单次行为 | One-shot Behavior | 単発動作 |
| 循环行为 | Looping Behavior | ループ動作 |
| 过渡行为 | Transition Behavior | 遷移動作 |
| 动画行为 | Animation Behavior | アニメーション動作 |
| 节点图 | Node Graph | ノードグラフ |
| 动画节点图 | Animation Node Graph | アニメーションノードグラフ |
| 动画编辑器 | Animation Editor | アニメーションエディター |
| 开始节点 | Start Node | 開始ノード |
| 结束节点 | End Node | 終了ノード |
| 延迟节点 | Delay Node | 遅延ノード |
| 并行节点 | Parallel Node | 並列ノード |
| 条件判断节点 | If Node | 条件分岐ノード |
| 设置属性 | Set Property | プロパティを設定 |
| 重置属性 | Reset Property | プロパティをリセット |
| 动画属性 | Animate Property | プロパティをアニメーション化 |
| 不透明度 | Opacity | 不透明度 |
| 缓动 | Easing | イージング |
| 持续时间 | Duration | 継続時間 |
| 预览动画 | Preview Animation | アニメーションをプレビュー |
| 布局校验 | Layout Validation | レイアウト検証 |
| 校验消息 | Validation Message | 検証メッセージ |
| 重置为内置 | Reset to Built-in | 組み込み設定に戻す |
| 重新加载 | Reload | 再読み込み |
| 复合控件 | Composite Control | 複合コントロール |
| BO3/BO5 状态 | BO3/BO5 States | BO3/BO5状態 |

### 软件·智慧 BP 与 OCR（48 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 智慧 BP | SmartBP | SmartBP（スマートBP） |
| 智慧 BP 模块 | SmartBP Module | SmartBPモジュール |
| 角色 BP 自动识别 | Automatic Character BP Recognition | キャラクターBP自動認識 |
| 全流程 BP 自动识别 | Full BP Workflow Recognition | BP全工程自動認識 |
| 对局引导同步 | Guided Workflow Synchronization | 進行ガイドの同期 |
| 自动应用识别结果 | Apply Recognition Results Automatically | 認識結果を自動適用 |
| 同步步骤时跟随页面导航 | Follow Page Navigation During Step Sync | ステップ同期時にページ遷移を追従 |
| 启用同步对局引导 | Sync Guided Workflow | 進行ガイドの同期を有効化 |
| 启动自动识别 | Start Automatic Recognition | 自動認識を開始 |
| 停止智慧 BP 识别 | Stop SmartBP Recognition | SmartBP認識を停止 |
| 强制同步对局状态 | Force Sync Game State | 対戦状態を強制同期 |
| 赛后数据识别 | Post-game Statistics Recognition | 試合後データの認識 |
| 自动识别并填充赛后数据 | Recognize and Fill Post-game Statistics | 試合後データを認識して自動入力 |
| 窗口捕获 | Window Capture | ウィンドウキャプチャ |
| 窗口捕获设置 | Window Capture Settings | ウィンドウキャプチャ設定 |
| 窗口选择器 | Window Picker | ウィンドウ選択ツール |
| 捕获画面 | Captured Frame | キャプチャ画像 |
| 识别区域 | Recognition Region | 認識領域 |
| BP 识别区域 | BP Recognition Regions | BP認識領域 |
| 区域编辑器 | Region Editor | 領域エディター |
| 顶部阶段识别区域 | Top Phase Recognition Region | 上部フェーズ認識領域 |
| 左上区域 | Upper-left Region | 左上領域 |
| 右上区域 | Upper-right Region | 右上領域 |
| 左下区域 | Lower-left Region | 左下領域 |
| 右下区域 | Lower-right Region | 右下領域 |
| BP 结束状态区域 | BP Completion Region | BP終了状態認識領域 |
| 识别结果 | Recognition Result | 認識結果 |
| 识别失败 | Recognition Failed | 認識失敗 |
| 候选操作 | Candidate Operation | 操作候補 |
| 光学字符识别 | Optical Character Recognition (OCR) | 光学文字認識（OCR） |
| OCR 提供程序 | OCR Provider | OCRプロバイダー |
| OCR 模型 | OCR Model | OCRモデル |
| 当前 OCR 模型 | Current OCR Model | 現在のOCRモデル |
| OCR 调试覆盖层 | OCR Debug Overlay | OCRデバッグオーバーレイ |
| 识别间隔 | Recognition Interval | 認識間隔 |
| 识别速度 | Recognition Speed | 認識速度 |
| 测试识别速度 | Test Recognition Speed | 認識速度をテスト |
| 最低识别间隔 | Minimum Recognition Interval | 最小認識間隔 |
| 合并识别图 | Merged OCR Image | OCR統合画像 |
| 历史回看 | Historical Frame Lookback | 過去フレームの参照 |
| 历史回看工作流步数 | Lookback Workflow Steps | 過去参照ワークフローステップ数 |
| 回看帧时间窗口 | Lookback Frame Time Window | 過去フレーム参照時間幅 |
| 最低置信度 | Minimum Confidence | 最小信頼度 |
| 调试选项 | Debug Options | デバッグオプション |
| 识别日志 | Recognition Log | 認識ログ |
| 硬件加速 | Hardware Acceleration | ハードウェアアクセラレーション |
| OCR 未就绪 | OCR Not Ready | OCRの準備ができていません |
| 重新下载并修复 | Re-download and Repair | 再ダウンロードして修復 |

### 软件·插件与文件格式（27 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| 插件系统 | Plugin System | プラグインシステム |
| 插件 | Plugin | プラグイン |
| 插件管理 | Plugin Management | プラグイン管理 |
| 已安装 | Installed | インストール済み |
| 插件市场 | Plugin Marketplace | プラグインマーケット |
| 内置插件 | Built-in Plugin | 組み込みプラグイン |
| 第三方插件 | Third-party Plugin | サードパーティ製プラグイン |
| 安装插件 | Install Plugin | プラグインをインストール |
| 启用插件 | Enable Plugin | プラグインを有効化 |
| 禁用插件 | Disable Plugin | プラグインを無効化 |
| 卸载插件 | Uninstall Plugin | プラグインをアンインストール |
| 更新插件 | Update Plugin | プラグインを更新 |
| 插件依赖 | Plugin Dependency | プラグインの依存関係 |
| 缺少依赖插件 | Missing Required Plugins | 必須プラグインが不足しています |
| 版本不兼容 | Incompatible Version | バージョンの互換性がありません |
| 插件 API 版本 | Plugin API Version | プラグインAPIバージョン |
| 插件源 | Plugin Registry Source | プラグイン一覧の取得元 |
| 下载源 | Download Mirror | ダウンロード元 |
| 本地文件安装 | Install from Local File | ローカルファイルからインストール |
| 模块压缩包 | Module Archive | モジュールアーカイブ |
| 从 JSON 文件导入 | Import from JSON File | JSONファイルからインポート |
| 队伍信息 JSON 文件 | Team Information JSON File | チーム情報JSONファイル |
| 文件关联 | File Association | ファイルの関連付け |
| 对局文件 | Game Data File | 対戦データファイル |
| 对局文件输出目录 | Game Data Output Directory | 対戦データの出力先フォルダー |
| 前台配置文件 | Overlay Configuration File | 配信画面設定ファイル |
| 路径调整 | Path Settings | パス設定 |

### 不可翻译·名称与标识符（50 条）

| 中文（zh-CN） | 英语（en-US） | 日语（ja-JP） |
| --- | --- | --- |
| neo-bpsys-wpf | neo-bpsys-wpf | neo-bpsys-wpf |
| neo-bpsys-docs-next | neo-bpsys-docs-next | neo-bpsys-docs-next |
| SmartBP | SmartBP | SmartBP |
| BPUI | BPUI | BPUI |
| .bpui | .bpui | .bpui |
| GameRule.json | GameRule.json | GameRule.json |
| MinorHalfScore | MinorHalfScore | MinorHalfScore |
| CurrentMinorScore | CurrentMinorScore | CurrentMinorScore |
| TotalMinorScore | TotalMinorScore | TotalMinorScore |
| CurrentGame | CurrentGame | CurrentGame |
| MatchScore | MatchScore | MatchScore |
| HalfByProgress | HalfByProgress | HalfByProgress |
| GameProgress | GameProgress | GameProgress |
| SurMinorScore | SurMinorScore | SurMinorScore |
| HunMinorScore | HunMinorScore | HunMinorScore |
| BindingPath | BindingPath | BindingPath |
| ImagePath | ImagePath | ImagePath |
| StringFormat | StringFormat | StringFormat |
| PropertyName | PropertyName | PropertyName |
| Opacity | Opacity | Opacity |
| DurationMs | DurationMs | DurationMs |
| SetProperty | SetProperty | SetProperty |
| ResetProperty | ResetProperty | ResetProperty |
| AnimateProperty | AnimateProperty | AnimateProperty |
| Target | Target | Target |
| Self | Self | Self |
| Easing | Easing | Easing |
| Name | Name | Name |
| ImageUri | ImageUri | ImageUri |
| Camp | Camp | Camp |
| Sur | Sur | Sur |
| Hun | Hun | Hun |
| SurMemberList | SurMemberList | SurMemberList |
| HunMemberList | HunMemberList | HunMemberList |
| JSON | JSON | JSON |
| OCR | OCR | OCR |
| PaddleOCR | PaddleOCR | PaddleOCR |
| RapidOCR | RapidOCR | RapidOCR |
| Tesseract | Tesseract | Tesseract |
| WGC | WGC | WGC |
| Windows Graphics Capture | Windows Graphics Capture | Windows Graphics Capture |
| BitBlt | BitBlt | BitBlt |
| CUDA | CUDA | CUDA |
| OBS | OBS | OBS |
| .NET 10 | .NET 10 | .NET 10 |
| WPF | WPF | WPF |
| VuePress | VuePress | VuePress |
| GitHub | GitHub | GitHub |
| GPL-3.0 | GPL-3.0 | GPL-3.0 |
| CC BY-NC-SA 4.0 | CC BY-NC-SA 4.0 | CC BY-NC-SA 4.0 |

## 3. 来源与核验范围

1. **英文《Identity V Wiki》**：https://id5.fandom.com/wiki/Identity_V_Wiki  
   用于英文游戏专业名词、地图、角色与玩法命名；主页可能受访问限制，相关子页面可查询。
2. **日文 IdentityV 5ch 攻略 Wiki**：https://wikiwiki.jp/identity5ch/  
   日文角色名、地图名、补助特质与社区专业用语，以其 [MenuBar](https://wikiwiki.jp/identity5ch/MenuBar) 和角色/地图页面为参考。
3. **第五人格 BWIKI 多语言常见名词表（辅助交叉核对）**：https://wiki.biligame.com/dwrg/常见名词对照表  
   补齐中英日游戏角色、地图和辅助特质的横向对照；如与 5ch 当前条目冲突，优先核对指定日文站。
4. **NetEase 官方 IVC NAEU 2026 英文比赛规则**：https://www.identityvgame.com/en/news/official/20260630/35287_1306174.html  
   用于 `Match`、`Game`、`half`、`Global Ban`、`Character Ban/Pick` 与 `Map Ban/Pick` 的语义校准。赛事细则可随赛事变化，**不要把某赛事的 Ban 数量与流程视为所有赛事共用**。
5. **本项目中文原文仓库**：https://github.com/PLFJY/neo-bpsys-docs-next  
   读取并参考 `src/.vuepress/config.ts`、三语言导航、`src/user-guide/` 顶层 16 篇 Markdown、`src/user-guide/advanced/` 4 篇 Markdown。项目特有的 UI/设计器/OCR/插件术语均据此归纳。

### 维护说明

- 对照表聚焦于**用户指南需要的游戏、赛事、软件术语**，包含角色表和地图表作为未来扩展翻译的参考；不包含《第五人格》全部角色技能名、皮肤名、剧情名、地图所有点位与历史赛季规则。
- 时间敏感的新增角色、技能和比赛制度可能继续变化。术语覆盖以 **2026-10-22** 调研时可查资料为基准；应在后续版本中增补，而不是假定永远穷尽。
- 中文名带引号的角色属于命名差异，**不要**删除可能具有区分意义的引号而造成角色歧义。对照表中的弯引号和直引号可按目标语言排版规则统一。
- 发现某一条与游戏内实际显示或软件内现有翻译不一致时，**优先核验**，将更正同步写回对照表及 `CSV`，不要在正文临时采用不同译法。
- 同目录附有 `identityv_neo_bpsys_glossary_zh_en_ja.csv`（UTF-8 BOM，可用常见表格软件打开），字段为 `category, zh-CN, en-US, ja-JP, source, note`。

**本表总计 496 条术语，分属 12 个分类。**
