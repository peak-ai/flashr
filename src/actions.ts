import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES } from './constants';

export interface AddMessageParamsInterface {
  id: string;
  message: string;
  messageType?: string;
  timeout?: number;
  position?: string;
  icon?: string;
  onActionClick?: () => void;
  onClick?: () => void;
  className?: string;
  priority?: number;
}
export interface AddMessageActionInterface {
  type: string;
  payload: AddMessageParamsInterface;
  force?: boolean;
}
export type AddMessageActionCreator = (
  payload: AddMessageParamsInterface,
  force?: boolean
) => AddMessageActionInterface;
export const addFlashMessage: AddMessageActionCreator = (
  payload: AddMessageParamsInterface,
  force = false
) => {
  return {
    type: ADD_MESSAGE,
    payload,
    force,
  };
};

export interface ClearMessageParamsInterface {
  id: string;
}
export interface ClearMessageActionInterface {
  type: string;
  payload: {
    id: string;
  };
}
export type ClearFlashMessageActionCreator = (
  payload: ClearMessageParamsInterface
) => ClearMessageActionInterface;
export const clearFlashMessage: ClearFlashMessageActionCreator = ({ id }) => {
  return {
    type: CLEAR_MESSAGE,
    payload: {
      id,
    },
  };
};

export interface ClearAllMessageActionInterface {
  type: string;
}
export type ClearAllActionCreator = () => ClearAllMessageActionInterface;
export const clearAll: ClearAllActionCreator = () => {
  return {
    type: CLEAR_ALL_MESSAGES,
  };
};
