import { useRef } from 'react';
import { useMount, useSetState } from 'ahooks';
import { useNavigate } from '@modern-js/runtime/router';
import styles from './page.module.less';
import data from './data.json';
import Back from '@/components/Back';
import './page.less';
import avater1 from '@/components/img/avatar/1.png';
import avater2 from '@/components/img/avatar/2.png';
import jin from '@/components/img/home/jin.webp';
import rankYellow from '@/components/img/home/rank-yellow.png';
import level from '@/components/img/home/level.webp';
import voice from '@/components/img/home/voice.png';
import more from '@/components/img/home/more.png';
import love from '@/components/img/home/love.webp';
import gift from '@/components/img/home/gift.webp';
import addLight from '@/components/img/add-light.png';
import Dom from '@/utils/dom';

const Page = () => {
  const navigate = useNavigate();
  // 父页面 Ref 实例
  const pageRef = useRef<HTMLDivElement>(null);
  // videoRef
  const videoRef = useRef<HTMLVideoElement>(null);
  // state 使用useSetState 统一管理 后续换成 hooks 里面的
  const [state, setState] = useSetState<{
    isFollowed: boolean;
    list: { name: string; text: string }[];
    userinfo: Record<string, any>;
  }>({
    isFollowed: false,
    list: [],
    userinfo: data,
  });
  // 评论组件
  const commentsRef = useRef<HTMLDivElement>(null);
  useMount(() => {
    setInterval(() => {
      sendComment();
      requestAnimationFrame(() => {
        commentsRef.current?.scrollTo({
          top:
            commentsRef.current?.scrollHeight -
            commentsRef.current?.clientHeight,
          behavior: 'smooth',
        });
      });
      requestAnimationFrame(() => {
        sendGift();
      });
      // 横幅定时发送
      requestAnimationFrame(() => {
        sendBarrage();
      });
    }, 1500);
  });
  const sendComment = () => {
    state.list.push({
      name: `谦男${Math.random()}`,
      text: '帅',
    });
    setState({
      list: [...state.list],
    });
  };
  // 送礼物
  const sendGift = () => {
    const page = new Dom(pageRef.current);
    const sendGift = new Dom().create(sendGiftTemplate());
    sendGift.on('animationend', () => {
      sendGift.remove();
    });
    const oldSendGift = new Dom('.send-gift');
    let top = document.body.clientHeight * 0.6;
    if (oldSendGift.els.length !== 0) {
      top = sendGift.removePx(oldSendGift.css('top') as string) - 70;
    }
    // 防止没获取到值的情况
    if (top < 100) {
      top = document.body.clientHeight * 0.6;
    }
    sendGift.css('top', top);
    page.append(sendGift);
  };
  // 生成 弹幕送礼物 相关元素
  const sendGiftTemplate = () => {
    return `<div class="send-gift">
          <div class="left">
            <img src="${avater1}" alt="" class="avatar">
            <div class="desc">
              <div class="name">谦男</div>
              <div class="sendto">
                <span class="send">送</span>
                <span class="to">小心</span>
              </div>
            </div>
            <div class="gift-wrapper">
              <img src="${gift}" alt="" class="gift-icon">
            </div>
          </div>
          <div class="right">
            x 10000
          </div>
        </div>`;
  };
  // TODO: 有点 bug translateX有点问题  可以换一个移动方式 才可以解决这个 bug
  const barrageTemplate = () => {
    return `
    <div class="barrage">
      <div class="type">测试名称</div>
      <div class="text">向下类精给每没较保十立铁马军。</div>
    </div>
    `;
  };
  // 中间横幅部分
  const sendBarrage = () => {
    const page = new Dom(pageRef.current);
    const barrage = new Dom().create(barrageTemplate());
    barrage.on('animationend', () => {
      barrage.remove();
    });
    const oldBarrages = new Dom('.barrage');
    let top = document.body.clientHeight * 0.35;
    if (oldBarrages.els.length !== 0) {
      top = barrage.removePx(oldBarrages.css('top') as string) + 20;
    }
    if (top > document.body.clientHeight * 0.5) {
      top = document.body.clientHeight * 0.35;
    }
    barrage.css('top', top);
    page.append(barrage);
  };
  const attention = () => {};
  const attentionOptionRef = useRef<HTMLDivElement>(null);
  return (
    <div className={styles.LivePage} ref={pageRef}>
      <div className="live-wrapper">
        <video
          ref={videoRef}
          src="https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cj1lq4jc77u0ng6s1gt0&amp;line=0&amp;file_id=bed51c00899b458cbc5d8280147c22a1&amp;sign=7749aec7bd62a3760065f60e40fc1867&amp;is_play_url=1&amp;source=PackSourceEnum_PUBLISH"
          poster="/images/jwWCPZVTIA4IKM-8WipLF.png"
          preload=""
          loop
          muted
          // eslint-disable-next-line react/no-unknown-property
          x5-video-player-type="h5-page"
          // eslint-disable-next-line react/no-unknown-property
          x5-video-player-fullscreen="false"
          // eslint-disable-next-line react/no-unknown-property
          webkit-playsinline="true"
          // eslint-disable-next-line react/no-unknown-property
          x5-playsinline="true"
          playsInline
          autoPlay
        >
          <p>您的浏览器不支持 video 标签。</p>
        </video>
      </div>
      <div className="float">
        <div className="top">
          <div className="left">
            <div className="liver">
              <img
                className="avatar"
                src={state.userinfo.avatar_168x168.url_list[0]}
                alt=""
              />
              <div className="desc">
                <div className="desc-wrapper">
                  <div className="name">{state.userinfo.nickname}</div>
                  <div className="count">2万本场点赞</div>
                </div>
                <div className="follow-btn">关注</div>
              </div>
            </div>
            <div className="left-bottom">
              <div className="tag">
                <img src={jin} alt="" />
                <span>唱歌</span>
              </div>
              <div className="tag rank">
                <img src={rankYellow} alt="" />
                <span>江苏第15名</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="follower">
              <img src={avater1} alt="" className="round" />
              <img src={avater2} alt="" className="round" />
              <img src={avater2} alt="" className="round" />
              <div className="round count">107</div>
              <Back
                click={() => {
                  navigate(-1);
                }}
                backClass="round close"
                img="close"
                mode="light"
              />
            </div>
            <div className="more">
              <div className="wrapper">
                <span>更多同城</span>
                <Back
                  scale=".5"
                  direction="right"
                  backClass="back"
                  img="back"
                  mode="light"
                />
                {/* <button className="back">
                  <img src="../../assets/img/icon/home/back.png" alt="返回" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="left">
            <div className="comments" ref={commentsRef}>
              <div className="comments-wrapper">
                <div className="comment notice">
                  <span className="text">
                    欢迎来到直播间！抖音严禁未成年人直播或打赏，直播间内严禁出现违法违规、低俗色情、吸烟酗酒等内容。如主播在直播过程中以不当方式诱导打赏、私下交易，请谨慎判断，以防人身财产损失。请大家注意财产安全，谨防网络诈骗。
                  </span>
                </div>
                {state.list.map((item, index) => (
                  <div className="comment" key={index}>
                    <div className="level">
                      <div className="wrapper">
                        <img src={level} alt="" />
                        <span>30</span>
                      </div>
                    </div>
                    <span className="name">{item.name}</span>
                    <span className="text">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="options">
              <div className="input">
                <span>说点什么</span>
                <img src={voice} alt="" />
              </div>
              <img src={more} alt="" className="more" />
              <img src={love} alt="" className="more" />
              <img src={gift} alt="" className="gift" />
            </div>
          </div>
          <div className="right">
            <div
              className={`avatar-wrapper ${state.isFollowed ? 'followed' : ''}`}
            >
              <img src={avater2} alt="" className="avatar" />
              {!state.isFollowed && (
                <div
                  className="options"
                  onClick={attention}
                  ref={attentionOptionRef}
                >
                  <img className="no" src={addLight} alt="" />
                  <img
                    className="yes"
                    src="../../assets/img/icon/ok-white.png"
                    alt=""
                  />
                </div>
              )}
              {state.isFollowed && (
                <img
                  src="../../assets/img/icon/home/followed.webp"
                  alt=""
                  className="follow"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
