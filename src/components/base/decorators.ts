/**
 * A lightweight autobind decorator that replaces core-decorators
 */
export function autobind(_target: any, _key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const originalMethod = descriptor.value;
  
  return {
    configurable: true,
    enumerable: false,
    get() {
      if (this === _target.prototype || this.hasOwnProperty(_key)) {
        return originalMethod;
      }
      
      const boundFn = originalMethod.bind(this);
      Object.defineProperty(this, _key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      });
      
      return boundFn;
    }
  };
}