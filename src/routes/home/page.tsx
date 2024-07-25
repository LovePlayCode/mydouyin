import { IconAlignLeft, IconSearch } from '@arco-design/web-react/icon';
import './index.less';

import { useDeepCompareEffect, useSetState } from 'ahooks';
import HomeContext from '../contexts/HomeContext';
import Slide0 from './Slide0';
import SlideHorizontal from '@/components/SlideHorizontal';

import BaseFooter from '@/components/BaseFooter';
import Comment from '@/components/comment';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';
import Share from '@/components/Share';

const Index = () => {
  const [state, setState] = useSetState({
    commentVisible: false,
    isSharing: false,
  });

  useDeepCompareEffect(() => {
    // 注册打开评论事件
    emitter.on(EVENTKEYENUM.OPEN_COMMENTS, () => {
      setState({
        commentVisible: true,
      });
    });
    // 注册打开分享面板
    emitter.on(EVENTKEYENUM.SHOW_SHARE, () => {
      setState({
        isSharing: true,
      });
    });
    return () => {
      emitter.off(EVENTKEYENUM.OPEN_COMMENTS, () => {
        setState({
          commentVisible: true,
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
                <div className="indicator-home">
                  <div className="notice">
                    <span>下拉刷新内容</span>
                  </div>
                  <div className="toolbar">
                    <div
                      style={{
                        width: '24rem',
                        height: '24rem',
                        fontSize: '24rem',
                      }}
                    >
                      <IconAlignLeft style={{ fontSize: '24rem' }} />
                    </div>
                    <div className="tab-ctn">
                      <div className="tabs">
                        <div className="tab">
                          <span>热点</span>
                        </div>
                        <div className="tab">
                          <span>长视频</span>
                        </div>
                        <div className="tab">
                          <span>关注</span>
                        </div>
                        <div className="tab">
                          <span>经验</span>
                        </div>
                        <div className="tab">
                          <span>推荐</span>
                        </div>
                      </div>
                      <div className="indicator" />
                    </div>
                    {/* 搜索图标展示区域 */}
                    <div
                      style={{ width: '24rem', height: '24rem' }}
                      className="searchIcon"
                    >
                      <IconSearch />
                    </div>
                  </div>
                </div>
                <SlideHorizontal className="first-horizontal-item">
                  <Slide0 />
                </SlideHorizontal>
                <BaseFooter />
              </div>
            </div>
          </div>
          {/* 评论组件 */}
          <Comment pageId="home-index" />
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
