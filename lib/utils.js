"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uniq = uniq;
function uniq(array) {
  var seen = {};
  return array.filter(function (item) {
    return seen[item] ? false : seen[item] = true;
  });
}