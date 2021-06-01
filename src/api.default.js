import requestUtil from '@/utils/request'
import exceptionUtil from '@/utils/exception'
import storage from "@/services/storage";
const host = 'http://127.0.0.1:9510/'
const api = {
    upload: {
        addImage: {
            url: `${host}server/upload/addImage`,
            method: 'POST'
        }
    },
    verifyCode: {
        add: {
            url: `${host}server/verifycode/add`,
            method: 'POST'
        },
    },
    host
}
const request = async function (api, options = {}) {
    const body = (typeof options.data !== 'undefined') ? options.data : {}
    let headers = (typeof options.header !== 'undefined') ? options.header : {}
    const token = storage.getUserToken()

    if (token) {
        headers = Object.assign(headers, {
            'Access-Token': token.access_token
        });
    }
    const result = await requestUtil({
        url: api.url,
        method: api.method,
        type: 'json',
        body: body,
        headers: headers
    })
    if (result.status === 200) {
        if (result.body.code === 0) {
            return result.body
        } else {
            throw new exceptionUtil(result.body.msg, result.body.code)
        }
    } else {
        // todo log
        console.log(`请求：${api.url} ${api.url.method}：\n`)
        console.log(result)
        // todo 服务器异判断
        throw new exceptionUtil(result.statusText, result.code)
    }
}
const privacyUrl = `${host}privacy.html`
const agreementUrl = `${host}agreement.html`
export {
    api,
    request,
    host,
    privacyUrl,
    agreementUrl
}
