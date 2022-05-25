import { t } from './intl';
import { AnyAction } from '@reduxjs/toolkit';

export enum RequestStatusType {
  loading = 'loading',
  failed = 'failed',
  inactive = 'inactive',
  successful = 'successful',
}
export interface IRequestStatusLoading {
  type: RequestStatusType.loading;
}

export interface IRequestStatusFailed {
  type: RequestStatusType.failed;
  errorCode?: number;
  error?: string;
}

export interface IRequestStatusSuccessful {
  type: RequestStatusType.successful;
}

export interface IRequestStatusInactive {
  type: RequestStatusType.inactive;
  message?: string;
}

export type RequestStatus =
  | IRequestStatusLoading
  | IRequestStatusFailed
  | IRequestStatusInactive
  | IRequestStatusSuccessful;

export function requestLoading(progress?: number) {
  return { progress, type: RequestStatusType.loading } as RequestStatus;
}

export function requestFailed(error?: string, errorCode?: number) {
  return { error, errorCode, type: RequestStatusType.failed } as RequestStatus;
}

export function requestSuccessful(): RequestStatus {
  return { type: RequestStatusType.successful };
}

export function requestInactive(message?: string): RequestStatus {
  return { type: RequestStatusType.inactive, message };
}

export function isRequestLoading(status: RequestStatus) {
  return status.type === RequestStatusType.loading;
}

export function isRequestFailed(status: RequestStatus) {
  return status.type === RequestStatusType.failed;
}

export function isRequestSuccessful(status: RequestStatus) {
  return status.type === RequestStatusType.successful;
}

export function isRequestInactive(status: RequestStatus) {
  return status.type === RequestStatusType.inactive;
}

/**
 * Extract error text from the server response
 * @param action
 */
export const extractActionErrorText = (action: AnyAction): string => {
  try {
    if (action.error && action.error.message) {
      return action.error.message;
    }

    return t('errors.unknown');
  } catch (error) {
    return t('errors.unknown');
  }
};
