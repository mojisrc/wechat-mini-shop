const utils = require('./utils')
// onMessage只能是一个 没啥乱用 暂时不用
worker.postMessage({
  msg: 'hello from worker: ' + utils.test(),
  buffer: utils.str2ab('hello arrayBuffer from worker')
})
worker.onMessage((msg) => {
  console.log('[Worker] on appservice message', msg)
  const buffer = msg.buffer
  console.log('[Worker] on appservice buffer length ', buffer)
  console.log('[Worker] on appservice buffer', utils.ab2str(buffer))
})
