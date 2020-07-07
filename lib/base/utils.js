"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDocumentValue = getDocumentValue;

function getDocumentValue(key) {
  var doc = document.documentElement;
  var body = document.body;

  if (doc[key]) {
    return doc[key];
  }

  return body[key];
}