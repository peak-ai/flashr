import { createFlash, MessageInterface } from './factory';
import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES, withDefaultsConfig } from './constants';
import { AddMessageInterface, ClearAllMessageInterface, ClearMessageInterface } from './actions';
import PriorityQueue from './queue';
import { ConfigInterface } from './constants';
import { InterfaceOptionalKeys } from './utils';

interface FlashStateInterface {
  messages: MessageInterface[];
}

export type FlashActionType =
  | AddMessageInterface
  | ClearMessageInterface
  | ClearAllMessageInterface;

export function createReducerWithConfig(
  config: InterfaceOptionalKeys<ConfigInterface>
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
        const { payload } = action as AddMessageInterface;
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
        const { payload } = action as ClearMessageInterface;
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
