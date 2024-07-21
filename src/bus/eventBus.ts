import mitt from 'mitt';

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
};
export type Events = {
  [EVENTKEYENUM.SINGLE_CLICK]: string;
  [EVENTKEYENUM.SINGLE_CLICK_BROADCAST]: SingleClickBroadcastParams;
};
const emitter = mitt<Events>();

export default emitter;
