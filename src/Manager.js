/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

import Emitter from './Emitter'
import State from './state'
import Events from './events'

let counter = 0

function generate () {
  return `worker-${counter++}`
}

function reduce () {
  counter--
  if (counter < 0) {
    counter = 0
  }
}

class Manager extends Emitter {
  constructor (worker, name) {
    super()
    this.$name = name || generate()
    this.$worker = worker
    this.$state = State.NEW
    this.initialize()
  }

  getName () {
    return this.$name
  }

  getState () {
    return this.$state
  }

  initialize () {

    this.$worker.addEventListener('message', event => {
      const data = event.data
      this.emit(data.type, data.data)
    })

    this.$worker.addEventListener('error', error => {
      this.emit('error', {
        message: error.message,
        filename: error.filename,
        lineno: error.lineno
      })
    })

    this.on(Events.READY, () => this.$state = State.RUNNABLE)
    this.on(Events.START, () => this.$state = State.RUNNING)
    this.on(Events.FINISH, () => this.$state = State.RUNNABLE)
    this.on(Events.TERMINATED, () => this.$state = State.TERMINATED)
    return this
  }

  terminate () {
    this.emit(Events.TERMINATED)
    reduce()
    this.$worker.terminate()
  }

  post (type, data) {
    this.$worker.postMessage({ type, data })
    return this
  }
}

export default Manager


