/**
 * @author coinxu<duanxian0605@gmail.com>
 * @date   21/11/2017
 * @description 纯种状态
 */

function generate (type) {
  return `WORKER_STATE_${type}`
}

export default {
  NEW: generate(`NEW`),
  RUNNABLE: generate(`RUNNABLE`),
  RUNNING: generate(`RUNNING`),
  TERMINATED: generate('TERMINATED'),
}