module.exports = {
    mongodbMemoryServerOptions: {
      binary: {
        version: '4.0.3',
        skipMD5: true,
      },
      instance: {
        dbName:'testdb',
      },
      autoStart: false,
    },
    mongoURLEnvName: 'mongodb+srv://test:nBQQiZcHeYW1S215@projecttest.dqvhrv1.mongodb.net/?retryWrites=true&w=majority',
  };