# Todo
[ ] abstract multi thread interface
[ ] take thread's results

# Usage
First, manager worker module dependencies by webpack.
```js
// webpack.config.js
{
  module: {
    loaders: [
      {
        test: /worker\.js$/,
        use: { loader: 'worker-loader' }
      }
    ]
  }
}
```

Second, create a worker JavaScript module.
```js
// worker.js
import Injector from '../src/Injector'
const injector = new Injector(self)
injector.on('message', function (message) {
  console.log('received: %s', message)
})

injector.on('error', function (error) {
  console.log('received error: %s', error)
})
```

Final, use worker in main thread.
```js
import Manager from '../src/Manager'
import SampleWorker from './worker'

const manager = new Manager(new SampleWorker())

manager.on('message', function (message) {
  console.log('message %s', message)
})

manager.on('error', function (message) {
  console.log('received error: %s', message)
})

manager.send('message', 'sample message')
```

