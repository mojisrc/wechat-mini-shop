const makeOptions = (url, options) => {
    const defaultoptions = {
        url: undefined,
        method: 'GET',
        qs: undefined,
        body: undefined,
        headers: undefined,
        type: 'json',
        contentType: 'application/json',
        crossOrigin: true,
        credentials: undefined
    };

    let thisoptions = {};
    if (!options) {
        thisoptions = url;
    } else {
        thisoptions = options;
        if (url) {
            thisoptions.url = url;
        }
    }
    thisoptions = Object.assign({}, defaultoptions, thisoptions);

    return thisoptions;
};

const addQs = (url, qs) => {
    let queryString = '';
    let newUrl = url;
    if (qs && typeof qs === 'object') {
        /* eslint no-restricted-syntax: 0 */
        for (const k of Object.keys(qs)) {
            if (Array.isArray(qs[k])) {
                if (qs[k].length > 0) {
                    queryString += `${!queryString ? '' : '&'}`;
                    let _qs = qs[k]
                        .map(function (val2) {
                            return encodeURIComponent(k) +
                                "[]=" +
                                encodeURIComponent(val2);
                        })
                    queryString += _qs.join("&");
                }
            } else {
                queryString += `${!queryString ? '' : '&'}${k}=${qs[k]}`;
            }
        }
        if (url.indexOf('?') === -1) {
            newUrl = `${url}?${queryString}`;
        } else {
            newUrl = `${url}${queryString}`;
        }
    }

    return newUrl;
};

const request = (url, options) => {
    const opts = makeOptions(url, options);
    const { method, body, headers, type, contentType } = opts;
    let requestUrl = opts.url;
    if (method === 'GET') requestUrl = addQs(requestUrl, body);

    let header = headers;
    if ((!headers || !headers['content-type']) && contentType) {
        header = Object.assign({}, headers, { 'content-type': contentType, 'source': 3 });
    }
    return new Promise((resolve, reject) => {
        wx.request({
            url: requestUrl,
            method,
            data: method === 'GET' ? {} : body,
            header,
            dataType: type,
            success: (response) => {
                let res = {
                    status: response.statusCode,
                    statusText: response.errMsg,
                    body: response.data
                };
                if (response.statusCode < 200 || response.statusCode >= 300) {
                    let errors = {
                        errcode: response.statusCode,
                        errmsg: response.errMsg
                    };
                    if (response.data && typeof response.data === 'object') {
                        errors = Object.assign({}, errors, response.data);
                    }
                    if (response.data && typeof response.data === 'string') {
                        errors = Object.assign({}, errors, { errmsg: response.data });
                    }
                    res = Object.assign({}, res, errors);
                    reject(res);
                }
                const e = res.body
                if (e.code === 10005 && requestUrl.indexOf('user/logout') === -1) {
                    // getApp()._store.dispatch({
                    //     type: "user/logout"
                    // })
                } else {
                    resolve(res);
                }
            },
            fail: (err) => {
                reject({ status: 0, statusText: '', errcode: -1, errmsg: `${err.errMsg}` });
            }
        });
    });
};

export default request;
