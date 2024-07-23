import BaseVideo from '../components/BaseVideo';

export function slideItemRender(props: any) {
  // , index, play, uniqueId
  return function render(
    item: any,
    isplay: boolean,
    position: {
      uniqueId: string;
      index: number;
    },
  ) {
    switch (item.type) {
      default:
        return (
          <BaseVideo
            videoUrl={item?.video.play_addr.url_list[0]}
            isplay={isplay}
            position={position}
            item={item}
          />
        );
    }
  };
}
/**
 *
 * @param min 最小
 * @param max 最大
 * @returns
 */
export function random(min: number, max: number) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // 包含最小值和最大值
}
/**
 * 解析数字
 * @param num 数字
 * @returns 返回解析结果
 */
export function _formatNumber(num: number) {
  if (!num) {
    return '';
  }
  if (num > 100000000) {
    return `${(num / 100000000).toFixed(1)}亿`;
  }
  if (num > 10000) {
    return `${(num / 10000).toFixed(1)}万`;
  }
  return num;
}

export function _dateFormat(val: number, type?: string): string {
  if (!val) {
    return '';
  }
  if (String(val).length === 10) {
    val *= 1000;
  }
  const d = new Date(Number(val));
  const year = d.getFullYear();
  const m = d.getMonth() + 1;
  const mStr = m < 10 ? `0${m}` : m;
  const day = d.getDate();
  const dayStr = day < 10 ? `0${day}` : day;
  const h = d.getHours();
  const hStr = h < 10 ? `0${h}` : h;
  const min = d.getMinutes();
  const minStr = min < 10 ? `0${min}` : min;
  const sec = d.getSeconds();
  const secStr = sec < 10 ? `0${sec}` : sec;
  switch (type) {
    case 'Y':
      return `${year}`;
    case 'M':
      return `${year}-${mStr}`;
    case 'M_D':
      return `${mStr}-${dayStr}`;
    case 'M_CN':
      return `${year}年${mStr}月`;
    case 'D':
      return `${year}-${mStr}-${dayStr}`;
    case 'm':
      return `${year}-${mStr}-${dayStr} ${hStr}:${minStr}`;
    default:
      return `${year}-${mStr}-${dayStr} ${hStr}:${minStr}:${secStr}`;
  }
}
/**
 * 解析时间
 */
export function _time(time: number) {
  if (String(time).length === 10) {
    time *= 1000;
  }
  const date = new Date(Number(time));
  const now = new Date();
  const d = now.valueOf() - date.valueOf();
  let str = '';
  if (d < 1000 * 60) {
    str = '刚刚';
  } else if (d < 1000 * 60 * 60) {
    str = `${(d / (1000 * 60)).toFixed()}分钟前`;
  } else if (d < 1000 * 60 * 60 * 24) {
    str = `${(d / (1000 * 60 * 60)).toFixed()}小时前`;
  } else if (d < 1000 * 60 * 60 * 24 * 2) {
    str = '1天前';
  } else if (d < 1000 * 60 * 60 * 24 * 3) {
    str = '2天前';
  } else if (d < 1000 * 60 * 60 * 24 * 4) {
    str = '3天前';
  } else if (date.getFullYear() === now.getFullYear()) {
    str = _dateFormat(time, 'M_D');
  } else {
    str = _dateFormat(time, 'D');
  }
  return str;
}

/**
 * 解析时间
 * @param v 时间
 * @returns
 */
export function _duration(v: any) {
  if (!v) {
    return '00:00';
  }
  const m = Math.floor(v / 60);
  // let s = v % 60
  const s = Math.round(v % 60);
  let str = '';
  if (m === 0) {
    str = '00';
  } else if (m > 0 && m < 10) {
    str = `0${m}`;
  } else {
    str = `${m}`;
  }
  str += ':';
  if (s === 0) {
    str += '00';
  } else if (s > 0 && s < 10) {
    str += `0${s}`;
  } else {
    str += s;
  }
  return str;
}
