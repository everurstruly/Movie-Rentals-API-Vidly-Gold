import config from "config";

export const getAsApiRoute = (apiRouteSuffix: string) => {
  const { apiPrefix, apiVersionNumber } = config.get<{
    [key: string]: string;
  }>("server");
  return `/${apiPrefix}/v${apiVersionNumber}${apiRouteSuffix}`;
};

export const getServerUrl = () => {
  const { protocol, domain, port } = config.get<{
    [key: string]: string;
  }>("server");

  return `${protocol}://${domain}:${port}`;
};

export const getDbUri = () => {
  const {
    connectionString,
    protocol,
    domain,
    name,
    port,
    username,
    password,
    query,
  } = config.get<{ [key: string]: string }>("database");

  if (connectionString) return connectionString;
  const _port = port ? `:${port}` : "";
  const _query = query ? `?${query}` : "";
  const credentials = username && password ? `${username}:${password}@` : "";
  return `${protocol}://${credentials}${domain}${_port}/${name}${_query}`;
};
