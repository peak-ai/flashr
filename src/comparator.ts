export type ComparatorType = (a: number, b: number) => number;

export const maxComparator: ComparatorType = (a, b) => a - b;

export const noSortComparator: ComparatorType = () => 1;
