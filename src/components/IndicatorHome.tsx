import { IconAlignLeft, IconSearch } from '@arco-design/web-react/icon';

const IndicatorHome = () => {
  return (
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
        <div style={{ width: '24rem', height: '24rem' }} className="searchIcon">
          <IconSearch />
        </div>
      </div>
    </div>
  );
};
export default IndicatorHome;
