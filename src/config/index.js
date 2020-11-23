export default {
  baseUrl: process.env.NODE_ENV === 'production' ? 'http://8.129.24.7:3000' : 'http://localhost:3000',
  publicBaseUrl: [/^\/public/, /^\/login/]
}
