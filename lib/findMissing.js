'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findMissing;
var MISSING = 'MISSING';

function isMissing(locale, keyUsed) {
  // Dynamic key
  if (keyUsed.includes('*')) {
    var regExp = new RegExp('^' + keyUsed.replace('*', '(.+)') + '$');

    return Object.keys(locale).every(function (localeKey) {
      return regExp.exec(localeKey) === null;
    });
  }

  return !locale[keyUsed];
}

function findMissing(locale, keysUsed) {
  var reports = [];

  keysUsed.forEach(function (keyUsed) {
    if (isMissing(locale, keyUsed)) {
      reports.push({
        type: MISSING,
        key: keyUsed
      });
    }
  });

  return reports;
}