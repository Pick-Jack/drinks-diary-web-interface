/**
 * JavaScript implementation of a versatile queue object
 * Credit quirimmo: https://stackoverflow.com/questions/53966240/how-to-implement-a-queue-in-javascript-in-a-short-time-when-coding-during-interv
 */

export class EmptyQueueError extends Error {
    constructor() {
        super()
        this.message = "Unable to fetch next element, the queue is empty"
    }
}


export class Queue extends Map {
    constructor() {
        super();
        this.insertIndex = 0;
        this.removeIndex = 0;
    }
  
    push(element) {
        this.set(this.insertIndex, element);
        this.insertIndex++;
    }
  
    pop() {
        if (this.get(this.removalIndex)) { 
            this.delete(this.removalIndex);
            this.removalIndex++; 
        }
    }

    getNextElement() {
        const element = this.get(this.removalIndex);
        return (element ? element : null)
    }
}