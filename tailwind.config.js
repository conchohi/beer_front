/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      
      boxShadow: {
        'neon-yellow': '0 0 5px rgba(255, 255, 0, 0.5), 0 0 10px rgba(255, 255, 0, 0.5), 0 0 15px rgba(255, 255, 0, 0.5), 0 0 20px rgba(255, 255, 0, 0.5)',
      },
      
    },
  },
  plugins: [],
}

