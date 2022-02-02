module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors: {
      primary: '#FC9A27',
      secondary: '#0F023E',
      white: '#FFFFFF',
    },
    fontFamily: {
      sans: ['Fuzzy Bubbles','system-ui', 'sans-serif'],
    },
    extend: {
      rotate: {
        '5': '-5deg',
      },
      margin: {
        'osm': '-2rem',
        'omd': '-4rem',
      }
    }
  },
  variants: {},
  plugins: []
};