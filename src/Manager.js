/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

const creator = (function () {
  let counter = 0
  return function () {
    return `Worker-${counter++}`
  }
})()

class Manager extends Emitter {
  constructor (uri, name) {
    super()
    this.$uri = uri
    this.$name = name || creator()
    this.$worker = new Worker(this.$uri)
    this.initialize()
  }

  getName () {
    return this.$name
  }

  initialize () {
    this.$worker.addEventListener('message', event => {
      const { type, data } = event.data
      this.emit(type, data)
    })

    this.$worker.addEventListener('error', error => {
      this.emit('error', error.message)
    })

    return this
  }

  terminate () {
    this.$worker.terminate()
  }

  send (type, data) {
    this.$worker.postMessage({ type, data })
    return this
  }
}


