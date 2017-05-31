'use strict';

var _i18n = require('i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var foo = 'bar';

// Tail position
/* eslint-disable */

(0, _i18n2.default)('key.' + foo);

// Middle position
(0, _i18n2.default)('key.' + foo + '.bar');

// Start position
(0, _i18n2.default)(foo + '.bar');

// All
(0, _i18n2.default)(foo);