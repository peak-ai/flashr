import { addFlashMessage, clearFlashMessage, clearAll } from './actions';
import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES, NO_OP_ACTION } from './constants';
import { createFlash } from './factory';
import { createReducerWithConfig } from './reducer';
import { createFlashMessageMiddleware } from './middleware';

export {
  NO_OP_ACTION,
  ADD_MESSAGE,
  CLEAR_MESSAGE,
  CLEAR_ALL_MESSAGES,
  createFlash,
  createReducerWithConfig as createFlashReducer,
  createFlashMessageMiddleware as createFlashMiddleware,
  addFlashMessage,
  clearFlashMessage,
  clearAll,
};
