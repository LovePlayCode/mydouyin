import { type FC, useContext } from 'react';
import { useRequest } from 'ahooks';
import clsx from 'clsx';
import FromBottomDialog from './FromBottomDialog';
import styles from './comment.module.less';
import AutoInput from './AutoInput';
import call from './img/call.png';
import emoji from './img/emoji-black.png';
import darkClose from './img/dark-close.png';
import { videoComments } from '@/api/videos';
import { _formatNumber, _time } from '@/utils';
import HomeContext from '@/routes/contexts/HomeContext';
import emitter, { EVENTKEYENUM } from '@/bus/eventBus';

interface CommentProps {
  pageId: string;
  hide: () => any;
}
const Comment: FC<CommentProps> = ({ pageId, hide }) => {
  const { modelValue, setModelValue } = useContext(HomeContext);
  const { data, loading } = useRequest(videoComments);
  return (
    <FromBottomDialog
      pageId={pageId}
      modelValue={modelValue}
      setModelValue={(value: boolean) => {
        setModelValue({
          commentVisible: value,
        });
      }}
      showHengGang={false}
      maskMode="light"
      mode="white"
      height="calc(var(--vh, 1vh) * 70)"
      hide={hide}
      tag="comment"
      header={
        <div className={styles.title}>
          <img
            src={darkClose}
            className={styles.close}
            alt=""
            style={{ opacity: 0 }}
          />
          <div className="num">{_formatNumber(data?.data?.length)} 条评论</div>
          <div className="right">
            <svg
              data-v-d83ea80c=""
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="iconify iconify--prime"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M14 3.75a.75.75 0 0 0 0 1.5h3.69l-4.72 4.72a.75.75 0 1 0 1.06 1.06l4.72-4.72V10a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 0-.75-.75zm-4 16.5a.75.75 0 0 0 0-1.5H6.31l4.72-4.72a.75.75 0 1 0-1.06-1.06l-4.72 4.72V14a.75.75 0 0 0-1.5 0v5.5c0 .414.336.75.75.75z"
                clipRule="evenodd"
              />
            </svg>
            <svg
              data-v-d83ea80c=""
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              className="iconify iconify--ic"
            >
              <path
                fill="currentColor"
                d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59L7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12L5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"
              />
            </svg>
          </div>
        </div>
      }
    >
      <div className={styles.comment}>
        {!loading && (
          <div className="wrapper">
            {/* 评论主体内容 */}
            <div className="items">
              {data?.data?.map((curItem: any) => {
                return (
                  <div className="item" key={curItem?.comment_id}>
                    {/* 评论主体内容 */}
                    <div className="main">
                      <div className="content">
                        <img
                          src={curItem?.avatar}
                          alt=""
                          className="head-image"
                        />
                        <div className="comment-container">
                          <div className="name">{curItem?.nickname}</div>
                          <div
                            className={clsx('detail', {
                              gray: curItem?.user_buried,
                            })}
                          >
                            {curItem?.user_buried
                              ? '该评论已折叠'
                              : curItem?.content}
                          </div>
                          <div className="time-wrapper">
                            <div className="left">
                              <div className="time">
                                {_time(curItem?.create_time)}
                                {curItem.ip_location &&
                                  ` · ${curItem.ip_location}`}
                              </div>
                              <div className="replay-text">回复</div>
                            </div>
                            <div
                              className="right d-flex"
                              style={{ gap: '10rem' }}
                            >
                              <div className="love">
                                {/* 爱心图标 */}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  aria-hidden="true"
                                  role="img"
                                  className="love-image iconify iconify--icon-park-outline"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 48 48"
                                >
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                                  />
                                </svg>
                                <span>
                                  {_formatNumber(curItem?.digg_count)}
                                </span>
                              </div>
                              <div className="love">
                                <svg
                                  data-v-d83ea80c=""
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  aria-hidden="true"
                                  role="img"
                                  className="love-image iconify iconify--icon-park-outline"
                                  width="1em"
                                  height="1em"
                                  viewBox="0 0 48 48"
                                >
                                  <path
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="4"
                                    d="m24 31l-3-5l7-6l-9-5l1-5.8C18.5 8.432 16.8 8 15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23c7-2 20-12 20-23c0-6.075-4.925-11-11-11c-1.8 0-3.5.433-5 1.2"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {curItem?.sub_comment_count && (
                      <div className="replies">
                        {curItem?.showChildren ? (
                          <div className="reply">
                            <div className="content">
                              <img src="" alt="" className="head-image" />
                              <div className="comment-container">
                                <div className="name">
                                  测试
                                  <div className="reply-user" />
                                  123
                                </div>
                                <div className="detail">测试评论</div>
                                <div className="time-wrapper">
                                  <div className="left">
                                    <div className="time">时间</div>
                                    <div className="reply-text">回复</div>
                                  </div>
                                  <div className="love">
                                    <svg
                                      data-v-d83ea80c=""
                                      xmlns="http://www.w3.org/2000/svg"
                                      xmlnsXlink="http://www.w3.org/1999/xlink"
                                      aria-hidden="true"
                                      role="img"
                                      className="love-image iconify iconify--icon-park-outline"
                                      width="1em"
                                      height="1em"
                                      viewBox="0 0 48 48"
                                    >
                                      <path
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="4"
                                        d="M15 8C8.925 8 4 12.925 4 19c0 11 13 21 20 23.326C31 40 44 30 44 19c0-6.075-4.925-11-11-11c-3.72 0-7.01 1.847-9 4.674A10.987 10.987 0 0 0 15 8"
                                      />
                                    </svg>
                                    <span>20万</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="more">
                            <div className="gang" />
                            <span>展开</span>
                            <svg
                              data-v-d83ea80c=""
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              aria-hidden="true"
                              role="img"
                              width="1em"
                              height="1em"
                              viewBox="0 0 1024 1024"
                              className="iconify iconify--ep"
                            >
                              <path
                                fill="currentColor"
                                d="M104.704 338.752a64 64 0 0 1 90.496 0l316.8 316.8l316.8-316.8a64 64 0 0 1 90.496 90.496L557.248 791.296a64 64 0 0 1-90.496 0L104.704 429.248a64 64 0 0 1 0-90.496"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 输入框 */}
        <div className="input-toolbar">
          <div className="toolbar">
            <div className="input-wrapper">
              <AutoInput modelValue={''} />
              <div className="auto-input" contentEditable />
              <div data-v-d83ea80c="" className="right">
                <img src={call} alt="" />
                <img src={emoji} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FromBottomDialog>
  );
};
export default Comment;
