import * as httpStatus from 'src/common/plugins/http/http-status';
import { DomainHref } from '@/src/common/plugins/http/http-data-formatter';

export const getLinkForPageNumber = (size: number | null) => {
  return (count: number): DomainHref => {
    return `/home?page[number]=${count}${size ? `&page[size]=${size}` : ''}`;
  };
};

export const defaultMessageBuild = (msgCtx: any) => {
  const { statusCode, resourceName, message } = msgCtx;
  const statusPhrase = httpStatus.getStatusCodePhrase(statusCode);
  if (message) return message;
  if (resourceName) return `${resourceName} ${statusPhrase}`;
  return httpStatus.getStatusCodeMessage(statusCode);
};
