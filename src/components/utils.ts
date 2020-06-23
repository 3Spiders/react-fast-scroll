import { HTMLAttribute } from './interface';

export function getDocumentValue(key: HTMLAttribute) {
  const doc = document.documentElement;
  const body = document.body;
  if (doc[key]) {
    return doc[key];
  }
  return body[key];
}

function isObject(object: any) {
  return object !== null && object instanceof Object;
}

function isWindow(object: any) {
  return object && object === window;
}

function isPlainObject(obj: any) {
  return (
    isObject(obj)
    && !isWindow(obj)
    && Object.getPrototypeOf(obj) === Object.prototype
  );
}

export function extend(...rest: any[]) {
  const len = rest.length;
  let target = rest[0] || {};
  let sourceIndex = 1;
  let isDeep = false;

  if (typeof target === 'boolean') {
    isDeep = target;
    target = rest[sourceIndex] || {};
    sourceIndex++;
  }

  if (!isObject(target)) {
    target = {};
  }

  for (; sourceIndex < len; sourceIndex++) {
    const source = rest[sourceIndex];

    if (source && isObject(source)) {
      Object.keys(source).forEach(name => {
        const src = target[name];
        const copy = source[name];
        const copyIsPlainObject = isPlainObject(copy);
        let copyIsArray = Array.isArray(copy);
        let clone;

        if (target === copy) {
          return;
        }

        if (isDeep && copy && (copyIsArray || copyIsPlainObject)) {
          
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(isDeep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      });
    }
  }

  return target;
}