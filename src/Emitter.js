/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

class Emitter {
  
  constructor () {
    this.$listener = {}
  }

  on (type, handle) {
    const hook = this.$listener[type] || (this.$listener[type] = { type, handles: [] })

    if (!hook.handles.includes(handle)) {
      hook.handles.push(handle)
    }

    return this
  }

  off (type, handle) {
    const hooks = this.$listener[type]

    if (!hooks) {
      return this
    }

    hooks.handles = hooks.handles.filter(h => handle !== h)
    return this
  }

  emit (type, data) {
    const hooks = this.$listener[type]
    if (!hooks) {
      return this
    }

    try {
      hooks.handles.forEach(handle => handle.call(this, data))
    } catch (error) {
      this.emit('error', error)
    }

    return this
  }
}