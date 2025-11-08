import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'

export default {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [forms],
} satisfies Config
