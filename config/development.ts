module.exports = {
  server: {
    port: 3000,
    protocol: "http",
    domain: "localhost",
    apiPrefix: "api",
    apiVersionNumber: "1",
  },
  database: {
    port: 27017, // ""
    protocol: "mongodb", // "mongodb+srv"
    domain: "localhost", // "cluster5-eeev8.mongodb.net"
    name: "vidly-rentals-api-nts",
    username: "", // username
    password: "", // password
    query: "", // retryWrites=true
  },
  logging: {
    hostsToWatch: "",
    errorsToIgnore: "",
  },
  cors: {
    allowDevToolsOrigin: true,
    allowedOrigins: `http://localhost:3000`,
  },
  jwt: {
    issuer: {
      email: "oghenetefa@gmail.com",
      site: "https://github.com/oghenetefa",
    },
    secret: {
      privateAccessKey: "unsecure-access-key",
      privateRefreshKey: "unsecure-refresh-key",
    },
  },
};
