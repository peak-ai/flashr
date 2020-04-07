import { createFlash, Message } from './factory';
import { ADD_MESSAGE, CLEAR_MESSAGE, CLEAR_ALL_MESSAGES, withDefaultsConfig } from './constants';
import { AddMessageAction, ClearAllMessageAction, ClearMessageAction } from './actions';
import PriorityQueue from './queue';
import { Config } from './constants';

export interface FlashState {
  messages: Message[];
}
export type FlashActionType = AddMessageAction | ClearMessageAction | ClearAllMessageAction;

export function createReducerWithConfig(
  config: Partial<Config>
): (state: FlashState, action: FlashActionType) => FlashState {
  const defaultsConfig = withDefaultsConfig(config);

  const createFlashWithConfig = createFlash(defaultsConfig);
  const queue = new PriorityQueue<Message>(defaultsConfig.comparator);

  const initialState: FlashState = {
    messages: [],
  };

  return (state = initialState, action: FlashActionType): FlashState => {
    switch (action.type) {
      case ADD_MESSAGE: {
        let messages = [];
        const { payload } = action;
        const flash = createFlashWithConfig(payload);
        if (state.messages.length >= defaultsConfig.stackCount) {
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
