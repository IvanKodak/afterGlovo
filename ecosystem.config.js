module.exports = {
    apps: [
      {
        name: "afterGlovo-api",
        script: "./app.js",
        exec_mode: "cluster",
        watch: true,
        instances: "max",
        ignore_watch: ["node_modules"],
        env: {
          NODE_ENV: "development"
        },
        env_production: {
          NODE_ENV: "production"
        }
      }
    ]
  };