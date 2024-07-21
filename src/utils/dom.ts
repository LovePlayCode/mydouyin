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
export default class Dom {
  els: HTMLElement[] = [];

  constructor(arg?: any) {
    if (typeof arg === 'string') {
      this.find(arg);
    }
    if (typeof arg === 'object' && arg instanceof HTMLElement) {
      this.els.push(arg);
    }
    if (typeof arg === 'function') {
      document.addEventListener('DOMContentLoaded', arg);
    }
  }

  addClass(class1: string | string[]): this {
    if (typeof class1 === 'string') {
      for (const el of this.els) {
        el.classList.add(class1);
      }
      // this.els.forEach(el => {
      //   el.classList.add(class1);
      // });
    } else {
      for (const el of this.els) {
        el.classList.add(...class1);
      }
    }
    return this;
  }

  replaceClass(class1: string, class2: string): this {
    for (const el of this.els) {
      el.classList.replace(class1, class2);
    }
    // this.els.forEach(el => {
    //   el.classList.replace(class1, class2);
    // });
    return this;
  }

  find(tag: string): this {
    let els: any[] = [];
    if (this.els.length) {
      els = Array.from(this.els[0].querySelectorAll(tag));
    } else {
      els = Array.from(document.querySelectorAll(tag));
    }
    if (els.length) {
      this.els = Array.from(els);
    }
    return this;
  }

  create(template: string): this {
    const tempNode = document.createElement('div');
    tempNode.innerHTML = template.trim();
    this.els = [tempNode.firstChild as HTMLElement];
    return this;
  }

  append(that: Dom): this {
    for (const el of this.els) {
      for (const childEl of that.els) {
        el.appendChild(childEl);
      }
    }
    // this.els.forEach(el => {
    //   that.els.forEach(v => {
    //     el.appendChild(v);
    //   });
    // });
    return this;
  }

  remove(): this {
    for (const el of this.els) {
      el.parentNode?.removeChild(el);
    }
    // this.els.forEach(el => {
    //   el.parentNode?.removeChild(el);
    // });
    return this;
  }

  // eslint-disable-next-line consistent-return
  attr(...args: string[]): string | undefined {
    if (args.length === 1) {
      return (this.els[0] as any)[args[0]];
    }
  }

  css(...args: any[]): this | string {
    if (args.length === 1) {
      // 情况一：获取样式
      if (typeof args[0] === 'string') {
        return window.getComputedStyle(this.els[this.els.length - 1], null)[
          args?.[0] as any
        ];
        // biome-ignore lint/style/noUselessElse: <explanation>
      } else {
        // 情况三：设置多个样式
        // biome-ignore lint/complexity/noForEach: <explanation>
        Object.keys(args[0]).forEach(key => {
          // biome-ignore lint/complexity/noForEach: <explanation>
          this.els.forEach(el => {
            el.style[key as any] = this.getStyleValue(key, args[0][key]);
          });
        });
      }
    } else {
      // 情况二，设置一对css样式
      // biome-ignore lint/complexity/noForEach: <explanation>
      this.els.forEach(el => {
        el.style[args[0]] = this.getStyleValue(args[0], args[1]);
      });
    }
    return this;
  }

  on(eventName: string, fn: EventListenerOrEventListenerObject): this {
    const eventArray = eventName.split(' ');
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.els.forEach(el => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      eventArray.forEach(event => {
        el.addEventListener(event, fn);
      });
    });
    return this;
  }

  trigger(eventName: string): this {
    const eventArray = eventName.split(' ');
    // biome-ignore lint/complexity/noForEach: <explanation>
    this.els.forEach(el => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      eventArray.forEach(event => {
        el.dispatchEvent(new Event(event));
      });
    });
    return this;
  }

  getWidth(): number {
    return this.els[0].getBoundingClientRect().width;
  }

  getHeight(): number {
    return this.els[0].getBoundingClientRect().height;
  }

  getStyleValue(key: string, value: any): string {
    const whiteList = ['top', 'left', 'right', 'bottom'];
    if (whiteList.includes(key)) {
      if (typeof value === 'number') {
        return `${value}px`;
      }
    }
    return value;
  }

  removePx(val: string): number {
    return parseInt(val);
  }
}
