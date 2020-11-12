export default {
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://8.129.24.7:3000' : 'http://localhost:36742',
  publicBaseUrl: [/^\/public/, /^\/login/]
}
