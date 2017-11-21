'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

var Emitter = function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this.$listener = {};
  }

  _createClass(Emitter, [{
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

exports.default = Emitter;