module.exports = {
  apps : [{
    name: "wetalk-web",
    script: "serve",
    env: {
      PM2_SERVE_PATH: 'C:\wetalk\wetalk-web', // The path to the directory you want to serve
      PM2_SERVE_PORT: 30000,     // The port you want serve to use
      PM2_SERVE_SPA: 'true',    // Serve as a Single Page Application
      PM2_SERVE_HOMEPAGE: '/index.html' // Default homepage
    }
  }]
};