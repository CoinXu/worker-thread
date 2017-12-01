/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   21/11/2017
 * @description worker内部事件，用于记录状态
 */

function generate (type) {
  return `WORKER_THREAD_INTERNAL_${type}`
}

export default {
  // 生命周期事件
  NEW: generate('NEW'),
  READY: generate(`READY`),
  START: generate(`START`),
  FINISH: generate(`FINISH`),
  ERROR: generate('ERROR'),
  TERMINATED: generate('TERMINATED'),

  // 通信事件
  MESSAGE: generate('MESSAGE'),
  // 终止
  SIGINT: generate('SIGINT'),
  // 挂起
  SIGTSTP: generate('SIGTSTP')
}