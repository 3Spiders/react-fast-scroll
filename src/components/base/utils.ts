import { HTMLAttribute } from './interface';

export function getDocumentValue(key: HTMLAttribute) {
  const doc = document.documentElement;
  const body = document.body;
  if (doc[key]) {
    return doc[key];
  }
  return body[key];
}