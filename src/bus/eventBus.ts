import mitt from 'mitt';
import { HeaderEnum } from '@/common/contains';

export enum EVENTKEYENUM {
  SINGLE_CLICK = 'SINGLE_CLICK',
  SINGLE_CLICK_BROADCAST = 'SINGLE_CLICK_BROADCAST',
  ENTER_FULLSCREEN = 'ENTER_FULLSCREEN',
  EXIT_FULLSCREEN = 'EXIT_FULLSCREEN',
  TOGGLE_FULLSCREEN = 'TOGGLE_FULLSCREEN',
  TOGGLE_COMMENT = 'TOGGLE_COMMENT',
  OPEN_COMMENTS = 'OPEN_COMMENTS',
  CLOSE_COMMENTS = 'CLOSE_COMMENTS',
  DIALOG_MOVE = 'DIALOG_MOVE',
  DIALOG_END = 'DIALOG_END',
  OPEN_SUB_TYPE = 'OPEN_SUB_TYPE',
  CLOSE_SUB_TYPE = 'CLOSE_SUB_TYPE',
  ITEM_TOGGLE = 'ITEM_TOGGLE',
  ITEM_PLAY = 'ITEM_PLAY',
  ITEM_STOP = 'ITEM_STOP',
  NAV = 'NAV',
  GO_USERINFO = 'GO_USERINFO',
  SHOW_SHARE = 'SHOW_SHARE',
  UPDATE_ITEM = 'UPDATE_ITEM',
  CURRENT_ITEM = 'CURRENT_ITEM',
  REMOVE_MUTED = 'REMOVE_MUTED',
  HIDE_MUTED_NOTICE = 'HIDE_MUTED_NOTICE',
  TOGGLE_CURRENT_VIDEO = 'TOGGLE_CURRENT_VIDEO',
  SHOW_AUDIO_CALL = 'SHOW_AUDIO_CALL',
}
export type SingleClickBroadcastParams = {
  type: EVENTKEYENUM;
  index: number;
  uniqueId: HeaderEnum;
};
export type Events = {
  [EVENTKEYENUM.SINGLE_CLICK]: HeaderEnum;
  [EVENTKEYENUM.SINGLE_CLICK_BROADCAST]: SingleClickBroadcastParams;
  [EVENTKEYENUM.OPEN_COMMENTS]: string;
  [EVENTKEYENUM.CLOSE_COMMENTS]: undefined | null;
  [EVENTKEYENUM.DIALOG_END]: {
    tag: string;
    isClose: boolean;
  };
  [EVENTKEYENUM.DIALOG_MOVE]: {
    tag: string;
    distance: number;
  };
  /**
   * 调出分享面板
   */
  [EVENTKEYENUM.SHOW_SHARE]: undefined | null;
  /**
   * 显示头部tab
   */
  [EVENTKEYENUM.ENTER_FULLSCREEN]: undefined | null;
  /**
   * 取消显示头部 tab
   */
  [EVENTKEYENUM.EXIT_FULLSCREEN]: undefined | null;
};
const emitter = mitt<Events>();

export default emitter;
