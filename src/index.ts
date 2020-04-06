import {
  addFlashMessage,
  clearFlashMessage,
  clearAll,
  AddMessageInterface,
  ClearMessageInterface,
  ClearMessageParamsInterface,
  ClearAllMessageInterface,
} from './actions';
import {
  ADD_MESSAGE,
  CLEAR_MESSAGE,
  CLEAR_ALL_MESSAGES,
  NO_OP_ACTION,
  ConfigInterface,
} from './constants';
import { createFlash, MessageInterface } from './factory';
import { createReducerWithConfig, FlashActionType, FlashStateInterface } from './reducer';
import {
  createFlashMessageMiddleware,
  FlashMessageMiddlewareConfig,
  FlashMessageMiddlewareCreator,
} from './middleware';
import { ComparatorType } from './comparator';
import { InterfaceOptionalKeys } from './utils';

type ConfigInterfaceWithOptionalKeys = InterfaceOptionalKeys<ConfigInterface>;
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
  MessageInterface,
  AddMessageInterface,
  ClearMessageInterface,
  ClearMessageParamsInterface,
  ClearAllMessageInterface,
  ComparatorType,
  ConfigInterfaceWithOptionalKeys as ConfigInterface,
  FlashMessageMiddlewareConfig,
  FlashMessageMiddlewareCreator,
  FlashStateInterface,
  FlashActionType,
};
