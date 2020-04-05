import { ConfigInterface } from './constants';

export interface MessageInterface {
  id: string;
  message: string;
  messageType?: string;
  timeout: number;
  position: string;
  icon?: string;
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
  return (payload: MessageInterface): MessageInterface => ({
    id: payload.id || keyFunction(),
    message: payload.message,
    messageType: payload.messageType,
    timeout: payload.timeout || timeout,
    position: payload.position || position,
    icon: payload.icon || '',
    onActionClick: payload.onActionClick || onActionClick,
    onClick: payload.onClick || onClick,
    className: payload.className || '',
    priority: payload.priority || 0,
  });
}
