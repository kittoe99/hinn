/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#d97759',
          primary: '#d97759',
          focus: '#c46a4f',
          subtle: '#fdf5f2',
          muted: '#fae8e1',
          soft: '#f7dbd0',
        },
        page: '#fefefe',
        panel: '#f9f9f9',
        'panel-hover': '#f5f5f5',
        border: '#e5e5e5',
        text: {
          primary: '#000000',
          secondary: '#404040',
          tertiary: '#6b6b6b',
        }
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
