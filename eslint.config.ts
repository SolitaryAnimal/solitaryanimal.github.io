import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    css: true,
    html: true,
  },
  vue: true,
  typescript: true,
}, {
  rules: {
    'style/brace-style': 'warn',
  },
})
