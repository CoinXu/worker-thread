/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   20/11/2017
 * @description
 */

import Injector from '../src/Injector'

const injector = new Injector(self)

let counter = 0
injector.on('message', function (message) {
  console.log('received: %s', message)

  setTimeout(function () {
    injector.send('message', `worker response: ${counter++}`)
  }, 2000)
})

injector.on('error', function (error) {
  console.log('received error: %s', error)
})

setTimeout(function () {
  injector.send('start', 'worker started!')
}, 2000)
