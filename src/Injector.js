/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

import Emitter from './Emitter'
import EVENTS from './events'

const $$scope = self

class Injector extends Emitter {
  constructor (scope) {
    super()
    this.$scope = scope || $$scope
    this.initialize()
  }

  initialize () {
    this.$scope.addEventListener('message', event => {
      const data = event.data
      this.emit(data.type, data.data)
    })

    this.$scope.addEventListener('error', error => {
      this.emit('error', error.message)
    })

    return this
  }

  terminate () {
    this.$scope.close()
    return this
  }

  post (type, data) {
    this.$scope.postMessage({ type, data })
    return this
  }
}

// 运行时发送 READY 事件
$$scope.postMessage({ type: EVENTS.READY })

export default Injector
