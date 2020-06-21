export function getDocumentValue(key: string) {
  const doc = document.documentElement as any;
  const body = document.body as any;
  if (doc[key]) {
    return doc[key];
  }
  return body[key];
}

export function getClientHeightByDom(dom: HTMLElement) {
  let height = dom.clientHeight;
  if (dom === document.body) {
    height = document.documentElement.clientHeight;
  }

  return height;
}

function isObject(object: any) {
  const classType = (Object as any).prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];

  return (
    classType !== 'String'
    && classType !== 'Number'
    && classType !== 'Boolean'
    && classType !== 'Undefined'
    && classType !== 'Null'
  );
}

function isWindow(object: any) {
  return object && object === window;
}

function isPlainObject(obj: any) {
  return (
    isObject(obj)
    && !isWindow(obj)
    // 如果不是普通的object,Object.prototype需要通过链回溯才能得到
    && Object.getPrototypeOf(obj) === Object.prototype
  );
}

export function extend(...rest: any[]) {
  const len = rest.length;
  let target = rest[0] || {};
  let sourceIndex = 1;
  let isDeep = false;

  if (typeof target === 'boolean') {
    // 深赋值或false
    isDeep = target;
    target = rest[sourceIndex] || {};
    sourceIndex++;
  }

  if (!isObject(target)) {
    // 确保拓展的一定是object
    target = {};
  }

  for (; sourceIndex < len; sourceIndex++) {
    // source的拓展
    const source = rest[sourceIndex];

    if (source && isObject(source)) {
      // for-of打包过大
      Object.keys(source).forEach(name => {
        const src = target[name];
        const copy = source[name];
        const copyIsPlainObject = isPlainObject(copy);
        let copyIsArray = Array.isArray(copy);
        let clone;

        if (target === copy) {
          // 防止环形引用
          return;
        }

        if (isDeep && copy && (copyIsArray || copyIsPlainObject)) {
          // 这里必须用isPlainObject,只有同样是普通的object才会复制继承
          // 如果是FormData之流的，会走后面的覆盖路线
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && Array.isArray(src) ? src : [];
          } else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(isDeep, clone, copy);
        } else if (copy !== undefined) {
          // 如果非深赋值
          // 或者不是普通的object，直接覆盖，例如FormData之类的也会覆盖
          target[name] = copy;
        }
      });
    }
  }

  return target;
}