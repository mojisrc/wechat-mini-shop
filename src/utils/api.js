import {api} from '../api'
import {USER_INFO} from './const'
import Validate from './validate'

export default class Curl{
  async apiRequst(options) {
    let params = {
      url: api[options.name].url,
      method: api[options.name].method,
      data: options.data ? options.data : {},
      header: {}
    }

    const userInfo = wepy.getStorageSync(USER_INFO)
    // todo 合并header
    if (!Validate.isEmpty(userInfo)) {
      params.header = {'Access-Token': userInfo.access_token, 'User-Id': userInfo.id, 'Source': 'web'}
    }
    const response = await wepy.request(params)
    if (response.statusCode === 200) {
      return response.data
    } else {
      console.log(`${api[name].url}fail`)
    }
  }
}
