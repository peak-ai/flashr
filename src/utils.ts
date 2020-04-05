type InterfaceOptionalKeys<T> = {
  readonly [P in keyof T]?: T[P];
};

const noop = (): void => undefined;

export { InterfaceOptionalKeys, noop };
