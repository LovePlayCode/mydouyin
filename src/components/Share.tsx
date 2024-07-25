import { type FC, useMemo } from 'react';
import FromBottomDialog from './FromBottomDialog';
import Back from './Back';
import BaseButton from './BaseButton';
import styles from './Share.module.less';
import { useHomeData } from '@/routes/home/store';
import checkRedShare from '@/components/img/check/check-red-share.png';
import c1 from '@/components/img/poster/1.jpg';
import torichang from '@/components/img/video/torichang.png';
import comeonplay from '@/components/img/video/comeonplay.png';
import dou from '@/components/img/video/dou.webp';
import warring from '@/components/img/video/warring.png';
import feedback from '@/components/img/video/feedback.webp';
import comeonlook from '@/components/img/video/comeonlook.webp';
import dislike from '@/components/img/video/dislike.png';
import bizhi from '@/components/img/video/bizhi.webp';

interface ShareProps {
  pageId: string;
  mode?: string;
  canDownload?: boolean;
  modelValue: boolean;
  setModelValue: (val: boolean) => any;
}
const Share: FC<ShareProps> = ({
  pageId,
  mode = 'video',
  canDownload = true,
  modelValue,
  setModelValue,
}) => {
  const { friends } = useHomeData();
  //   const { modelValue, setModelValue } = useContext(HomeContext);
  const isShare2Friend = useMemo(() => {
    return Boolean(friends.filter(fir => fir.select).length);
  }, [friends]);
  return (
    <FromBottomDialog
      pageId={pageId}
      modelValue={modelValue}
      mode="dark"
      height="320rem"
      showHengGang={false}
      maskMode="light"
      setModelValue={setModelValue}
    >
      <div className={styles.share}>
        {/* 分享组件头部 */}
        <div className="title">
          <span>分享给朋友</span>
          <Back mode="light" img="close" direction="right" />
        </div>
        <div className="content">
          <div className="friends list">
            {friends.map(friend => {
              return (
                <div className="option" key={friend.id}>
                  <img
                    style={{ opacity: 0.5 }}
                    className="avatar"
                    src={friend.avatar}
                    alt=""
                  />
                  <span>{friend.name}</span>
                  {friend.select && (
                    <img src={checkRedShare} className="checked" alt="" />
                  )}
                </div>
              );
            })}

            <div className="option">
              <Back backClass="more" mode="light" direction="right" />
              <span>更多朋友</span>
            </div>
          </div>
          <div className="bottom">
            {isShare2Friend && (
              <div className="share2friend">
                <div className="line" />
                <div className="comment">
                  <textarea placeholder="有什么想和好友说的" />
                  <img className="poster" src={c1} alt="" />
                </div>
                <div className="btns">
                  {/* <BaseButton type="dark2" radius="7" /> */}
                  <BaseButton btnClass="button" type="primary" radius="7">
                    发送
                  </BaseButton>
                </div>
              </div>
            )}
            {!isShare2Friend && (
              <div className="shares list">
                {mode === 'video' && (
                  <>
                    <div
                      className="option"
                      // onClick={handleOptionClick(() =>
                      //   closeShare('ShareToFriend'),
                      // )}
                    >
                      <img className="avatar" src={torichang} alt="" />
                      <span>转发</span>
                    </div>
                    <div
                      className="option"
                      // onClick={handleOptionClick(() =>
                      //   closeShare('ShareToFriend'),
                      // )}
                    >
                      {/* <Icon icon="icon-park-solid:good-two" /> */}
                      <svg
                        data-v-f212185e=""
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 48 48"
                        className="iconify iconify--icon-park-solid"
                      >
                        <path
                          fill="currentColor"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="4"
                          d="M4.189 22.173A2 2 0 0 1 6.181 20H10a2 2 0 0 1 2 2v19a2 2 0 0 1-2 2H7.834a2 2 0 0 1-1.993-1.827zM18 21.375c0-.836.52-1.584 1.275-1.94c1.649-.778 4.458-2.341 5.725-4.454c1.633-2.724 1.941-7.645 1.991-8.772c.007-.158.003-.316.024-.472c.271-1.953 4.04.328 5.485 2.74c.785 1.308.885 3.027.803 4.37c-.089 1.436-.51 2.823-.923 4.201l-.88 2.937h10.857a2 2 0 0 1 1.925 2.543l-5.37 19.016A2 2 0 0 1 36.986 43H20a2 2 0 0 1-2-2z"
                        />
                      </svg>
                      <span>推荐给朋友</span>
                    </div>
                    <div className="option">
                      {/* <Icon icon="humbleicons:link" /> */}
                      <svg
                        data-v-f212185e=""
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="iconify iconify--humbleicons"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeWidth="2"
                        >
                          <path d="m12 17l-1.5 1.5a3.536 3.536 0 0 1-5 0v0a3.536 3.536 0 0 1 0-5l3-3a3.536 3.536 0 0 1 5 0v0" />
                          <path d="m12 7l1.5-1.5a3.536 3.536 0 0 1 5 0v0a3.536 3.536 0 0 1 0 5l-3 3a3.536 3.536 0 0 1-5 0v0" />
                        </g>
                      </svg>
                      <span>复制链接</span>
                    </div>
                    <div className="option">
                      <img className="small" src={comeonplay} alt="" />
                      <span>合拍</span>
                    </div>
                    <div className="option">
                      <img className="small" src={dou} alt="" />
                      <span>帮上热门</span>
                    </div>
                    <div
                      className="option"
                      // onClick={handleOptionClick(() =>
                      //   history.push('/home/report', { mode }),
                      // )}
                    >
                      <img className="small" src={warring} alt="" />
                      <span>举报</span>
                    </div>
                    <div
                      className="option"
                      // onClick={handleOptionClick(() =>
                      //   closeShare('ShareToFriend'),
                      // )}
                    >
                      {/* <Icon icon="ion:paper-plane" /> */}
                      <svg
                        data-v-f212185e=""
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 512 512"
                        className="iconify iconify--ion"
                      >
                        <path
                          fill="currentColor"
                          d="M473 39.05a24 24 0 0 0-25.5-5.46L47.47 185h-.08a24 24 0 0 0 1 45.16l.41.13l137.3 58.63a16 16 0 0 0 15.54-3.59L422 80a7.07 7.07 0 0 1 10 10L226.66 310.26a16 16 0 0 0-3.59 15.54l58.65 137.38c.06.2.12.38.19.57c3.2 9.27 11.3 15.81 21.09 16.25h1a24.63 24.63 0 0 0 23-15.46L478.39 64.62A24 24 0 0 0 473 39.05"
                        />
                      </svg>
                      <span>私信朋友</span>
                    </div>
                    {canDownload && (
                      <div
                        className="option"
                        //   onClick={handleOptionClick(() => closeShare('download'))}
                      >
                        {/* <Icon icon="mingcute:download-fill" /> */}
                        <svg
                          data-v-f212185e=""
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          aria-hidden="true"
                          role="img"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                          className="iconify iconify--mingcute"
                        >
                          <g fill="none" fillRule="evenodd">
                            <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                            <path
                              fill="currentColor"
                              d="M12 2a1 1 0 0 0-1 1v2H5a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-6V3a1 1 0 0 0-1-1m1 3v8.828L14.828 12a1 1 0 0 1 1.415 1.414l-3.36 3.359a1.25 1.25 0 0 1-1.767 0l-3.359-3.359A1 1 0 1 1 9.172 12L11 13.828V5z"
                            />
                          </g>
                        </svg>
                        <span>保存本地</span>
                      </div>
                    )}
                    <div className="option">
                      <img className="small" src={feedback} alt="" />
                      <span>建群分享</span>
                    </div>
                    <div className="option">
                      <img className="small" src={comeonlook} alt="" />
                      <span>一起看视频</span>
                    </div>
                    <div className="option">
                      <img className="small" src={dislike} alt="" />
                      <span>不感兴趣</span>
                    </div>
                    <div className="option">
                      {/* <Icon icon="tabler:photo" /> */}
                      <svg
                        data-v-f212185e=""
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                        className="iconify iconify--tabler"
                      >
                        <g
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        >
                          <path d="M15 8h.01M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3z" />
                          <path d="m3 16l5-5c.928-.893 2.072-.893 3 0l5 5" />
                          <path d="m14 14l1-1c.928-.893 2.072-.893 3 0l3 3" />
                        </g>
                      </svg>
                      <span>生成图片</span>
                    </div>
                    <div className="option">
                      <img className="small" src={bizhi} alt="" />
                      <span>动态壁纸</span>
                    </div>
                    <div className="option">
                      <img className="small" src={feedback} alt="" />
                      <span>播放反馈</span>
                    </div>
                  </>
                )}

                {mode === 'music' && (
                  <>
                    <div className="option">
                      <img
                        className="small"
                        src="../assets/img/icon/components/video/tofriend.webp"
                        alt=""
                      />
                      <span>私信朋友</span>
                    </div>
                    <div className="option">
                      <img
                        className="small"
                        src="../assets/img/icon/components/video/warring.png"
                        alt=""
                      />
                      <span>举报音乐</span>
                    </div>
                  </>
                )}

                {mode === 'my-music' && (
                  <>
                    <div className="option">
                      <img
                        className="small"
                        src="../assets/img/icon/components/video/torichang.png"
                        alt=""
                      />
                      <span>转发到日常</span>
                    </div>
                    <div className="option">
                      <img
                        className="small"
                        src="../assets/img/icon/components/video/tofriend.webp"
                        alt=""
                      />
                      <span>私信朋友</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </FromBottomDialog>
  );
};
export default Share;
