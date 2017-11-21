/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

import Emitter from './Emitter'

class Injector extends Emitter {
  constructor (scope) {
    super()
    this.$scope = scope
    this.initialize()
  }

  initialize () {
    this.$scope.addEventListener('message', event => {
      const { type, data } = event.data
      this.emit(type, data)
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

  send (type, data) {
    this.$scope.postMessage({ type, data })
    return this
  }
}

export default Injector

