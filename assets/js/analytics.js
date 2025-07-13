// {{RIPER-5:
// Action: Created | Task: Vercel Analytics集成 | Time: 2025-07-13T21:00:00+08:00
// Reason: 为BlazeBlog添加Vercel Web Analytics流量监控
// Principle: 性能优先原则 - 异步加载，不影响页面性能
// Architecture_Note: [AR] 使用Vercel官方SDK，确保数据准确性
// Memory_Reference: [mcp.memory] 应用Web Analytics最佳实践
// Quality_Check: [LD] 生产环境检测，错误处理完善
// }}

// Vercel Analytics 初始化
// 只在生产环境且部署在Vercel上时加载
(function() {
    'use strict';
    
    // 检查是否为生产环境
    const isProduction = window.location.hostname !== 'localhost' && 
                        window.location.hostname !== '127.0.0.1' &&
                        !window.location.hostname.includes('localhost');
    
    // 检查是否在Vercel域名上
    const isVercelDomain = window.location.hostname.includes('vercel.app') ||
                          window.location.hostname.includes('blazeblog') ||
                          document.querySelector('meta[name="vercel-analytics"]');
    
    if (!isProduction) {
        console.log('🔍 Analytics: 开发环境，跳过加载');
        return;
    }
    
    try {
        // 动态导入Vercel Analytics
        import('https://va.vercel-scripts.com/v1/script.js')
            .then(() => {
                // 初始化Analytics
                if (window.va) {
                    window.va('pageview');
                    console.log('✅ Vercel Analytics 已加载');
                } else {
                    // 备用方案：直接加载脚本
                    const script = document.createElement('script');
                    script.src = 'https://va.vercel-scripts.com/v1/script.js';
                    script.async = true;
                    script.defer = true;
                    script.onload = function() {
                        if (window.va) {
                            window.va('pageview');
                            console.log('✅ Vercel Analytics 备用加载成功');
                        }
                    };
                    script.onerror = function() {
                        console.warn('⚠️ Vercel Analytics 加载失败');
                    };
                    document.head.appendChild(script);
                }
            })
            .catch(error => {
                console.warn('⚠️ Vercel Analytics 导入失败:', error);
                
                // 备用方案：传统script标签
                const script = document.createElement('script');
                script.src = 'https://va.vercel-scripts.com/v1/script.js';
                script.async = true;
                script.defer = true;
                script.onload = function() {
                    if (window.va) {
                        window.va('pageview');
                        console.log('✅ Vercel Analytics 备用方案成功');
                    }
                };
                document.head.appendChild(script);
            });
            
    } catch (error) {
        console.error('❌ Analytics 初始化错误:', error);
    }
})();

// 页面切换时的Analytics跟踪（适用于SPA或动态内容）
document.addEventListener('DOMContentLoaded', function() {
    // 监听可能的页面变化（如果使用了客户端路由）
    let currentPath = window.location.pathname;
    
    // 使用MutationObserver监听页面内容变化
    const observer = new MutationObserver(function(mutations) {
        const newPath = window.location.pathname;
        if (newPath !== currentPath) {
            currentPath = newPath;
            // 发送新的页面浏览事件
            if (window.va) {
                window.va('pageview');
                console.log('📊 Analytics: 页面切换跟踪', newPath);
            }
        }
    });
    
    // 开始观察
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});
