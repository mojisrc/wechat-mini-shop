"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getCurrentPage() {
    var pages = getCurrentPages();
    return pages[pages.length - 1] || {};
}
function onPageScroll(event) {
    var _a = getCurrentPage().pageScroller, pageScroller = _a === void 0 ? [] : _a;
    pageScroller.forEach(function (scroller) {
        if (typeof scroller === 'function') {
            scroller(event);
        }
    });
}
exports.pageScroll = function (scroller) {
    return Behavior({
        attached: function () {
            var page = getCurrentPage();
            if (Array.isArray(page.pageScroller)) {
                page.pageScroller.push(scroller.bind(this));
            } else {
                page.pageScroller = [page.onPageScroll, scroller.bind(this)];
            }
            page.onPageScroll = onPageScroll;
        },
        detached: function () {
            var page = getCurrentPage();
            page.pageScroller = (page.pageScroller || []).filter(function (item) { return item !== scroller; });
        }
    });
};
