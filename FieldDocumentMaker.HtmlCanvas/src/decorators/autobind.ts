
  import "reflect-metadata";

export function Autobind(
    _: any, 
    _2: string, descriptor: 
    PropertyDescriptor)
    : PropertyDescriptor{
    
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


class Greeter {
    @format("Hello, %s")
    greeting: string;
  
    constructor(message: string) {
      this.greeting = message;
    }
    greet() {
      let formatString = getFormat(this, "greeting");
      return formatString.replace("%s", this.greeting);
    }
  }


const formatMetadataKey = Symbol("format");

function format(formatString: string) {
  return Reflect.metadata(formatMetadataKey, formatString);
}

function getFormat(target: any, propertyKey: string) {
  return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
}
    