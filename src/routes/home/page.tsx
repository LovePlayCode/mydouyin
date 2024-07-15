import { IconAlignLeft, IconSearch } from '@arco-design/web-react/icon';
import './index.less';
import { useEffect, useRef, useState } from 'react';

import { createRoot } from 'react-dom/client';
import data from './data.json';
import Slide0 from './Slide0';
import SlideHorizontal from '@/components/SlideHorizontal';
import BaseVideo from '@/components/BaseVideo';
import SlideItem from '@/components/SlideItem';
import SlideList from '@/components/SlideList';

const Index = () => {
  const [state, setState] = useState(data);
  const slideListEl = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (!state.length) {
  //     return;
  //   }
  //   // 清空内容
  //   slideListEl.current!.innerHTML = '';

  //   const videoList = state.map(item => {
  //     return (
  //       <SlideItem key={item.aweme_id}>
  //         <SlideList data={state} />
  //       </SlideItem>
  //     );
  //   });
  //   createRoot(slideListEl.current!).render(<>{videoList}</>);
  // }, []);
  return (
    <>
      <div className="test-slide-wrapper" id="home-index">
        <div className="slide horizontal">
          <div className="slide-list">
            {/* 侧边栏 */}
            <div className="sidebar" style={{ display: 'none' }}></div>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
