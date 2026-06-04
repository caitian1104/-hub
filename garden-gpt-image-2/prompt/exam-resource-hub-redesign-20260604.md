# Exam Resource Hub Redesign Prompt

```json
{
  "type": "desktop web app UI concept mockup",
  "goal": "Redesign the Exam Resource Hub as a beautiful Chinese GitHub-like course repository interface for organizing and sharing exam resources.",
  "product": {
    "name": "考试资料库",
    "language": "Simplified Chinese only",
    "audience": "Chinese-speaking university students organizing course materials, past papers, notes, cheat sheets, and formula summaries"
  },
  "design_system": {
    "anchor": "Garden web-design-engineer Raycast recipe, adapted for academic resource management",
    "visual_temperature": "modern tool, quiet academic, premium dark productivity UI",
    "palette": {
      "ground": "#0F0F11 warm charcoal",
      "surface": "translucent charcoal panels with subtle warm borders",
      "hairline": "rgba(255,255,255,0.10)",
      "primary_text": "soft cream white",
      "secondary_text": "muted warm gray",
      "accent": "restrained coral red and jade green, small amber highlights"
    },
    "typography": "elegant, readable Chinese UI typography; compact but not crowded; no browser-default text",
    "radius": "8px or less for cards and controls",
    "shadow": "soft cushioned shadows only on modals and elevated command surfaces",
    "motion_feel": "implied fast productivity UI, keyboard-friendly, command-palette polish"
  },
  "layout": {
    "viewport": "1440x1000 desktop front-on screenshot",
    "app_shell": "left sidebar, top command/search bar, main dashboard area",
    "primary_regions": [
      "left sidebar with app name 考试资料库, navigation items 资料库, 课程仓库, 公开分享, 标签, 设置",
      "top search and filter command bar with placeholder 搜索课程、资料、年份、标签",
      "course repository cards showing 高等数学, 有机化学, 宏观经济学, 数据结构",
      "main resource table with columns only: 标题, 类型, 年份, 标签, 操作",
      "course-level sharing controls: public/private toggle labeled 私有/公开, 分享 button, tasteful share link popover",
      "compact quick-add resource control for 新增资料"
    ]
  },
  "content_rules": {
    "resource_types": ["历年真题", "课堂笔记", "速查表", "公式汇总"],
    "visible_table_columns": ["标题", "类型", "年份", "标签", "操作"],
    "removed_fields_must_not_appear": ["难度", "状态", "来源", "添加时间"],
    "no_study_planner": true,
    "no_task_checklist": true,
    "shared_pages": "read-only resources-only course pages"
  },
  "style_constraints": {
    "must_feel": "more beautiful than a normal dashboard; refined, intentional, GitHub-like but not a clone; Raycast-like command palette polish applied to an academic repository tool",
    "must_keep": [
      "all visible text in Simplified Chinese",
      "dark charcoal background, not pure black",
      "clean code-native UI, not a marketing hero",
      "course-level sharing as a first-class function",
      "stable spacing and professional visual hierarchy",
      "resource organization remains the main purpose"
    ],
    "avoid": [
      "Claude or Anthropic branding",
      "pure black harsh background",
      "blue-purple gradient theme",
      "decorative gradient orbs",
      "nested cards",
      "calendar or study task checklist",
      "columns named 难度, 状态, 来源, 添加时间",
      "unreadable fake Chinese text",
      "stock illustration or people photography"
    ]
  }
}
```
