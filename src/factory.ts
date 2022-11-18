import React from 'react';
import { Config } from './constants';

export interface Message {
  id: string;
  message: string | React.ReactNode;
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

export function createFlash({ timeout, position, keyFunction, onActionClick, onClick }: Config) {
  return (payload: Partial<Message>): Message => ({
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
