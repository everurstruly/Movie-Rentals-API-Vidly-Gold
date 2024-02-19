export const getAuthorizationTokenAttributes = (headerToken: string) => {
  const raw = headerToken.trim();
  const [rawType, rawValue] = raw.split(' ');
  const type = rawType && rawValue ? rawType.toLowerCase() : null;
  const value = rawType && !rawValue ? rawType : rawValue;
  return { type, value, raw };
};

export const getAuthorizationTokens = (header: string) => {
  return header
    .split(',')
    .filter((tkn) => tkn)
    .reduce((tokens, tkn) => {
      const tokenAttrs = getAuthorizationTokenAttributes(tkn);
      if (tokenAttrs.type) tokens[tokenAttrs.type] = tokenAttrs;
      return tokens;
    }, {} as Record<string, ReturnType<typeof getAuthorizationTokenAttributes>>);
};

export const findAuthorizationToken = (
  header: string = '',
  tokenType: string
) => {
  const token = getAuthorizationTokens(header)[tokenType.toLowerCase()];
  if (token === undefined) return null;
  return token;
};
