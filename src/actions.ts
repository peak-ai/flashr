import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES } from './constants';
import { Message } from './factory';

export type AddMessageParams = Partial<Message> & Pick<Message, 'message'>;
export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  payload: AddMessageParams;
  force?: boolean;
}
export type AddMessageActionCreator = (
  payload: AddMessageParams,
  force?: boolean
) => AddMessageAction;
export const addFlashMessage: AddMessageActionCreator = (
  payload: AddMessageParams,
  force = false
) => {
  return {
    type: ADD_MESSAGE,
    payload,
    force,
  };
};

export interface ClearMessageParams {
  id: string;
}
export interface ClearMessageAction {
  type: typeof CLEAR_MESSAGE;
  payload: {
    id: string;
  };
}
export type ClearFlashMessageActionCreator = (payload: ClearMessageParams) => ClearMessageAction;
export const clearFlashMessage: ClearFlashMessageActionCreator = ({ id }) => {
  return {
    type: CLEAR_MESSAGE,
    payload: {
      id,
    },
  };
};

export interface ClearAllMessageAction {
  type: typeof CLEAR_ALL_MESSAGES;
}
export type ClearAllActionCreator = () => ClearAllMessageAction;
export const clearAll: ClearAllActionCreator = () => {
  return {
    type: CLEAR_ALL_MESSAGES,
  };
};
