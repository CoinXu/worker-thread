'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

var Emitter = function () {
  function Emitter() {
    (0, _classCallCheck3['default'])(this, Emitter);

    this.$listener = {};
  }

  (0, _createClass3['default'])(Emitter, [{
    key: 'on',
    value: function on(type, handle) {
      var hook = this.$listener[type] || (this.$listener[type] = { type: type, handles: [] });

      if (!hook.handles.includes(handle)) {
        hook.handles.push(handle);
      }

      return this;
    }
  }, {
    key: 'off',
    value: function off(type, handle) {
      var hooks = this.$listener[type];

      if (!hooks) {
        return this;
      }

      hooks.handles = hooks.handles.filter(function (h) {
        return handle !== h;
      });
      return this;
    }
  }, {
    key: 'emit',
    value: function emit(type, data) {
      var _this = this;

      var hooks = this.$listener[type];
      if (!hooks) {
        return this;
      }

      try {
        hooks.handles.forEach(function (handle) {
          return handle.call(_this, data);
        });
      } catch (error) {
        this.emit('error', error);
      }

      return this;
    }
  }]);
  return Emitter;
}();

exports['default'] = Emitter;