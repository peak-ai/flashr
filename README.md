# Flashr

Flash Messages handing with redux made simple.

## To install

```bash
npm install --save @peak-ai/flashr
# or
yarn add @peak-ai/flashr
```

## Implementation

#### _Add Reducer_

```js
import { createFlashReducer } from '@peak-ai/flashr';
const flashMessages = createFlashReducer(config);
const reducers = {
  // ... your other reducers ...
  flashMessages,
};
const rootReducer = combineReducers(reducers);
```

#### _Add Redux Middleware_ (_Only needed if want to use hooks_)

```js
import { createFlashMiddleware } from '@peak-ai/flashr';
const { middleware } = createFlashMiddleware({});
const store = createStore(rootReducer, applyMiddleware(middleware));
```

## Config

#### _Create Reducer Config_

```typescript
interface Config {
  /*
    Timeout after which notification should be removed.
    This can be overridden in addFlashMessage API.
    Default: 5000
  */
  timeout: number;
  /*
    Position on the screen where the notification should appear.
    This can be overridden in addFlashMessage API.
    Default: 'left-top'
  */
  position: 'left-top' | 'center-top' | 'right-top' | 'left-bottom' | 'center-bottom' | 'right-bottom';
  /*
    Internally we maintain a queue for handing messages, this param gives only the desired number of messages at any point in time, rest will be available in the queue and added as messages are removed from message array.
    Default: 3
  */
  stackCount: number;
  /*
    The above-said queue is a priority queue, this parameter tells need to sort that queue.
    Default: false
  */
  sortQueue: boolean;
  /*
    The above-said queue accepts custom comparator function, which somewhat works like Array.prototype.sort's callback function.
    It provides 2 numbers as input, a and b, return less than 0 if a is smaller and greater than one b is smaller.
    For more insight see usage at `src/queue.ts:L26`
    Default: (a, b) => a - b; 
    Higher priority elements dequeue first.
  */
  comparator: Comparator;
  /*
    This function is used to create a unique id for every notification object.
    Default: uuid/v4
  */
  keyFunction: () => string;
  /*
    Notification can have an action associated with them, like undo, stop, etc...
    This can be overridden in addFlashMessage api.
  */
  onActionClick: () => void;
  /*
    This in general onClick whicj can be used to add click on complete notification
    This can be overridden in addFlashMessage api.
  */
  onClick: () => void;
}
```

#### _Create Redux Middleware Config_

```typescript
interface Config {
  /*
    With middleware you can hook custom functions before a message is added to the queue and after a message is added. this flag is used to disable those hooks.
  */
  disableHooks: boolean;
}
```

#### _Hooks_

_When you create middleware, the function returns an object called hooks, which can be tapped with custom functions_

```typescript
const {
  middleware,
  hooks: { preAdd, postAdd },
} = createFlashMiddleware({});

preAdd.tap('PreAddAction', (action) => {
  console.log(action);
});

postAdd.tap('PostAddAction', () => {
  console.log('PostAddAction');
});
```

## Action Creators

#### _addFlashMessage_

```typescript
interface Message {
  /*
    Required*
    Text to be displayed in notification
  */
  message: string;
  /*
    Optional
    Message type, like success, error, warn, etc..
    Default: text  
  */
  messageType: string;
  /*
    Optional
    Override specific timeout for single notification
    Default: text  
  */
  timeout: number;
  /*
    Optional
    Override specific position for single notification
    Default: 'left-top'  
  */
  position: string;
  /*
    Optional
    Icon for notification
  */
  icon: string;
  /*
    Optional
    Override onActionClick for single notification
  */
  onActionClick: () => void;
  /*
    Optional
    Override onClick for single notification
  */
  onClick: () => void;
  /*
    Optional
    Add optional class to add in notification
  */
  className: string;
  /*
    Optional
    Add priority to a message, when enabled sorts, called comparator function if passed, else default to maxComparator, higher priority elements as first in the queue.
    Defaults to 0
  */
  priority: number;
}
```

#### _clearFlashMessage_

```typescript
interface ClearMessage {
  /*
    Removes notification from messages array. Currently, there is no option to remove messages from the queue, except clearAll.
  */
  id: string;
}
```

#### _clearAll_

No params needed _that is easy_

#### _Action Constants Exported_

- _ADD_MESSAGE_
- _CLEAR_MESSAGE_
- _CLEAR_ALL_MESSAGES_

## License

BSD-3-Clause
