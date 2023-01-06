module.exports = {
  async redirects() {
    return [
      {
        source: '/past',
        destination: '/',
        permanent: true,
      },
    ]
  },
}