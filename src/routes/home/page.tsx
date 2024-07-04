import { IconAlignLeft } from '@arco-design/web-react/icon';
import './index.less';

const Index = () => {
  return (
    <>
      <div className="test-slide-wrapper" id="home-index">
        <div className="slide horizontal">
          <div className="slide-list">
            {/* 侧边栏 */}
            <div className="sidebar"></div>
            {/* 主题内容 */}
            <div className="slide-item">
              <div className="indicator-home">
                <div className="notice">
                  <span>下拉刷新内容</span>
                </div>
                <div className="toolbar">
                  <div
                    style={{
                      width: '33rem',
                      height: '33rem',
                      fontSize: '24rem',
                    }}
                  >
                    <IconAlignLeft style={{ fontSize: '24rem' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
