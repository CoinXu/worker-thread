/**
 * @Author sugo.io<asd>
 * @Date 17-11-22
 * @desc worker中实现Thread
 */

import State from './state'
import Emitter from './Emitter'

/**
 * @abstract
 * @class
 */
export default class Thread extends Emitter {

  constructor () {
    super()
    this.$state = State.NEW
    this.$result = null
    this.$name = null
    this.$time = Date.now()
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

  start () {
    this.$state = State.RUNNING
    this.run()
    return this
  }

  /**
   * @abstract
   */
  run () {}

  exit () {
    this.state = State.TERMINATED
  }

  toString () {
    return `Worker Thread ${this.$name}`
  }
}