export default {
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://47.115.56.50:10241' : 'http://localhost:3000',
  publicBaseUrl: [/^\/public/, /^\/login/]
}
