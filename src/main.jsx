import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Beaker,
  BookOpen,
  Box,
  ChevronLeft,
  ChevronDown,
  Download,
  Eye,
  FileArchive,
  FileText,
  FunctionSquare,
  Grid2X2,
  MoreHorizontal,
  Search,
  Sigma,
  Star,
  BarChart3,
  Terminal
} from 'lucide-react';
import './styles.css';

const initialCourses = [
  {
    id: 'calculus',
    repo: 'math / calculus-notes',
    name: '高等数学',
    school: '数学与统计学院',
    description: '微积分、级数、微分方程与期末真题集合，适合考前快速复习。',
    language: 'Mathematics',
    today: 12,
    contributors: ['林', '周', '王', '陈'],
    icon: FunctionSquare,
    accent: 'coral',
    resources: 24,
    stars: 156
  },
  {
    id: 'organic',
    repo: 'chemistry / organic-review',
    name: '有机化学',
    school: '化学化工学院',
    description: '反应机理、官能团性质、实验笔记与命名规则速查资料。',
    language: 'Chemistry',
    today: 8,
    contributors: ['赵', '何', '许'],
    icon: Beaker,
    accent: 'green',
    resources: 18,
    stars: 98
  },
  {
    id: 'macro',
    repo: 'economics / macro-finals',
    name: '宏观经济学',
    school: '经济学院',
    description: '模型图解、政策分析提纲、历年试题与公式总结。',
    language: 'Economics',
    today: 6,
    contributors: ['刘', '马', '吴'],
    icon: BarChart3,
    accent: 'amber',
    resources: 16,
    stars: 72
  },
  {
    id: 'data',
    repo: 'cs / data-structures',
    name: '数据结构',
    school: '计算机学院',
    description: '算法模板、复杂度总结、树图重点和上机题库整理。',
    language: 'Computer Science',
    today: 10,
    contributors: ['黄', '郑', '孙', '杨'],
    icon: Terminal,
    accent: 'violet',
    resources: 22,
    stars: 121
  }
];

const initialResources = {
  calculus: [
    { title: '2024年高等数学（上）期末真题及答案', type: '历年真题', year: '2024', tags: ['期末', '上册'], icon: FileArchive, accent: 'coral' },
    { title: '高数（上）重点知识点笔记整理', type: '课堂笔记', year: '2024', tags: ['上册', '重点'], icon: FileText, accent: 'green' },
    { title: '常用公式速查表（高等数学）', type: '速查表', year: '2024', tags: ['公式', '速查'], icon: Grid2X2, accent: 'amber' },
    { title: '高等数学公式汇总（完整版）', type: '公式汇总', year: '2024', tags: ['公式', '汇总'], icon: Sigma, accent: 'violet' }
  ],
  organic: [
    { title: '有机化学反应机理速查表', type: '速查表', year: '2024', tags: ['机理', '反应'], icon: Grid2X2, accent: 'green' },
    { title: '2023年有机化学期末真题', type: '历年真题', year: '2023', tags: ['期末', '真题'], icon: FileArchive, accent: 'coral' },
    { title: '官能团性质课堂笔记', type: '课堂笔记', year: '2024', tags: ['官能团', '重点'], icon: FileText, accent: 'green' }
  ],
  macro: [
    { title: 'IS-LM 模型公式汇总', type: '公式汇总', year: '2024', tags: ['模型', '公式'], icon: Sigma, accent: 'violet' },
    { title: '宏观经济学期末真题整理', type: '历年真题', year: '2023', tags: ['期末', '真题'], icon: FileArchive, accent: 'coral' },
    { title: '货币政策与财政政策笔记', type: '课堂笔记', year: '2024', tags: ['政策', '重点'], icon: FileText, accent: 'amber' }
  ],
  data: [
    { title: '数据结构算法模板速查', type: '速查表', year: '2024', tags: ['算法', '模板'], icon: Grid2X2, accent: 'amber' },
    { title: '树与图重点知识点笔记', type: '课堂笔记', year: '2024', tags: ['树', '图'], icon: FileText, accent: 'green' },
    { title: '2023年数据结构期末真题', type: '历年真题', year: '2023', tags: ['期末', '真题'], icon: FileArchive, accent: 'coral' }
  ]
};

function App() {
  const [courseList, setCourseList] = useState(initialCourses);
  const [resourceMap, setResourceMap] = useState(initialResources);
  const [selectedCourse, setSelectedCourse] = useState(initialCourses[0]);
  const [query, setQuery] = useState('');
  const [view, setView] = useState('courses');
  const [createOpen, setCreateOpen] = useState(false);
  const [newCourse, setNewCourse] = useState({ name: '' });
  const [resourceOpen, setResourceOpen] = useState(false);
  const [newResource, setNewResource] = useState({ title: '', type: '', tags: '', file: null });

  const createCourse = (event) => {
    event.preventDefault();
    const name = newCourse.name.trim();
    const school = '未设置学院';
    if (!name) return;

    const id = `${Date.now()}`;
    const course = {
      id,
      repo: id,
      name,
      school,
      description: '',
      language: '',
      today: 0,
      contributors: ['我'],
      icon: BookOpen,
      accent: 'neutral',
      resources: 0,
      stars: 0
    };

    setCourseList((items) => [course, ...items]);
    setResourceMap((map) => ({ ...map, [id]: [] }));
    setSelectedCourse(course);
    setView('resources');
    setQuery('');
    setCreateOpen(false);
    setNewCourse({ name: '' });
  };

  const createResource = (event) => {
    event.preventDefault();
    const file = newResource.file;
    if (!file) return;
    const title = newResource.title.trim() || file.name;
    const fileUrl = URL.createObjectURL(file);

    const item = {
      id: `${Date.now()}`,
      title,
      type: newResource.type.trim() || '资料',
      year: `${new Date().getFullYear()}`,
      tags: newResource.tags
        .split(/[,，\s]+/)
        .map((tag) => tag.trim())
        .filter(Boolean),
      fileName: file.name,
      fileUrl,
      icon: FileText,
      accent: 'neutral'
    };

    setResourceMap((map) => ({
      ...map,
      [selectedCourse.id]: [item, ...(map[selectedCourse.id] ?? [])]
    }));
    setCourseList((items) =>
      items.map((course) =>
        course.id === selectedCourse.id ? { ...course, resources: course.resources + 1 } : course
      )
    );
    setSelectedCourse((course) => ({ ...course, resources: course.resources + 1 }));
    setResourceOpen(false);
    setNewResource({ title: '', type: '', tags: '', file: null });
  };

  const openResource = (item) => {
    if (!item.fileUrl) return;
    window.open(item.fileUrl, '_blank', 'noopener,noreferrer');
  };

  const downloadResource = (item) => {
    if (!item.fileUrl) return;
    const link = document.createElement('a');
    link.href = item.fileUrl;
    link.download = item.fileName || item.title;
    link.click();
  };

  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return courseList;
    if (view === 'courses') return courseList.filter((course) =>
      [course.name, course.school, course.id].some((value) => value.toLowerCase().includes(normalized))
    );
    return courseList;
  }, [courseList, query, view]);

  const courseResources = useMemo(() => {
    const items = resourceMap[selectedCourse.id] ?? [];
    const normalized = query.trim().toLowerCase();
    if (!normalized || view === 'courses') return items;
    return items.filter((item) =>
      [item.title, item.type, item.year, ...item.tags].some((value) => value.toLowerCase().includes(normalized))
    );
  }, [query, resourceMap, selectedCourse.id, view]);

  return (
    <main className="app-shell">
      <section className="workspace">
        <header className="topbar">
          <div className="brand compact-brand">
            <h1>?hub</h1>
          </div>
          <div className="search-shell">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜索课程、资料、年份、标签"
            />
          </div>
          <div className="top-actions">
            <button className="create-repo-button" onClick={() => setCreateOpen(true)}>创建资料库</button>
          </div>
        </header>

        {view === 'courses' ? (
          <section className="trending-page">
            <div className="trending-shell">
              <div className="trending-header">
                <div className="tab-group">
                  <button className="active">课程仓库</button>
                  <button>贡献者</button>
                </div>
                <div className="filters">
                  <button>学科：全部 <ChevronDown size={14} /></button>
                  <button>类型：全部 <ChevronDown size={14} /></button>
                  <button>时间：今天 <ChevronDown size={14} /></button>
                </div>
              </div>

              <div className="repo-list">
                {filteredCourses.map((course) => (
                  <article className="repo-row compact-row" key={course.id}>
                    <button
                      className="repo-main"
                      onClick={() => {
                        setSelectedCourse(course);
                        setView('resources');
                        setQuery('');
                  }}
                >
                  <div className="repo-title">
                    <span>{course.name}</span>
                      </div>
                      <div className="repo-meta">
                        <span className="built-by">贡献者</span>
                        <span className="avatar-stack">
                          {course.contributors.map((name) => <b key={name}>{name}</b>)}
                    </span>
                  </div>
                </button>
                <div className="repo-actions">
                  <button><Star size={15} />收藏</button>
                </div>
              </article>
            ))}
              </div>
            </div>
          </section>
        ) : (
          <section className="resource-section page-panel">
            <div className="detail-hero">
              <button className="back-button" onClick={() => setView('courses')}>
                <ChevronLeft size={18} />
                返回
              </button>
              <div>
                <h2>{selectedCourse.name}</h2>
              </div>
            </div>

            <div className="resource-head">
              <div className="resource-title">
                <h2>资料列表</h2>
              </div>
              <button className="add-button" onClick={() => setResourceOpen(true)}>
                新增资料
              </button>
            </div>

            <div className="resource-table">
              <div className="table-row table-head">
                <span>标题</span>
                <span>类型</span>
                <span>年份</span>
                <span>标签</span>
                <span>操作</span>
              </div>
              {courseResources.map((item) => (
                <div className="table-row" key={item.id ?? `${item.title}-${item.year}`}>
                  <div className="resource-name">
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
                    <button disabled={!item.fileUrl} onClick={() => openResource(item)}><Eye size={18} /></button>
                    <button disabled={!item.fileUrl} onClick={() => downloadResource(item)}><Download size={18} /></button>
                    <button><MoreHorizontal size={18} /></button>
                  </div>
                </div>
              ))}
              {courseResources.length === 0 && (
                <div className="empty-state">
                  <strong>暂无资料</strong>
                  <span>点击“新增资料”开始整理这个课程仓库。</span>
                </div>
              )}
            </div>
          </section>
        )}
        {createOpen && (
          <div className="modal-backdrop" role="presentation" onMouseDown={() => setCreateOpen(false)}>
            <form className="create-modal" onSubmit={createCourse} onMouseDown={(event) => event.stopPropagation()}>
              <div className="modal-head">
                <h2>创建资料库</h2>
                <button type="button" onClick={() => setCreateOpen(false)}>取消</button>
              </div>
              <label>
                名称
                <input
                  autoFocus
                  value={newCourse.name}
                  onChange={(event) => setNewCourse((value) => ({ ...value, name: event.target.value }))}
                  placeholder=""
                />
              </label>
              <button className="submit-button" type="submit">创建</button>
            </form>
          </div>
        )}
        {resourceOpen && (
          <div className="modal-backdrop" role="presentation" onMouseDown={() => setResourceOpen(false)}>
            <form className="create-modal" onSubmit={createResource} onMouseDown={(event) => event.stopPropagation()}>
              <div className="modal-head">
                <h2>新增资料</h2>
                <button type="button" onClick={() => setResourceOpen(false)}>取消</button>
              </div>
              <label>
                文件
                <input
                  autoFocus
                  type="file"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setNewResource((value) => ({
                      ...value,
                      file,
                      title: value.title || file?.name || ''
                    }));
                  }}
                />
              </label>
              <label>
                标题
                <input
                  value={newResource.title}
                  onChange={(event) => setNewResource((value) => ({ ...value, title: event.target.value }))}
                  placeholder=""
                />
              </label>
              <label>
                类型
                <input
                  value={newResource.type}
                  onChange={(event) => setNewResource((value) => ({ ...value, type: event.target.value }))}
                  placeholder=""
                />
              </label>
              <label>
                标签
                <input
                  value={newResource.tags}
                  onChange={(event) => setNewResource((value) => ({ ...value, tags: event.target.value }))}
                  placeholder=""
                />
              </label>
              <button className="submit-button" type="submit">创建</button>
            </form>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
