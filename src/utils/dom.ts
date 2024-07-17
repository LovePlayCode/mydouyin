export function _css(el: any, key: any, value?: any) {
  const reg = /^-?\d+.?\d*(px|pt|em|rem|vw|vh|%|rpx|ms)$/i;
  if (value === undefined) {
    let val = null;
    if ('getComputedStyle' in window) {
      val = window.getComputedStyle(el, null)[key];
    } else {
      val = el.currentStyle[key];
    }
    return reg.test(val) ? Number.parseFloat(val) : val;
    // return parseFloat(val)
  }
  if (
    [
      'top',
      'left',
      'bottom',
      'right',
      'width',
      'height',
      'font-size',
      'margin',
      'padding',
    ].includes(key)
  ) {
    if (!reg.test(value)) {
      if (!String(value).includes('calc')) {
        value += 'px';
      }
    }
  }
  // console.log(value)
  if (key === 'transform') {
    // 直接设置不生效
    el.style.webkitTransform = value;
    el.style.MsTransform = value;
    el.style.msTransform = value;
    el.style.MozTransform = value;
    el.style.OTransform = value;
    el.style.transform = value;
  } else {
    el.style[key] = value;
  }
  return 0;
}
