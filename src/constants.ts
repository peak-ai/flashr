import { v4 } from 'uuid';
import { ComparatorType } from './comparator';
import { noop } from './utils';
import { maxComparator, noSortComparator } from './comparator';

export const ADD_MESSAGE = '@@flashr/__ADD_MESSAGE__';
export const CLEAR_MESSAGE = '@@flashr/__CLEAR_MESSAGE__';
export const CLEAR_ALL_MESSAGES = '@@flashr/__CLEAR_ALL_MESSAGES__';
export const NO_OP_ACTION = '@@flashr/__NO_OP_ACTION__';

export interface Config {
  timeout: number;
  position:
    | 'left-top'
    | 'center-top'
    | 'right-top'
    | 'left-bottom'
    | 'center-bottom'
    | 'right-bottom';
  stackCount: number;
  sortQueue: boolean;
  comparator: ComparatorType;
  keyFunction: () => string;
  onActionClick: () => void;
  onClick: () => void;
}

export function withDefaultsConfig(config: Partial<Config>): Config {
  const sortQueueConfig = config.sortQueue || false;
  return {
    timeout: config.timeout || 5000,
    position: config.position || 'left-top',
    stackCount: config.stackCount || 3,
    sortQueue: sortQueueConfig,
    comparator: sortQueueConfig ? config.comparator || maxComparator : noSortComparator,
    keyFunction: config.keyFunction || v4,
    onActionClick: config.onActionClick || noop,
    onClick: config.onClick || noop,
  };
}
