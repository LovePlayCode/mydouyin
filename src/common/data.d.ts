interface Cover {
  uri: string;
  url_list: string[];
  width: number;
  height: number;
}

interface Music {
  id: number;
  title: string;
  author: string;
  cover_medium: Cover;
  cover_thumb: Cover;
  play_url: Cover & { url_key: string };
  duration: number;
  user_count: number;
  owner_id: string;
  owner_nickname: string;
  is_original: boolean;
}

interface PlayAddr {
  uri: string;
  url_list: string[];
  width: number;
  height: number;
  url_key: string;
  data_size: number;
  file_hash: string;
  file_cs: string;
}

interface Video {
  play_addr: PlayAddr;
  cover: Cover;
  poster: string;
  height: number;
  width: number;
  ratio: string;
  use_static_cover: boolean;
  duration: number;
}

interface Statistics {
  admire_count: number;
  comment_count: number;
  digg_count: number;
  collect_count: number;
  play_count: number;
  share_count: number;
}

interface Status {
  listen_video_status: number;
  is_delete: boolean;
  allow_share: boolean;
  is_prohibited: boolean;
  in_reviewing: boolean;
  part_see: number;
  private_status: number;
  review_result: {
    review_status: number;
  };
}

interface ShareInfo {
  share_url: string;
  share_link_desc: string;
}

interface SuggestWord {
  word: string;
  word_id: string;
  info: string;
}

interface SuggestWords {
  suggest_words: SuggestWord[];
  scene: string;
  icon_url: string;
  hint_text: string;
  extra_info: string;
}

interface Avatar {
  height: number;
  uri: string;
  url_list: string[];
  width: number;
}

interface CardEntry {
  card_data: string;
  event_params: string;
  goto_url: string;
  icon_dark: Cover;
  icon_light: Cover;
  sub_title: string;
  title: string;
  type: number;
}

interface ShareImage {
  uri: string;
  url_list: string[];
}

interface ShareQRCode {
  uri: string;
  url_list: string[];
}

interface AuthorShareInfo {
  bool_persist: number;
  share_desc: string;
  share_image_url: ShareImage;
  share_qrcode_url: ShareQRCode;
  share_title: string;
  share_url: string;
  share_weibo_desc: string;
}

interface Author {
  avatar_168x168: Avatar;
  avatar_300x300: Avatar;
  aweme_count: number;
  birthday_hide_level: number;
  can_show_group_card: number;
  card_entries: CardEntry[];
  city: string;
  commerce_info: {
    challenge_list: any;
    head_image_list: any;
    offline_info_list: any[];
    smart_phone_list: any;
    task_list: any;
  };
  commerce_user_info: {
    ad_revenue_rits: any;
    has_ads_entry: boolean;
    show_star_atlas_cooperation: boolean;
    star_atlas: number;
  };
  commerce_user_level: number;
  country: string;
  cover_colour: string;
  cover_url: Cover[];
  district: string;
  favoriting_count: number;
  follow_status: number;
  follower_count: number;
  follower_request_status: number;
  follower_status: number;
  following_count: number;
  forward_count: number;
  gender: number;
  ip_location: string;
  max_follower_count: number;
  mplatform_followers_count: number;
  nickname: string;
  province: string;
  public_collects_count: number;
  share_info: AuthorShareInfo;
  short_id: string;
  signature: string;
  total_favorited: number;
  uid: string;
  unique_id: string;
  user_age: number;
  white_cover_url: Cover[];
}

interface AwemeControl {
  can_forward: boolean;
  can_share: boolean;
  can_comment: boolean;
  can_show_comment: boolean;
}

interface AwemeData {
  aweme_id: string;
  isLoved?: boolean;
  desc: string;
  create_time: number;
  music: Music;
  video: Video;
  share_url: string;
  statistics: Statistics;
  status: Status;
  text_extra: any[];
  is_top: number;
  share_info: ShareInfo;
  duration: number;
  image_infos: any;
  risk_infos: {
    vote: boolean;
    warn: boolean;
    risk_sink: boolean;
    type: number;
    content: string;
  };
  position: any;
  author_user_id: number;
  prevent_download: boolean;
  long_video: any;
  aweme_control: AwemeControl;
  images: any;
  suggest_words: {
    suggest_words: SuggestWords[];
  };
  author: Author;
}
export type { AwemeData };
