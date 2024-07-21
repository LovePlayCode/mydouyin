import type { FC } from 'react';
import FromBottomDialog from './FromBottomDialog';
import styles from './comment.module.less';

interface CommentProps {
  pageId: string;
  modelValue: boolean;
}
const Comment: FC<CommentProps> = ({ pageId, modelValue }) => {
  return (
    <FromBottomDialog
      pageId={pageId}
      modelValue={modelValue}
      showHengGang={false}
      maskMode="light"
      mode="white"
      header={<></>}
    >
      <div className={styles.comment}>
        <div className="wrapper">
          {/* 评论主体内容 */}
          <div className="items">
            <div className="item">
              <div className="main">
                <div className="content">
                  <img src="" alt="" className="head-image" />
                  <div className="comment-container">
                    <div className="name">测试名称</div>
                    <div className="detail">该评论已折叠</div>
                    <div className="time-wrapper">
                      <div className="left">
                        <div className="time">23</div>
                        <div className="replay-text">回复</div>
                      </div>
                      <div className="right d-flex" style={{ gap: '10rem' }}>
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
                          <span>2.0万</span>
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
            </div>
          </div>
        </div>
        {/* 输入框 */}
        <div className="input-toolbar">
          <div className="toolbar">
            <div className="input-wrapper">
              <div className="auto-input" contentEditable />
              <div data-v-d83ea80c="" className="right">
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </FromBottomDialog>
  );
};
export default Comment;
