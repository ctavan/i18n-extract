'use strict';

var _chai = require('chai');

var _forbidDynamic = require('./forbidDynamic.js');

var _forbidDynamic2 = _interopRequireDefault(_forbidDynamic);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-env mocha */

describe('#forbidDynamic()', function () {
  describe('simple case', function () {
    it('should report forbidden dynamic key', function () {
      var missing = (0, _forbidDynamic2.default)({}, ['key1.*', '*.key2']);

      _chai.assert.deepEqual([{
        type: 'FORBID_DYNAMIC',
        key: 'key1.*'
      }, {
        type: 'FORBID_DYNAMIC',
        key: '*.key2'
      }], missing, 'Should report forbidden dynamic key.');
    });

    it('should no report static key', function () {
      var missing = (0, _forbidDynamic2.default)({}, ['key1', 'key2']);

      _chai.assert.deepEqual([], missing, 'Should not report static key.');
    });
  });
});