# 📝 BlazeBlog内容管理指南

## 📁 目录结构规范

### 标准目录结构
```
content/
├── posts/              # 博客文章
│   ├── 2025/           # 按年份组织（可选）
│   │   ├── 07/         # 按月份组织（可选）
│   │   └── article.md  # 文章文件
│   └── article.md      # 直接放在posts下
├── pages/              # 静态页面
│   ├── about.md        # 关于页面
│   └── contact.md      # 联系页面
└── _index.md           # 首页内容
```

### 文件命名规范
```bash
# 推荐命名方式（英文，短横线分隔）
my-first-post.md
hugo-tutorial-guide.md
javascript-best-practices.md

# 避免的命名方式
我的第一篇文章.md          # 避免中文
My First Post.md          # 避免空格
myFirstPost.md           # 避免驼峰命名
```

## ✍️ 创建新文章

### 1. 使用Hugo命令创建
```bash
# 创建新文章（推荐）
hugo new posts/my-new-article.md

# 创建带日期的文章
hugo new posts/2025/07/my-new-article.md

# 创建静态页面
hugo new pages/about.md
```

### 2. 手动创建文件
在 `content/posts/` 目录下创建新的 `.md` 文件。

## 📋 Front Matter模板

### 标准文章模板
```yaml
---
title: "文章标题"
date: 2025-07-13T20:00:00+08:00
lastmod: 2025-07-13T20:00:00+08:00
draft: false
author: "XXXws"
description: "文章简短描述，用于SEO和社交媒体分享"
summary: "文章摘要，显示在文章列表中"

# 分类和标签
categories: ["技术"]
tags: ["Hugo", "JAMstack", "前端"]
series: ["Hugo教程系列"]  # 可选，用于文章系列

# 特殊设置
featured: false    # 是否为精选文章
weight: 0         # 排序权重，数字越小越靠前
toc: true         # 是否显示目录
math: false       # 是否启用数学公式
mermaid: false    # 是否启用Mermaid图表

# SEO优化
keywords: ["关键词1", "关键词2"]
images: ["/images/article-cover.jpg"]  # 社交媒体分享图片

# 自定义参数
cover:
  image: "/images/cover.jpg"
  alt: "封面图片描述"
  caption: "图片说明"
---

文章内容开始...
```

### 页面模板
```yaml
---
title: "页面标题"
date: 2025-07-13T20:00:00+08:00
lastmod: 2025-07-13T20:00:00+08:00
draft: false
type: "page"
layout: "single"
description: "页面描述"
---

页面内容...
```

## 🖼️ 图片管理

### 图片存储位置
```
static/images/              # 全局图片资源
├── covers/                 # 文章封面图
├── posts/                  # 文章内图片
│   ├── article-name/       # 按文章组织
│   └── common/             # 通用图片
└── ui/                     # UI相关图片
```

### 图片使用方法

#### 1. 静态图片引用
```markdown
![图片描述](/images/example.jpg)
```

#### 2. 响应式图片（推荐）
```markdown
{{< img src="example.jpg" alt="图片描述" >}}
{{< img src="hero.jpg" alt="Hero图片" style="hero" >}}
{{< img src="thumb.jpg" alt="缩略图" style="thumbnail" >}}
```

#### 3. 图片优化建议
- **格式**：优先使用WebP/AVIF，提供JPEG/PNG作为fallback
- **大小**：文章图片控制在500KB以内，封面图1MB以内
- **尺寸**：文章图片宽度建议800-1200px
- **命名**：使用描述性文件名，如 `hugo-deployment-process.jpg`

## 📝 Markdown写作规范

### 标题层级
```markdown
# 一级标题（文章标题，Front Matter中定义）
## 二级标题（章节标题）
### 三级标题（小节标题）
#### 四级标题（子小节）
```

### 代码块
```markdown
# 行内代码
使用 `npm install` 安装依赖

# 代码块
```bash
npm run build
```

# 带语法高亮的代码块
```javascript
function hello() {
  console.log('Hello, World!');
}
```
```

### 链接和引用
```markdown
# 外部链接
[Hugo官网](https://gohugo.io)

# 内部链接
[关于页面](/pages/about/)
[另一篇文章](/posts/another-article/)

# 引用
> 这是一个引用块
> 可以包含多行内容
```

### 列表和表格
```markdown
# 无序列表
- 项目1
- 项目2
  - 子项目2.1
  - 子项目2.2

# 有序列表
1. 第一步
2. 第二步
3. 第三步

# 表格
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容1 | 内容2 | 内容3 |
```

## 🔄 Git工作流

### 标准工作流程
```bash
# 1. 创建新文章
hugo new posts/my-article.md

# 2. 编辑文章内容
# 使用你喜欢的编辑器编辑文章

# 3. 本地预览
npm run dev
# 访问 http://localhost:1313 预览效果

# 4. 提交更改
git add .
git commit -m "新增文章: 文章标题"

# 5. 推送到远程仓库
git push origin main

# 6. 自动部署
# Vercel会自动检测推送并部署
```

### 分支管理（可选）
```bash
# 创建文章分支
git checkout -b article/new-post

# 编辑和提交
git add .
git commit -m "新增文章: 文章标题"
git push origin article/new-post

# 创建Pull Request进行审核
# 合并到main分支后自动部署
```

## 🔍 预览和测试

### 本地预览
```bash
# 开发模式（包含草稿）
npm run dev

# 生产模式预览
npm run preview

# 构建测试
npm run build
```

### 预览检查清单
- [ ] 文章标题和内容正确
- [ ] 图片正常显示
- [ ] 链接可以正常访问
- [ ] 代码块语法高亮正确
- [ ] 移动端显示正常
- [ ] 搜索功能可以找到文章

## 📊 内容优化建议

### SEO优化
- 标题包含关键词，长度控制在60字符以内
- 描述简洁明了，长度控制在160字符以内
- 使用合适的标签和分类
- 添加内部链接和外部权威链接

### 用户体验优化
- 文章结构清晰，使用适当的标题层级
- 段落长度适中，避免大段文字
- 添加目录（TOC）方便导航
- 使用列表和表格提高可读性

### 内容质量
- 确保内容原创性和准确性
- 提供实用的代码示例
- 添加相关的参考链接
- 定期更新过时的内容

## 🗂️ 内容组织策略

### 分类建议
- **技术**：技术教程、工具介绍
- **项目**：项目经验、案例分析
- **思考**：个人见解、行业观察

### 标签策略
- 使用具体的技术标签：Hugo、React、JavaScript
- 添加主题标签：前端、后端、DevOps
- 包含难度标签：入门、进阶、高级

### 系列文章
```yaml
# 在Front Matter中指定系列
series: ["Hugo完全指南"]

# 系列文章会自动关联和导航
```

---

**记住：好的内容是博客成功的关键！专注于提供有价值的信息和良好的阅读体验。**
