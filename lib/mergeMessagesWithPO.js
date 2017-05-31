'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mergeMessagesWithPO;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gettextParser = require('gettext-parser');

var _gettextParser2 = _interopRequireDefault(_gettextParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mergeMessagesWithPO(messages, poFileName, outputFileName) {
  var poContent = _fs2.default.readFileSync(_path2.default.resolve(__dirname, poFileName), 'utf8');
  var po = _gettextParser2.default.po.parse(poContent);

  var poTransalations = po.translations[''];
  var translations = {};
  var messagesNew = 0;
  var messagesReused = 0;

  messages.forEach(function (message) {
    // The translation already exist
    if (poTransalations[message]) {
      messagesReused += 1;
      translations[message] = poTransalations[message];
      delete translations[message].comments;
    } else {
      messagesNew += 1;
      translations[message] = {
        msgid: message,
        msgstr: ['']
      };
    }
  });

  po.translations[''] = translations;

  _fs2.default.writeFileSync(outputFileName, _gettextParser2.default.po.compile(po));

  var messagesLengthBefore = Object.keys(poTransalations).length - 1; // Not sure why the -1 is for
  var messagesLengthAfter = Object.keys(translations).length;

  console.log(outputFileName + ' has ' + messagesLengthAfter + ' messages.');
  console.log('We have added ' + messagesNew + ' messages.');
  console.log('We have removed ' + (messagesLengthBefore - messagesReused) + ' messages.');
}