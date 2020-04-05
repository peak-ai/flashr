import { SyncHook, Tap } from 'tapable';
import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';

import { ADD_MESSAGE } from './constants';
import { noop } from './utils';

export interface FlashMessageMiddlewareConfig {
  disableHooks?: boolean;
}

export interface FlashMessageMiddlewareCreator {
  middleware: Middleware;
  hooks: {
    preAdd: SyncHook;
    postAdd: SyncHook;
  };
}

export const createFlashMessageMiddleware = (
  config: FlashMessageMiddlewareConfig
): FlashMessageMiddlewareCreator => {
  const disableHooks = config?.disableHooks || false;
  const preAddHook = new SyncHook(['action']);
  const postAddHook = new SyncHook();

  const interception = {
    register: (tap: Tap): Tap | undefined => {
      if (disableHooks) {
        tap.fn = noop;
      }
      return tap;
    },
  };

  preAddHook.intercept(interception);
  postAddHook.intercept(interception);

  const flashMiddleware: Middleware = (store: MiddlewareAPI) => {
    return (next: Dispatch) => {
      return (action: AnyAction): void => {
        switch (action.type) {
          case ADD_MESSAGE: {
            preAddHook.call(action);
            next(action);
            postAddHook.call();
            break;
          }
          default:
            next(action);
        }
      };
    };
  };
  return {
    hooks: {
      preAdd: preAddHook,
      postAdd: postAddHook,
    },
    middleware: flashMiddleware,
  };
};
