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
