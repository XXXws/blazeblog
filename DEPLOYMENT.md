# 🚀 BlazeBlog部署指南

## 📋 部署平台推荐

### 🥇 Vercel（推荐）
- **访问友好**：中国大陆访问速度快
- **免费额度**：100GB带宽/月，无限项目
- **自动部署**：GitHub推送即部署
- **性能优异**：全球CDN，Lighthouse>95分

### 🥈 Netlify（备选）
- **功能丰富**：表单处理、函数计算
- **免费额度**：100GB带宽/月
- **注意**：中国访问速度较慢

## 🛠️ Vercel部署步骤

### 1. 准备GitHub仓库
```bash
# 确保代码已推送到GitHub
git add .
git commit -m "准备部署到Vercel"
git push origin main
```

### 2. 配置baseURL
编辑 `config.yaml`：
```yaml
baseURL: 'https://your-domain.vercel.app'  # 替换为实际域名
```

### 3. Vercel部署
1. 访问 [vercel.com](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择BlazeBlog仓库
5. 配置项目设置：
   - **Framework Preset**: Other
   - **Build Command**: `npm run build`
   - **Output Directory**: `public`
   - **Install Command**: `npm install`

### 4. 环境变量配置
在Vercel项目设置中添加：
```
HUGO_VERSION=0.147.9
NODE_VERSION=18
HUGO_ENV=production
```

### 5. 自定义域名（可选）
1. 在Vercel项目设置中点击 "Domains"
2. 添加自定义域名
3. 配置DNS记录指向Vercel

## 📝 文章管理工作流

### 创建新文章
```bash
# 创建新文章
hugo new posts/my-new-article.md

# 编辑文章内容
# 文件位置: content/posts/my-new-article.md
```

### 文章Front Matter模板
```yaml
---
title: "文章标题"
date: 2025-07-13T20:00:00+08:00
lastmod: 2025-07-13T20:00:00+08:00
draft: false
author: "XXXws"
description: "文章描述"
tags: ["标签1", "标签2"]
categories: ["技术"]
series: ["系列名称"]  # 可选
featured: false  # 是否为精选文章
weight: 0  # 排序权重
---

文章内容...
```

### 本地预览
```bash
# 启动开发服务器
npm run dev

# 预览生产环境效果
npm run preview
```

### 发布文章
```bash
# 提交更改
git add .
git commit -m "新增文章: 文章标题"
git push origin main

# Vercel会自动构建和部署
```

## 🖼️ 图片和媒体管理

### 图片存储位置
```
static/images/           # 静态图片
content/posts/images/    # 文章专用图片
assets/images/          # 需要处理的图片
```

### 图片使用方法
```markdown
<!-- 静态图片 -->
![图片描述](/images/example.jpg)

<!-- 响应式图片（推荐） -->
{{< img src="example.jpg" alt="图片描述" >}}

<!-- Hero样式图片 -->
{{< img src="hero.jpg" alt="Hero图片" style="hero" >}}
```

### 图片优化建议
- 使用WebP/AVIF格式
- 图片大小控制在500KB以内
- 为图片添加alt属性
- 使用响应式图片shortcode

## 🔧 维护和更新

### 定期维护任务
```bash
# 清理构建产物
npm run clean

# 更新依赖
npm update

# 检查Hugo版本
hugo version
```

### 性能监控
- 使用Lighthouse检查性能
- 监控Core Web Vitals指标
- 定期检查加载速度

### 备份策略
- GitHub仓库作为主要备份
- 定期导出文章内容
- 保存重要配置文件

## 🚨 故障排除

### 常见问题
1. **构建失败**：检查Hugo版本和依赖
2. **样式丢失**：确认Tailwind CSS构建正常
3. **搜索不工作**：检查搜索索引生成
4. **图片不显示**：检查图片路径和格式

### 调试命令
```bash
# 本地构建测试
npm run build

# 检查构建产物
ls -la public/

# 验证搜索索引
cat public/index.json
```

## 🌐 其他部署平台配置

### Netlify部署
如果选择Netlify，使用以下配置：

1. **创建netlify.toml**：
```toml
[build]
  publish = "public"
  command = "npm run build"

[build.environment]
  HUGO_VERSION = "0.147.9"
  NODE_VERSION = "18"
  HUGO_ENV = "production"
```

2. **部署步骤**：
   - 访问 [netlify.com](https://netlify.com)
   - 连接GitHub仓库
   - 配置构建设置
   - 部署项目

### GitHub Pages部署
使用GitHub Actions自动部署：

1. **创建.github/workflows/deploy.yml**：
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    - name: Setup Hugo
      uses: peaceiris/actions-hugo@v2
      with:
        hugo-version: '0.147.9'
        extended: true
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    - name: Install dependencies
      run: npm install
    - name: Build
      run: npm run build
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./public
```

## 📊 性能优化建议

### Lighthouse目标
- **Performance**: >95分
- **Accessibility**: >95分
- **Best Practices**: >95分
- **SEO**: >95分

### 优化检查清单
- ✅ 图片格式优化（WebP/AVIF）
- ✅ CSS/JS压缩
- ✅ 缓存策略配置
- ✅ 懒加载实现
- ✅ 字体优化
- ✅ 移动端适配

### 监控工具
- Google PageSpeed Insights
- GTmetrix
- WebPageTest
- Vercel Analytics（如使用Vercel）

## 🔐 安全配置

### 安全头配置
已在vercel.json中配置：
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- Referrer-Policy

### HTTPS配置
- Vercel自动提供HTTPS
- 自定义域名免费SSL证书
- 强制HTTPS重定向

## 📈 SEO优化

### 基础SEO配置
- 完整的meta标签
- 结构化数据
- XML sitemap
- RSS feed
- 社交媒体标签

### 内容SEO建议
- 使用语义化HTML
- 优化标题和描述
- 添加alt属性
- 内部链接优化
- 关键词合理分布

## 🎯 部署后验证清单

### 功能验证
- [ ] 网站正常访问
- [ ] 主题切换功能
- [ ] 搜索功能正常
- [ ] 移动端适配
- [ ] 图片正常显示
- [ ] RSS订阅可用

### 性能验证
- [ ] Lighthouse评分>95
- [ ] 首屏加载<1秒
- [ ] LCP<2.5秒
- [ ] CLS<0.1

### SEO验证
- [ ] 搜索引擎收录
- [ ] 社交媒体预览
- [ ] 结构化数据验证
- [ ] sitemap可访问

---

**部署完成后，记得更新config.yaml中的baseURL为实际域名！**
