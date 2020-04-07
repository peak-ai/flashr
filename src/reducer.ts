import { createFlash, MessageInterface } from './factory';
import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES, withDefaultsConfig } from './constants';
import {
  AddMessageActionInterface,
  ClearAllMessageActionInterface,
  ClearMessageActionInterface,
} from './actions';
import PriorityQueue from './queue';
import { ConfigInterface } from './constants';

export interface FlashStateInterface {
  messages: MessageInterface[];
}
export type FlashActionType =
  | AddMessageActionInterface
  | ClearMessageActionInterface
  | ClearAllMessageActionInterface;

export function createReducerWithConfig(
  config: Partial<ConfigInterface>
): (state: FlashStateInterface, action: FlashActionType) => FlashStateInterface {
  const defaultsConfig = withDefaultsConfig(config);

  const createFlashWithConfig = createFlash(defaultsConfig);
  const queue = new PriorityQueue<MessageInterface>(defaultsConfig.comparator);

  const initialState: FlashStateInterface = {
    messages: [],
  };

  return (state = initialState, action: FlashActionType): FlashStateInterface => {
    switch (action.type) {
      case ADD_MESSAGE: {
        let messages = [];
        const { payload } = action;
        const flash = createFlashWithConfig(payload);
        if (state.messages.length < defaultsConfig.stackCount) {
          messages = state.messages;
          queue.enqueue(flash);
        } else {
          messages = state.messages.concat(flash);
        }
        return { messages };
      }
      case CLEAR_MESSAGE: {
        const { payload } = action;
        const messages = state.messages.filter((msg) => msg.id !== payload.id);
        if (messages.length < defaultsConfig.stackCount) {
          const flash = queue.dequeue();
          if (flash) {
            messages.push();
          }
        }
        return { messages };
      }
      case CLEAR_ALL_MESSAGES: {
        queue.clearQueue();
        return { messages: [] };
      }
      default:
        return state;
    }
  };
}
