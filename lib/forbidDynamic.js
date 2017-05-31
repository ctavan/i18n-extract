'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = forbidDynamic;
var FORBID_DYNAMIC = 'FORBID_DYNAMIC';

function forbidDynamic(locale, keysUsed) {
  var reports = [];

  keysUsed.forEach(function (keyUsed) {
    // Dynamic key
    if (keyUsed.includes('*')) {
      reports.push({
        type: FORBID_DYNAMIC,
        key: keyUsed
      });
    }
  });

  return reports;
}