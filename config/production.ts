import dotenv from "dotenv";

dotenv.config();

module.exports = {
  server: {
    port: process.env.SERVER_PORT,
    protocol: process.env.SERVER_PROTOCOL,
    domain: process.env.SERVER_DOMAIN,
    apiPrefix: process.env.SERVER_API_PREFIX,
    apiVersionNumber: process.env.SERVER_API_VERSION_NUMBER,
  },
  database: {
    port: process.env.DATABASE_PORT,
    protocol: process.env.DATABASE_PROTOCOL,
    domain: process.env.DATABASE_DOMAIN,
    name: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    query: process.env.DATABASE_QUERY,
  },
  logging: {
    hostsToWatch: process.env.LOGGER_HOSTS_TO_WATCH,
    errorsToIgnore: process.env.LOGGER_ERRORS_TO_IGNORE,
  },
  cors: {
    allowDevToolsOrigin: process.env.CORS_ALLOW_API_DEV_TOOLS_ORIGIN,
    allowedOrigins: process.env.CORS_ALLOWED_ORIGINS,
  },
  jwt: {
    issuer: {
      email: process.env.JWT_ISSUER_EMAIL,
      site: process.env.JWT_ISSUER_SITE,
    },
    secret: {
      privateAccessKey: process.env.JWT_SECRET_PRIVATE_ACCESS_KEY,
      privateRefreshKey: process.env.JWT_SECRET_PRIVATE_REFRESH_KEY,
    },
  },
};
