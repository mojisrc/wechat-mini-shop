import moment from "dayjs";


export default class Time{
  static formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  /**
   * 时间戳转化为年 月 日 时 分 秒
   * number: 传入时间戳
   * format：返回格式，支持自定义，但参数必须与formateArr里保持一致 Y/M/D h:m:s
   */
  static format(format, number) {
    const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
    let returnArr = []

    let date = new Date(number * 1000)
    returnArr.push(date.getFullYear())
    returnArr.push(Time.formatNumber(date.getMonth() + 1))
    returnArr.push(Time.formatNumber(date.getDate()))

    returnArr.push(Time.formatNumber(date.getHours()))
    returnArr.push(Time.formatNumber(date.getMinutes()))
    returnArr.push(Time.formatNumber(date.getSeconds()))

    for (let i in returnArr) {
      format = format.replace(formateArr[i], returnArr[i])
    }
    return format
  }


  static todaySimplify(dateTimeStamp) {
    let _dateTimeStamp = parseInt(dateTimeStamp + "000")
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - _dateTimeStamp;
    if (diffValue < 0) {
      return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    let result = ""
    if (monthC >= 1) {
      result = moment(_dateTimeStamp).format('YY/MM/DD')
    } else if (weekC >= 1) {
      result = moment(_dateTimeStamp).format('YY/MM/DD')
    } else if (dayC >= 1) {
      result = moment(_dateTimeStamp).format('YY/MM/DD')
    } else if (hourC >= 1) {
      result = moment(_dateTimeStamp).format('HH:mm')
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  }

  static getDateDiff(dateTimeStamp) {
    dateTimeStamp = parseInt(dateTimeStamp + "000")
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
      return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    let result = ""
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  }

  /**
   * 判断是否过期
   * @param time 10位时间戳
   * 超过当前时间就过期
   */
  static overdue(time) {
    var timestamp3 = Date.parse(new Date());
    return timestamp3 > parseInt(`${time}000`)
  }

  /**
   * 返回时间戳的状态
   * 0未开始
   * 1进行中
   * 2已结束
   * @param start_time
   * @param end_time
   */
  static status(start_time, end_time) {
    if (Time.overdue(start_time) && !Time.overdue(end_time)) {
      return 1
    } else if (!Time.overdue(start_time)) {
      return 0
    } else {
      return 2
    }
  }

  /**
   * 未来时间戳 10位 秒
   * @param futureTime
   */
  static nowSeconds(futureTime) {
    const now = Date.now();
    return futureTime - parseInt(now / 1000)
  }
  /**
   * 获得今天某个小时的开始、结束时间戳
   * arg1 inputObject
   **/
  static getHourTimes(hour) {
    var date = new Date();
    var startDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${hour}:00:00`
    var endDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${hour}:59:59`
    return [parseInt(moment(startDate,"YYYY-MM-DD HH:mm:ss").format('X')),parseInt(moment(endDate,"YYYY-MM-DD HH:mm:ss").format('X'))]
  }
}
