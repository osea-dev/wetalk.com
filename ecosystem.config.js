module.exports = {
  apps : [
   {
      name: "wetalk-home-prod",
      script: "yarn",
      args: "start",
      cwd: "./local-project/wetalk-home",
      env: {
        NODE_ENV: "production",
        API_BASE_URL: "http://159.138.28.189:5001"
      }
    },
  ]
};
