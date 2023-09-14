module.exports = {
    // other webpack configuration options
    devServer: {
      // other devServer options
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        // "sockPort": 'location',
        // allowedHosts: [
        //     'localhost',
        //     'host.com',
        //     'subdomain.host.com',
        //     'subdomain2.host.com',
        //     'host2.com',
        //   ],
      },
    },
  };
