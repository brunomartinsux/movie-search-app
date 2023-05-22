export function Debounce(delay: number = 500): MethodDecorator {
    return function (_: any, __: any, descriptor: PropertyDescriptor) {
       let timeout: NodeJS.Timeout | undefined = undefined;
       const orginal = descriptor.value;
       descriptor.value = function (...args: any) {
          clearTimeout(timeout);
          timeout = setTimeout(() => orginal.apply(this, args), delay);
       };
       return descriptor;
    };
 }
 