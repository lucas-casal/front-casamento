import type { Config } from 'tailwindcss'


const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        tiffany: '#0abab5',

      },
      fontFamily: {
        'aboreto': ['Aboreto', 'sans-serif' ],
        'gwendolyn': ['Gwendolyn', 'sans-serif'],
        'redressed': ['Redressed', 'sans-serif']
      },
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      width: {
        'bgphoto': '1500px'
      },
      minHeight: {
        '10': '2.5rem'
      },
      screens: {
        '370': '370px',
        '1000': '1000px',
        '1245': '1245px',
        'lg': '1360px',
        '10xl': '2500px'

      },
    },
  },
  plugins: [],
}
export default config
