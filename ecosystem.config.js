module.exports = {
  apps : [
   {
      name: "wetalk-home-prod",
      script: './node_modules/nuxt/bin/nuxt-start',
      args: "start",
      cwd: "./local-project/wetalk-home",
      env: {
        NODE_ENV: "production",
        API_BASE_URL: "http://159.138.28.189:5001"
      }
    },
  ]
};
