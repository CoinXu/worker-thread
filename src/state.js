/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   21/11/2017
 * @description 线程状态
 */

function generate (type) {
  return `WORKER_STATE_${type}`
}

export default {
  // 新建线程
  NEW: generate('NEW'),
  // 实例初始化完成
  READY: generate('READY'),
  // 运行中
  RUNNING: generate('RUNNING'),
  // 一次run完成
  COMPLETE: generate('COMPLETE'),
  // 执行错误
  ERROR: generate('ERROR'),
  // 结束
  SIGINT: generate('SIGINT'),
  // 挂起
  SIGTSTP: generate('SIGTSTP')
}
