'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _Emitter2 = require('./Emitter');

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Injector = function (_Emitter) {
  (0, _inherits3['default'])(Injector, _Emitter);

  function Injector(scope) {
    (0, _classCallCheck3['default'])(this, Injector);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Injector.__proto__ || Object.getPrototypeOf(Injector)).call(this));

    _this.$scope = scope;
    _this.initialize();
    return _this;
  }

  (0, _createClass3['default'])(Injector, [{
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.$scope.addEventListener('message', function (event) {
        var _event$data = event.data,
            type = _event$data.type,
            data = _event$data.data;

        _this2.emit(type, data);
      });

      this.$scope.addEventListener('error', function (error) {
        _this2.emit('error', error.message);
      });

      return this;
    }
  }, {
    key: 'terminate',
    value: function terminate() {
      this.$scope.close();
      return this;
    }
  }, {
    key: 'send',
    value: function send(type, data) {
      this.$scope.postMessage({ type: type, data: data });
      return this;
    }
  }]);
  return Injector;
}(_Emitter3['default']); /**
                          * @author coinxu<duanxian0605@gmail.com>
                          * @date   20/11/2017
                          * @description
                          */

exports['default'] = Injector;