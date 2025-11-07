export const apps = [
  {
    name: "hacknlearn-server",
    script: "./src/server.js",
    exec_mode: "cluster",
    instances: 1,
    env: {
      NODE_ENV: "production",
      OPENAI_API_KEY: "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",
      EXPLAIN_MODEL: "gpt-5",
      PORT: 3000
    }
  },
  {
    name: "practice-cleaner",
    script: "./src/cron/cleanup.js",
    cron_restart: "*/5 * * * *",
    autorestart: true
  }
];
