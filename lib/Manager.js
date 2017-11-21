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

var creator = function () {
  var counter = 0;
  return function () {
    return 'Worker-' + counter++;
  };
}(); /**
      * @author coinxu<duanxian0605@gmail.com>
      * @date   20/11/2017
      * @description
      */

var Manager = function (_Emitter) {
  (0, _inherits3['default'])(Manager, _Emitter);

  function Manager(uri, name) {
    (0, _classCallCheck3['default'])(this, Manager);

    var _this = (0, _possibleConstructorReturn3['default'])(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this));

    _this.$uri = uri;
    _this.$name = name || creator();
    _this.$worker = new Worker(_this.$uri);
    _this.initialize();
    return _this;
  }

  (0, _createClass3['default'])(Manager, [{
    key: 'getName',
    value: function getName() {
      return this.$name;
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var _this2 = this;

      this.$worker.addEventListener('message', function (event) {
        var _event$data = event.data,
            type = _event$data.type,
            data = _event$data.data;

        _this2.emit(type, data);
      });

      this.$worker.addEventListener('error', function (error) {
        _this2.emit('error', error.message);
      });

      return this;
    }
  }, {
    key: 'terminate',
    value: function terminate() {
      this.$worker.terminate();
    }
  }, {
    key: 'send',
    value: function send(type, data) {
      this.$worker.postMessage({ type: type, data: data });
      return this;
    }
  }]);
  return Manager;
}(_Emitter3['default']);

exports['default'] = Manager;