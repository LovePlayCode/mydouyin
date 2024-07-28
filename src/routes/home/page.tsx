import './index.less';

import { useDeepCompareEffect, useSetState } from 'ahooks';
import HomeContext from '../contexts/HomeContext';
import Slide0 from './Slide0';
import Slide2 from './Slide2';
import SlideHorizontal from '@/components/SlideHorizontal';

import BaseFooter from '@/components/BaseFooter';
import Comment from '@/components/comment';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';
import Share from '@/components/Share';
import IndicatorHome from '@/components/IndicatorHome';
import SlideItem from '@/components/SlideItem';
import LongVideo from '@/components/LongVideo';

const Index = () => {
  const [state, setState] = useSetState({
    commentVisible: false,
    isSharing: false,
    // 用来控制头部显示隐藏
    fullScreen: false,
    // tab 索引
    navIndex: 0,
  });
  // 关闭弹窗
  const closeComments = () => {
    emitter.emit(EVENTKEYENUM.EXIT_FULLSCREEN);
    emitter.emit(EVENTKEYENUM.CLOSE_COMMENTS);
  };
  useDeepCompareEffect(() => {
    // 注册打开评论事件
    emitter.on(EVENTKEYENUM.OPEN_COMMENTS, () => {
      setState({
        commentVisible: true,
      });
      emitter.emit(EVENTKEYENUM.ENTER_FULLSCREEN);
    });
    // 注册打开分享面板
    emitter.on(EVENTKEYENUM.SHOW_SHARE, () => {
      setState({
        isSharing: true,
      });
    });
    // 注册头部 tab 展示
    emitter.on(EVENTKEYENUM.ENTER_FULLSCREEN, () => {
      setState({
        fullScreen: true,
      });
    });

    // 取消头部 tba 展示
    emitter.on(EVENTKEYENUM.EXIT_FULLSCREEN, () => {
      setState({
        fullScreen: false,
      });
    });
    return () => {
      emitter.off(EVENTKEYENUM.OPEN_COMMENTS, () => {
        setState({
          commentVisible: true,
        });
      });
      emitter.off(EVENTKEYENUM.ENTER_FULLSCREEN, () => {
        setState({
          fullScreen: true,
        });
      });
    };
  }, [state]);
  return (
    <>
      <HomeContext.Provider
        value={{ modelValue: state.commentVisible, setModelValue: setState }}
      >
        <div className="test-slide-wrapper" id="home-index">
          <div className="slide horizontal">
            <div className="slide-list">
              {/* 侧边栏 */}
              <div className="sidebar" style={{ display: 'none' }} />
              {/* 主题内容 */}
              <div className="slide-item">
                {!state.fullScreen && <IndicatorHome />}
                <SlideHorizontal
                  name="second"
                  index={state.navIndex}
                  className="first-horizontal-item"
                >
                  {/* 热点 tba */}
                  <Slide0 />
                  {/* 长视频 暂未实现 没找到抖音入口 */}
                  {/* <SlideItem>
                    <LongVideo />
                  </SlideItem> */}
                  {/* 关注 */}
                  <Slide2 />
                </SlideHorizontal>
                <BaseFooter />
              </div>
            </div>
          </div>
          {/* 评论组件 */}
          <Comment pageId="home-index" hide={closeComments} />
          {/* 分享组件 */}
          <Share
            modelValue={state?.isSharing}
            setModelValue={(value: boolean) => {
              setState({
                isSharing: value,
              });
            }}
            pageId="home-index"
          />
        </div>
      </HomeContext.Provider>
    </>
  );
};
export default Index;
