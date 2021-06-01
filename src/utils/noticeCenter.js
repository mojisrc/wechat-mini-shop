// 参考https://github.com/icindy/WxNotificationCenter/blob/master/WxNotificationCenter/WxNotificationCenter.js
// 存放
var __notices = [];
/**
 * add
 * 注册通知对象方法
 *
 * 参数:
 * name： 注册名，一般let在公共类中
 * selector： 对应的通知方法，接受到通知后进行的动作
 * observer: 注册对象，指Page对象
 */
function add(name, selector, observer) {
    if (name && selector) {
        if (!observer) {
            console.log("add Warning: no observer will can't remove notice");
        }
        console.log("add:" + name);
        var newNotice = {
            name: name,
            selector: selector,
            observer: observer
        };

        addNotices(newNotice);

    } else {
        console.log("add error: no selector or name");
    }
}

/**
 * 仅添加一次监听
 *
 * 参数:
 * name： 注册名，一般let在公共类中
 * selector： 对应的通知方法，接受到通知后进行的动作
 * observer: 注册对象，指Page对象
 */
function addOnce(name, selector, observer) {
    if (__notices.length > 0) {
        for (var i = 0; i < __notices.length; i++) {
            var notice = __notices[i];
            if (notice.name === name) {
                if (notice.observer === observer) {
                    return;
                }
            }
        }
    }
    this.add(name, selector, observer)
}

function addNotices(newNotice) {
    __notices.push(newNotice);
}

/**
 * remove
 * 移除通知方法
 *
 * 参数:
 * name: 已经注册了的通知
 * observer: 移除的通知所在的Page对象
 */

function remove(name, observer) {
    console.log("remove:" + name);
    for (var i = 0; i < __notices.length; i++) {
        var notice = __notices[i];
        if (notice.name === name) {
            if (notice.observer === observer) {
                __notices.splice(i, 1);
                return;
            }
        }
    }
}

/**
 * post
 * 发送通知方法
 *
 * 参数:
 * name: 已经注册了的通知
 * info: 携带的参数
 */

function post(name, info) {
    console.log("post:" + name);
    if (__notices.length === 0) {
        console.log("post error: u hadn't add any notice.");
        return;
    }

    for (var i = 0; i < __notices.length; i++) {
        var notice = __notices[i];
        if (notice.name === name) {
            notice.selector(info);
        }
    }
}

module.exports = {
    add: add,
    remove: remove,
    post: post,
    addOnce: addOnce
}
