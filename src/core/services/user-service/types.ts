import * as datetimeUtils from 'src/common/utils/datatype/datetime-utils';

export type SessionTokenOptions = {
  accessExpiresIn: datetimeUtils.MacroTime | number;
  refreshExpiresIn: datetimeUtils.MacroTime | number;
};

export type PasswordChangeTicketOptions = {
  expiresIn: datetimeUtils.MacroTime | number;
};

export type PasswordChangeTicket = {
  userId: string;
  code: string;
};