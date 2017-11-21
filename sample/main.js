/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

import Manager from '../src/Manager'
import SampleWorker from './worker'

const manager = new Manager(new SampleWorker())

manager.on('message', function (message) {
  console.log('message %s', message)
})

manager.on('start', function (start) {
  console.log('start %s', start)
})

manager.on('error', function (message) {
  console.log('received error: %s', message)
})

const send = document.querySelector('#message')
let counter = 0

send.onclick = function () {
  manager.post('message', `manager: ${counter++}`)
}


