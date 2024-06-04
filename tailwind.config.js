/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        '20': '5rem', // 20 값 추가
        '25': '6.25rem', // 25 값 추가
      },
      boxShadow: {
        'neon-yellow': '0 0 5px rgba(255, 255, 0, 0.5), 0 0 10px rgba(255, 255, 0, 0.5), 0 0 15px rgba(255, 255, 0, 0.5), 0 0 20px rgba(255, 255, 0, 0.5)',
      },
      screens: {
        sm: '640px',
        md: '985px', // Custom breakpoint
        lg: '1024px',
        xl: '1280px',
      },
      
    },
  },
  plugins: [],
}

