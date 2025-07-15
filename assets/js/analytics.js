// Vercel Analytics 官方推荐实现
// 使用 @vercel/analytics 的 inject() 方法
import { inject } from '@vercel/analytics';

// 检查是否为生产环境
const isProduction = typeof window !== 'undefined' &&
                    window.location.hostname !== 'localhost' &&
                    window.location.hostname !== '127.0.0.1' &&
                    !window.location.hostname.includes('localhost');

if (isProduction) {
    try {
        // 使用官方inject方法初始化Analytics
        inject();
    } catch (error) {
        // 静默处理初始化错误，避免影响用户体验
    }
}

// 导出自定义事件跟踪函数供其他模块使用
export { track } from '@vercel/analytics';

// 便捷的事件跟踪函数
export function trackEvent(eventName, properties = {}) {
    if (isProduction) {
        try {
            const { track } = require('@vercel/analytics');
            track(eventName, properties);
        } catch (error) {
            // 静默处理跟踪错误，避免影响用户体验
        }
    }
}