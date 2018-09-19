// todo 拓展多种 暂时一个文件
/**
 * 追加onLoad状态
 * 用于页面加载后每次不用重复定义类属性
 */
export const onLoaded = () => {
  return function (target) {
    target.onLoadState = true
  }
  // todo checkLogin
}
