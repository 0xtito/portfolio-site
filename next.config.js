module.exports = {
  httpAgentOptions: {
    keepAlive: false,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.gif$/,
      use: [
        {
          loader: "url-loader",
          options: {
            limit: 8192,
            mimetype: "image/gif",
            fallback: "file-loader",
            publicPath: "/.next/static/images/",
            outputPath: "static/images/",
          },
        },
      ],
    });
    return config;
  },
  images: {
    domains: [
      "media.artblocks.io",
      "media.artblocks.io",
      "ipfs.io",
      "kinesis.art",
      "googleusercontent.com",
      "github.com",
      "api.pudgypenguins.io",
    ],
    remotePatterns: [
      {
        protocol: "https",
        port: "",
        pathname: "/116006098.png",
        hostname: "media.artblocks.io",
      },
      {
        protocol: "https",
        port: "",
        pathname:
          "/ipfs/QmZfGmXqVwAEaEWMnCmMLowjCdN9QJPk79SbXq3gmk1VfL/9667.jpg",
        hostname: "media.artblocks.io",
      },
      {
        protocol: "https",
        port: "",
        pathname: "/ipfs/QmYHkHqChRBrBrCAfz3MLs2fh3i5jbprSaRRegahUkkY19",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        port: "",
        pathname:
          "/ipfs/QmZfGmXqVwAEaEWMnCmMLowjCdN9QJPk79SbXq3gmk1VfL/1002.jpg",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        port: "",
        pathname: "/ipfs/QmfM8it9QHW3dKQFwZ8Zisn6ZbDBmYg44ooKCL17RhBQyS",
        hostname: "ipfs.io",
      },
      {
        protocol: "https",
        port: "",
        pathname: "/api/image/1059",
        hostname: "kinesis.art",
      },
      {
        protocol: "https",
        port: "",
        pathname: "/api/image/1000468",
        hostname: "kinesis.art",
      },
      {
        protocol: "https",
        port: "",
        pathname:
          "/DvMZwhyaIKnfOPy1ucG8ygcEb5GgaYSUl3kNF9UqExNjGcBzH3pKcv9Xlr2882-7N-nWWaIwy45JP28FgmRKvNrs8JVSV1QBxYeW",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        port: "",
        pathname:
          "/0xtito/portfolio-site/blob/master/public/images/gifs/atlanta.gif?raw=true",
        hostname: "github.com",
      },
      {
        protocol: "https",
        port: "",
        pathname:
          "/0xtito/portfolio-site/blob/master/public/images/gifs/kafka.gif?raw=true",
        hostname: "github.com",
      },
      {
        protocol: "https",
        port: "",
        pathname: "/lil/image/4495",
        hostname: "api.pudgypenguins.io",
      },
    ],
  },
};
