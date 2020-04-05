import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES } from './constants';
import { MessageInterface } from './factory';

export interface AddMessageInterface {
  type: string;
  payload: MessageInterface;
  force?: boolean;
}
export function addFlashMessage(payload: MessageInterface, force = false): AddMessageInterface {
  return {
    type: ADD_MESSAGE,
    payload,
    force,
  };
}

export interface ClearMessageInterface {
  type: string;
  payload: {
    id: string;
  };
}
export function clearFlashMessage({ id }: { id: string }): ClearMessageInterface {
  return {
    type: CLEAR_MESSAGE,
    payload: {
      id,
    },
  };
}

export interface ClearAllMessageInterface {
  type: string;
}
export function clearAll(): ClearAllMessageInterface {
  return {
    type: CLEAR_ALL_MESSAGES,
  };
}
