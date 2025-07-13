# BlazeBlog 快速部署脚本
# 使用方法: .\scripts\deploy.ps1 "提交信息"

param(
    [string]$CommitMessage = "更新内容"
)

Write-Host "🚀 BlazeBlog 部署脚本启动..." -ForegroundColor Green

# 检查是否在正确的目录
if (-not (Test-Path "config.yaml")) {
    Write-Host "❌ 错误: 请在BlazeBlog项目根目录运行此脚本" -ForegroundColor Red
    exit 1
}

# 清理构建产物
Write-Host "🧹 清理构建产物..." -ForegroundColor Yellow
npm run clean

# 安装依赖
Write-Host "📦 检查依赖..." -ForegroundColor Yellow
npm install

# 构建项目
Write-Host "🔨 构建项目..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 构建失败，请检查错误信息" -ForegroundColor Red
    exit 1
}

# 检查构建产物
if (-not (Test-Path "public")) {
    Write-Host "❌ 构建产物不存在，构建可能失败" -ForegroundColor Red
    exit 1
}

Write-Host "✅ 构建成功" -ForegroundColor Green

# Git操作
Write-Host "📝 提交更改..." -ForegroundColor Yellow

# 检查是否有更改
$status = git status --porcelain
if (-not $status) {
    Write-Host "ℹ️ 没有检测到更改，跳过提交" -ForegroundColor Blue
} else {
    git add .
    git commit -m $CommitMessage
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Git提交失败" -ForegroundColor Red
        exit 1
    }
    
    # 推送到远程仓库
    Write-Host "🚀 推送到远程仓库..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ 推送失败，请检查网络连接和权限" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "✅ 推送成功" -ForegroundColor Green
}

Write-Host "🎉 部署完成！" -ForegroundColor Green
Write-Host "📱 Vercel将自动构建和部署您的网站" -ForegroundColor Blue
Write-Host "🔗 请访问Vercel控制台查看部署状态" -ForegroundColor Blue
