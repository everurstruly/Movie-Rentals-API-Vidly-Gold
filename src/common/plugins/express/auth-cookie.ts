import express from 'express';
import * as datetimeUtils from 'src/common/utils/datatype/datetime-utils';

const defaultCookieIdentity = {
  name: 'auth',
  type: 'Bearer',
};

const defaultCookieOptions = {
  domain: 'domain',
  sameSite: 'none' as express.CookieOptions['sameSite'],
  httpOnly: true,
  secure: true,
  maxAge: datetimeUtils.getMacroTimeAsMilliSeconds('1h'),
};

class AuthTokenCookie {
  readonly name: string;
  private identity: typeof defaultCookieIdentity;
  private options: typeof defaultCookieOptions;

  constructor(
    cookieIdentity: WithRequired<Partial<typeof defaultCookieIdentity>, 'name'>,
    cookieOptions: WithRequired<
      Partial<
        Pick<typeof defaultCookieOptions, 'domain' | 'secure' | 'maxAge'>
      >,
      'domain'
    >
  ) {
    this.name = cookieIdentity.name;
    this.identity = { ...defaultCookieIdentity, ...cookieIdentity };
    this.options = { ...defaultCookieOptions, ...cookieOptions };
  }

  overwriteOptions = (
    overwrites = {} as Partial<typeof defaultCookieOptions>
  ) => {
    const overwrittenOptions = { ...this.options, ...overwrites };
    this.options = overwrittenOptions;
  };

  attach = (res: express.Response, tokenValue: string) => {
    res.cookie(this.name, `${this.identity.type} ${tokenValue}`, this.options);
  };

  detach = (res: express.Response) => {
    res.clearCookie(this.name, this.options);
  };

  extract = (req: express.Request) => {
    return req.cookies[this.identity.name];
  };

  peek = () => {
    return {
      ...this.identity,
      ...this.options,
    };
  };
}
