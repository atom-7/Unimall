const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  // 防抖函数 (规定时间内,无论触发多少次,只会在不触发的时候调用函数)
  debounce: (function () {
    let timeout = null;
    // 默认等待时间250ms
    // let delay = wait || 250;
    return function (fn, delay = 500) {
      //如果上一个定时器还在 清除上一个定时器  
      //目的就是重复触发会刷新定时器,只有你不动了我才触发;
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        fn.apply(this, arguments);
      }, delay);
    }
  })(),
  // 这是节流1  (多次触发该函数,只按规定间隔时间调用)
  throttle: (function () {
    let timer = null;
    return function (fn, delay = 500) {
      if (!timer) {
        timer = setTimeout(() => {
          fn.call(this);
          timer = null;
        }, delay)
      }
    }
  })(),
  // 这是节流2  (多次触发,按间隔时间调用,并且不触发之后还会再调用一次)
  throttle2: (function () {
    var last; // 这里利用闭包的特性,子函数可以访问父级变量
    var timer;  // 可以防止变量污染,不会重复执行变量定义
    // var delay = delay || 200;
    return function (fn, delay = 200) {
      var th = this;
      var args = arguments;
      var now = +new Date();
      // 如果在规定时间内,点击会重新计时;直到两次触发时间的
      // 间隔满足 delay 才会执行else 调用函数, 
      if (last && now - last < delay) {
        clearTimeout(timer);
        timer = setTimeout(function () {
          last = now;
          fn.apply(th, args);
        }, delay);

      } else {
        last = now;
        fn.apply(th, args);
      }
    }
  })(),
}
