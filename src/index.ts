import {
  addFlashMessage,
  clearFlashMessage,
  clearAll,
  AddMessageParams,
  AddMessageAction,
  AddMessageActionCreator,
  ClearMessageParams,
  ClearMessageAction,
  ClearFlashMessageActionCreator,
  ClearAllMessageAction,
  ClearAllActionCreator,
} from './actions';
import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES, NO_OP_ACTION, Config } from './constants';
import { createFlash, Message } from './factory';
import { createReducerWithConfig, FlashActionType, FlashState } from './reducer';
import {
  createFlashMessageMiddleware,
  FlashMessageMiddlewareConfig,
  FlashMessageMiddlewareCreator,
} from './middleware';
import { ComparatorType } from './comparator';

type ConfigWithOptionalKeys = Partial<Config>;
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
  // intefaces
  AddMessageParams,
  AddMessageAction,
  AddMessageActionCreator,
  ClearMessageParams,
  ClearMessageAction,
  ClearFlashMessageActionCreator,
  ClearAllMessageAction,
  ClearAllActionCreator,
  ComparatorType,
  ConfigWithOptionalKeys as Config,
  FlashMessageMiddlewareConfig,
  FlashMessageMiddlewareCreator,
  FlashState,
  FlashActionType,
  Message,
};
