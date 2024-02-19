import config from 'config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as userSchema from 'src/core/schema/user-schema';
import * as datetimeUtils from 'src/common/utils/datatype/datetime-utils';
import { UserDocument } from 'src/core/models/user-model';
import { PasswordChangeTicket, PasswordChangeTicketOptions } from './index';

export const getHashedPassword = async (plainPassword: string) => {
  const PASSWORD_HASH_ROUNDS = 12;
  const salt = await bcrypt.genSalt(PASSWORD_HASH_ROUNDS);
  return bcrypt.hash(plainPassword, salt);
};

export const isMatchingPasswords = async (
  hashedPassword: string,
  plainPassword: string
) => {
  return bcrypt.compare(hashedPassword, plainPassword);
};

export const LOGIN_SESSION = {
  subject: 'ACCOUNT_LOGIN',

  _generateJwt: (options: {
    secret: string;
    issuer: string;
    payload: any;
    expiresIn: number | datetimeUtils.MacroTime;
  }) => {
    const { secret, issuer, payload, expiresIn } = options;
    return jwt.sign({ packet: payload }, secret, { expiresIn, issuer });
  },

  _verifyJwt: <P>(options: { secret: string; token: string }) => {
    const { secret, token } = options;
    return jwt.verify(token, secret) as jwt.JwtPayload & { packet: P };
  },

  generateAccessJwt(options: {
    expiresIn: datetimeUtils.MacroTime | number;
    payload: userSchema.LoginSessionTokenPayloadInput;
  }) {
    const { expiresIn, payload } = options;
    return this._generateJwt({
      issuer: config.get('jwt.issuer.site'),
      secret: config.get('jwt.secret.privateAccessKey'),
      expiresIn,
      payload,
    });
  },
  verifyAccessJwt(token: string) {
    return this._verifyJwt<userSchema.LoginSessionTokenPayloadInput>({
      secret: config.get('jwt.secret.privateAccessKey'),
      token,
    });
  },

  generateRefreshJwt(options: { expiresIn: datetimeUtils.MacroTime | number }) {
    const { expiresIn } = options;
    return this._generateJwt({
      issuer: config.get('jwt.issuer.site'),
      secret: config.get('jwt.secret.privateAccessKey'),
      payload: {},
      expiresIn,
    });
  },
  verifyRefreshJwt(token: string) {
    return this._verifyJwt<userSchema.LoginSessionTokenPayloadInput>({
      secret: config.get('jwt.secret.privateAccessKey'),
      token,
    });
  },
};

const getPasswordChangeTicketGenerationSecret = (user: UserDocument) => {
  const secret = 'secret';
  return `${secret}${user.password}`;
};

export const getPasswordChangeTicket = (
  user: UserDocument,
  options: PasswordChangeTicketOptions
): PasswordChangeTicket => {
  const { expiresIn } = options;
  const secret = getPasswordChangeTicketGenerationSecret(user);
  const code = jwt.sign(crypto.randomUUID(), secret, { expiresIn });
  return { userId: user._id.toString(), code };
};

export const verifyPasswordChangeTicket = (
  user: UserDocument,
  ticket: PasswordChangeTicket
) => {
  const { code } = ticket;
  jwt.verify(code, getPasswordChangeTicketGenerationSecret(user));
  return ticket;
};
