declare global {
    interface Array<T> {
        zip(other: any[]): Array<any>
    }
}

Array.prototype.zip = function (other: any[]): any[] {
    const self = this as Array<any>
    const ret = []
    if (self) {
        const selfIt = self[Symbol.iterator]()
        const otherIt = other[Symbol.iterator]()
        const iterators = [selfIt, otherIt]
        let iterateInstances = iterators.map((i) => i.next())
        while (iterateInstances.some(it => !it.done)) {
            ret.push(iterateInstances.map(it => it.value))
            iterateInstances = iterators.map((i) => i.next())
        }
    }
    return ret
}
export { }
