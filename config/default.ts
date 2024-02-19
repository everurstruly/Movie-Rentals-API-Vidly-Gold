module.exports = {
  server: {
    port: 8080,
    protocol: "https",
    domain: "domain",
    apiPrefix: "api",
    apiVersionNumber: "1",
  },
  database: {
    port: 27017,
    protocol: "mongo",
    domain: "localhost",
    name: "database-test",
    username: "",
    password: "",
    query: "",
  },
  logging: {
    hostsToWatch: "",
    errorsToIgnore: "",
  },
  cors: {
    allowDevToolsOrigin: false,
    allowedOrigins: "",
  },
  jwt: {
    issuer: {
      email: "",
      site: "",
    },
    secret: {
      privateAccessKey: "",
      privateRefreshKey: "",
    },
  },
};
