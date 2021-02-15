export function Autobind(target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {  
    const originalMethod = descriptor.value
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get(){
            const boundFn = originalMethod.bind(this)
            return boundFn
        }
    }
    return adjDescriptor
}