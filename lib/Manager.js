'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Emitter2 = require('./Emitter');

var _Emitter3 = _interopRequireDefault(_Emitter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author coinxu<duanxian0605@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @date   20/11/2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @description
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var creator = function () {
  var counter = 0;
  return function () {
    return 'Worker-' + counter++;
  };
}();

var Manager = function (_Emitter) {
  _inherits(Manager, _Emitter);

  function Manager(worker, name) {
    _classCallCheck(this, Manager);

    var _this = _possibleConstructorReturn(this, (Manager.__proto__ || Object.getPrototypeOf(Manager)).call(this));

    _this.$name = name || creator();
    _this.$worker = worker;
    _this.initialize();
    return _this;
  }

  _createClass(Manager, [{
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
}(_Emitter3.default);

exports.default = Manager;