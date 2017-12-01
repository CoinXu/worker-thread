/**
 * @Author sugo.io<asd>
 * @Date 17-11-22
 * @desc worker中实现Thread
 */

import STATE from './state'
import Emitter from './Emitter'

/**
 * @abstract
 * @class
 */
export default class Thread extends Emitter {

  constructor () {
    super()
    this.$result = null
    this.$name = null
    this.$time = Date.now()
    this.$state = STATE.READY
  }

  getState () {
    return this.$state
  }

  getName () {
    return this.$name
  }

  getTime () {
    return Date.now() - this.$time
  }

  take () {
    return this.$result
  }

  put (result) {
    this.$result = result
    this.$state = STATE.COMPLETE
    return this
  }

  start () {
    this.$state = STATE.RUNNING
    this.run()
    return this
  }

  /**
   * @abstract
   */
  run () {
    this.put(null)
  }

  exit () {
    this.state = STATE.TERMINATED
  }

  toString () {
    return `Worker Thread ${this.$name}`
  }
}