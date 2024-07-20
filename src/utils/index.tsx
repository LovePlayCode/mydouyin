import BaseVideo from '../components/BaseVideo';

export function slideItemRender(props: any) {
  // , index, play, uniqueId
  return function render(item: any) {
    switch (item.type) {
      default:
        return (
          <BaseVideo
            videoUrl={item?.video.play_addr.url_list[0]}
            avatarUrl={item?.author.avatar_168x168?.url_list[0]}
            isplay={true}
          />
        );
    }
  };
}
