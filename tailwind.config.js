/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './Components/**/*.{js,jsx,ts,tsx}',
    './scenes/*.{js,jsx,ts,tsx}',
    './scenes/**/*.{js,jsx,ts,tsx}',
    './scenes/AuthScene/*.{js,jsx,ts,tsx}',
    './scenes/AuthScene/Login/*.{js,jsx,ts,tsx}',
    './scenes/AuthScene/Register/*.{js,jsx,ts,tsx}',
    './scenes/HomeScene/*.{js,jsx,ts,tsx}',
    './scenes/HomeScene/Settings/*.{js,jsx,ts,tsx}',
    './scenes/HomeScene/Stats/*.{js,jsx,ts,tsx}',
    './scenes/HomeScene/LogGame/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
