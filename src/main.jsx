import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Bell,
  Beaker,
  BookOpen,
  Box,
  ChevronDown,
  Copy,
  Download,
  Eye,
  FileArchive,
  FileText,
  Folder,
  FunctionSquare,
  Grid2X2,
  Link2,
  Lock,
  Mail,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  Sigma,
  Star,
  Tags,
  Terminal,
  Upload,
  BarChart3,
  Globe2
} from 'lucide-react';
import './styles.css';

const courses = [
  {
    id: 'calculus',
    name: '高等数学',
    school: '数学与统计学院',
    icon: FunctionSquare,
    accent: 'coral',
    resources: 24,
    stars: 156
  },
  {
    id: 'organic',
    name: '有机化学',
    school: '化学化工学院',
    icon: Beaker,
    accent: 'green',
    resources: 18,
    stars: 98
  },
  {
    id: 'macro',
    name: '宏观经济学',
    school: '经济学院',
    icon: BarChart3,
    accent: 'amber',
    resources: 16,
    stars: 72
  },
  {
    id: 'data',
    name: '数据结构',
    school: '计算机学院',
    icon: Terminal,
    accent: 'violet',
    resources: 22,
    stars: 121
  }
];

const resources = [
  { title: '2024年高等数学（上）期末真题及答案', type: '历年真题', year: '2024', tags: ['期末', '上册'], icon: FileArchive, accent: 'coral' },
  { title: '高数（上）重点知识点笔记整理', type: '课堂笔记', year: '2024', tags: ['上册', '重点'], icon: FileText, accent: 'green' },
  { title: '常用公式速查表（高等数学）', type: '速查表', year: '2024', tags: ['公式', '速查'], icon: Grid2X2, accent: 'amber' },
  { title: '高等数学公式汇总（完整版）', type: '公式汇总', year: '2024', tags: ['公式', '汇总'], icon: Sigma, accent: 'violet' },
  { title: '2023年高等数学（下）期末真题及答案', type: '历年真题', year: '2023', tags: ['期末', '下册'], icon: FileArchive, accent: 'coral' },
  { title: '高数（下）例题解析与思路总结', type: '课堂笔记', year: '2023', tags: ['下册', '例题'], icon: FileText, accent: 'green' },
  { title: '微积分常用公式速查表', type: '速查表', year: '2023', tags: ['微积分', '公式'], icon: Grid2X2, accent: 'amber' },
  { title: '微分方程公式与解法汇总', type: '公式汇总', year: '2023', tags: ['微分方程', '汇总'], icon: Sigma, accent: 'violet' }
];

const navItems = [
  { label: '资料库', icon: Folder },
  { label: '课程仓库', icon: BookOpen },
  { label: '公开分享', icon: Share2 },
  { label: '标签', icon: Tags },
  { label: '设置', icon: Settings }
];

function App() {
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [query, setQuery] = useState('');
  const [shareOpen, setShareOpen] = useState(true);
  const [isPublic, setIsPublic] = useState(true);

  const filteredResources = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return resources;
    return resources.filter((item) =>
      [item.title, item.type, item.year, ...item.tags].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Box size={25} />
          </div>
          <h1>考试资料库</h1>
        </div>

        <nav className="nav-list" aria-label="主导航">
          {navItems.map((item, index) => (
            <button className={`nav-item ${index === 0 ? 'active' : ''}`} key={item.label}>
              <item.icon size={21} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="storage-card">
            <div className="storage-title">
              <Upload size={17} />
              <span>存储空间</span>
            </div>
            <p>12.4 GB / 50 GB</p>
            <div className="storage-bar">
              <span />
            </div>
          </div>

          <button className="profile-card">
            <div className="avatar">小</div>
            <div>
              <strong>小明同学</strong>
              <span>普通用户</span>
            </div>
            <ChevronDown size={16} />
          </button>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div className="search-shell">
            <span className="shortcut">⌘ K</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索课程、资料、年份、标签"
            />
          </div>
          <div className="top-actions">
            <button className="icon-button">
              <Bell size={20} />
              <span className="notification-dot" />
            </button>
            <button className="icon-button compact">
              <ChevronDown size={17} />
            </button>
          </div>
        </header>

        <section className="course-section">
          <div className="section-title-row">
            <h2>课程仓库</h2>
            <div className="share-zone">
              <button className="privacy-toggle" onClick={() => setIsPublic((value) => !value)}>
                {isPublic ? <Globe2 size={17} /> : <Lock size={17} />}
                <span>私有 / 公开</span>
                <span className={`switch ${isPublic ? 'on' : ''}`} />
              </button>
              <button className="share-primary" onClick={() => setShareOpen((value) => !value)}>
                <Share2 size={18} />
                分享
              </button>
              <button className="more-button">
                <MoreHorizontal size={19} />
              </button>

              {shareOpen && (
                <div className="share-popover">
                  <div className="popover-head">
                    <div className="globe-badge">
                      <Globe2 size={25} />
                    </div>
                    <div>
                      <strong>公开访问已开启</strong>
                      <p>所有人均可查看此课程下的资料（只读）</p>
                    </div>
                  </div>
                  <span className="share-label">分享链接</span>
                  <div className="share-link">
                    <span>https://ziliaoku.com/share/calculus</span>
                    <button>复制</button>
                  </div>
                  <div className="share-options">
                    <button><Link2 size={17} /><span>复制链接</span></button>
                    <button><Grid2X2 size={17} /><span>二维码</span></button>
                    <button><Mail size={17} /><span>发送邮件</span></button>
                    <button><MoreHorizontal size={17} /><span>更多</span></button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="course-grid">
            {courses.map((course) => (
              <button
                className={`course-card ${selectedCourse.id === course.id ? 'selected' : ''} ${course.accent}`}
                key={course.id}
                onClick={() => setSelectedCourse(course)}
              >
                <div className="card-head">
                  <span className="course-icon">
                    <course.icon size={34} />
                  </span>
                  <MoreHorizontal size={20} />
                </div>
                <h3>{course.name}</h3>
                <p>{course.school}</p>
                <div className="course-stats">
                  <span><FileText size={17} />{course.resources}</span>
                  <span><Star size={17} />{course.stars}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="resource-section">
          <div className="resource-head">
            <div className="resource-title">
              <h2>{selectedCourse.name}</h2>
              <span>共 {selectedCourse.resources} 个资料</span>
            </div>
            <div className="resource-tools">
              <div className="inline-search">
                <span>在当前课程中搜索</span>
                <Search size={18} />
              </div>
              <button className="add-button">
                <Plus size={19} />
                新增资料
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          <div className="resource-table">
            <div className="table-row table-head">
              <span>标题</span>
              <span>类型</span>
              <span>年份</span>
              <span>标签</span>
              <span>操作</span>
            </div>
            {filteredResources.map((item) => (
              <div className="table-row" key={`${item.title}-${item.year}`}>
                <div className="resource-name">
                  <item.icon className={`resource-icon ${item.accent}`} size={22} />
                  <span>{item.title}</span>
                </div>
                <span className={`type-pill ${item.accent}`}>{item.type}</span>
                <span className="year-cell">{item.year}</span>
                <div className="tag-list">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="row-actions">
                  <button><Eye size={18} /></button>
                  <button><Download size={18} /></button>
                  <button><MoreHorizontal size={18} /></button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
