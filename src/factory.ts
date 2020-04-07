import { ConfigInterface } from './constants';

export interface MessageInterface {
  id: string;
  message: string;
  messageType: string;
  timeout: number;
  position:
    | 'left-top'
    | 'center-top'
    | 'right-top'
    | 'left-bottom'
    | 'center-bottom'
    | 'right-bottom';
  icon: string;
  onActionClick: () => void;
  onClick: () => void;
  className: string;
  priority: number;
}

export function createFlash({
  timeout,
  position,
  keyFunction,
  onActionClick,
  onClick,
}: ConfigInterface) {
  return (payload: Partial<MessageInterface>): MessageInterface => ({
    id: keyFunction(),
    message: payload.message || '',
    messageType: payload.messageType || 'text',
    timeout: payload.timeout || timeout,
    position: payload.position || position,
    icon: payload.icon || '',
    onActionClick: payload.onActionClick || onActionClick,
    onClick: payload.onClick || onClick,
    className: payload.className || '',
    priority: payload.priority || 0,
  });
}
