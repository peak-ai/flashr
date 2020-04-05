import { ComparatorType } from './comparator';

interface QueueItem {
  priority: number;
}

interface PriorityQueueInteface<T> {
  enqueue(arg: T): void;
  dequeue(): T | void;
  clearQueue(): void;
}

class PriorityQueue<T extends QueueItem> implements PriorityQueueInteface<T> {
  private items: T[];
  private comparator: ComparatorType;

  constructor(comparator: ComparatorType) {
    // Could be heap but size is low range, so not worth heap's overhead
    this.items = [];
    this.comparator = comparator;
  }

  public enqueue(element: T): void {
    let contain = false;
    for (let i = 0; i < this.items.length; i++) {
      if (this.comparator(this.items[i].priority, element.priority) < 0) {
        this.items.splice(i, 0, element);
        contain = true;
        break;
      }
    }

    if (!contain) {
      this.items.push(element);
    }
  }

  public dequeue(): T | void {
    return this.items.shift();
  }

  public clearQueue(): void {
    this.items = [];
  }
}

export default PriorityQueue;
