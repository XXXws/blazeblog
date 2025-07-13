/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.md',
    './assets/**/*.js'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // PaperMod风格主色调
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        // 扩展灰色系统，支持更细致的层次
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712'
        },
        // PaperMod风格的语义化颜色
        theme: {
          light: '#ffffff',
          dark: '#1a1a1a',
          'light-secondary': '#f8f9fa',
          'dark-secondary': '#2d2d2d'
        }
      },
      fontFamily: {
        // PaperMod风格字体系统
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'Source Code Pro',
          'Consolas',
          'Liberation Mono',
          'Menlo',
          'Courier',
          'monospace'
        ]
      },
      // PaperMod风格间距系统
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      // 扩展断点系统 - 添加xxs断点支持iPhone SE等极小屏幕
      screens: {
        'xxs': '320px',
        'xs': '475px',
        '3xl': '1600px'
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: 'inherit',
              textDecoration: 'underline',
              fontWeight: '500'
            },
            '[class~="lead"]': {
              color: 'inherit'
            },
            strong: {
              color: 'inherit'
            },
            'ol > li::before': {
              color: 'inherit'
            },
            'ul > li::before': {
              backgroundColor: 'currentColor'
            },
            hr: {
              borderColor: 'currentColor',
              opacity: 0.2
            },
            blockquote: {
              color: 'inherit',
              borderLeftColor: 'currentColor',
              opacity: 0.8
            },
            h1: {
              color: 'inherit'
            },
            h2: {
              color: 'inherit'
            },
            h3: {
              color: 'inherit'
            },
            h4: {
              color: 'inherit'
            },
            'figure figcaption': {
              color: 'inherit'
            },
            code: {
              color: 'inherit'
            },
            'a code': {
              color: 'inherit'
            },
            pre: {
              color: 'inherit',
              backgroundColor: 'transparent'
            },
            thead: {
              color: 'inherit',
              borderBottomColor: 'currentColor'
            },
            'tbody tr': {
              borderBottomColor: 'currentColor',
              opacity: 0.1
            }
          }
        }
      },
      // PaperMod风格动画系统
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-gentle': 'pulseGentle 2s infinite',
        'scale-in': 'scaleIn 0.2s ease-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        }
      },
      // PaperMod风格阴影系统
      boxShadow: {
        'soft': '0 2px 8px 0 rgba(0, 0, 0, 0.1)',
        'medium': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        'hard': '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ]
}
