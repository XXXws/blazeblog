# BlazeBlog 新文章创建脚本
# 使用方法: .\scripts\new-post.ps1 "文章标题" "文章描述"

param(
    [Parameter(Mandatory=$true)]
    [string]$Title,
    
    [string]$Description = "",
    [string]$Category = "技术",
    [string]$Tags = "",
    [switch]$Featured = $false
)

Write-Host "📝 创建新文章..." -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "config.yaml")) {
    Write-Host "❌ 错误: 请在BlazeBlog项目根目录运行此脚本" -ForegroundColor Red
    exit 1
}

# 生成文件名（转换为URL友好格式）
$FileName = $Title.ToLower() -replace '[^\w\s-]', '' -replace '\s+', '-'
$FilePath = "content/posts/$FileName.md"

# 检查文件是否已存在
if (Test-Path $FilePath) {
    Write-Host "❌ 文件已存在: $FilePath" -ForegroundColor Red
    exit 1
}

# 获取当前时间
$CurrentTime = Get-Date -Format "yyyy-MM-ddTHH:mm:sszzz"

# 处理标签
$TagsArray = if ($Tags) { 
    ($Tags -split ',').Trim() | ForEach-Object { "`"$_`"" }
} else { 
    @("`"Hugo`"", "`"BlazeBlog`"") 
}
$TagsString = $TagsArray -join ', '

# 生成Front Matter
$FrontMatter = @"
---
title: "$Title"
date: $CurrentTime
lastmod: $CurrentTime
draft: false
author: "$(git config user.name)"
description: "$Description"
summary: "$Description"

# 分类和标签
categories: ["$Category"]
tags: [$TagsString]

# 特殊设置
featured: $($Featured.ToString().ToLower())
weight: 0
toc: true
math: false
mermaid: false

# SEO优化
keywords: [$TagsString]
images: []

# 自定义参数
cover:
  image: ""
  alt: ""
  caption: ""
---

# $Title

## 简介

在这里写文章的简介...

## 主要内容

### 小节1

内容...

### 小节2

内容...

## 总结

总结文章的主要观点...

## 参考资料

- [参考链接1](https://example.com)
- [参考链接2](https://example.com)
"@

# 创建文件
try {
    $FrontMatter | Out-File -FilePath $FilePath -Encoding UTF8
    Write-Host "✅ 文章创建成功: $FilePath" -ForegroundColor Green
    
    # 显示文件信息
    Write-Host "📄 文章信息:" -ForegroundColor Blue
    Write-Host "   标题: $Title" -ForegroundColor White
    Write-Host "   文件: $FilePath" -ForegroundColor White
    Write-Host "   分类: $Category" -ForegroundColor White
    Write-Host "   标签: $($TagsArray -join ', ')" -ForegroundColor White
    Write-Host "   精选: $Featured" -ForegroundColor White
    
    # 提示下一步操作
    Write-Host "`n📝 下一步操作:" -ForegroundColor Yellow
    Write-Host "1. 编辑文章内容: $FilePath" -ForegroundColor White
    Write-Host "2. 本地预览: npm run dev" -ForegroundColor White
    Write-Host "3. 部署发布: .\scripts\deploy.ps1 `"新增文章: $Title`"" -ForegroundColor White
    
} catch {
    Write-Host "❌ 创建文件失败: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
"@
