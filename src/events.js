/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   21/11/2017
 * @description worker内部事件，用于记录状态
 */

function generate (type) {
  return `WORKER_THREAD_INTERNAL_${type}`
}

export default {
  READY: generate(`READY`),
  START: generate(`START`),
  FINISH: generate(`FINISH`),
  TERMINATED: generate('TERMINATED')
}