/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class',
  content: ['./src/**/*.{svelte,js,ts,html}'],
  theme: {
    extend: {
      colors: {
        primary: '#803f9b',
        'on-surface': '#2e2f2d',
        'surface': '#f7f6f2',
        'outline': '#767774',
        'success-neon': '#39ff14',
      },
      fontFamily: {
        headline: ['Epilogue', 'sans-serif'],
        body: ['Plus Jakarta Sans', 'sans-serif'],
        label: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}