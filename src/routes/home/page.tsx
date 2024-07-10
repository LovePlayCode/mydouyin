import { IconAlignLeft, IconSearch } from '@arco-design/web-react/icon';
import './index.less';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import SlideHorizontal from '@/components/SlideHorizontal';
import BaseVideo from '@/components/BaseVideo';
import SlideItem from '@/components/SlideItem';

const Index = () => {
  const [state, setState] = useState([
    {
      aweme_id: '7260749400622894336',
      desc: '你说爱像云 要自在漂浮才美丽',
      create_time: 1690524964,
      music: {
        id: 7123453673090321000,
        title: '禁盗用',
        author: 'LoveW_',
        cover_medium: {
          uri: '720x720/aweme-avatar/tos-cn-avt-0015_5374859713808b0007ba979b1f18171c',
          url_list: [
            'https://p3-pc.douyinpic.com/aweme/720x720/aweme-avatar/tos-cn-avt-0015_5374859713808b0007ba979b1f18171c.jpeg?from=116350172',
          ],
          width: 720,
          height: 720,
        },
        cover_thumb: {
          uri: '100x100/aweme-avatar/tos-cn-avt-0015_5374859713808b0007ba979b1f18171c',
          url_list: [
            'https://p3-pc.douyinpic.com/aweme/100x100/aweme-avatar/tos-cn-avt-0015_5374859713808b0007ba979b1f18171c.jpeg?from=116350172',
          ],
          width: 720,
          height: 720,
        },
        play_url: {
          uri: 'https://sf5-hl-cdn-tos.douyinstatic.com/obj/ies-music/7123453672335690532.mp3',
          url_list: [
            'https://sf5-hl-cdn-tos.douyinstatic.com/obj/ies-music/7123453672335690532.mp3',
            'https://sf3-cdn-tos.douyinstatic.com/obj/ies-music/7123453672335690532.mp3',
          ],
          width: 720,
          height: 720,
          url_key: '7123453673090321159',
        },
        duration: 17,
        user_count: 0,
        owner_id: '1711265034548715',
        owner_nickname: 'LoveW_',
        is_original: false,
      },
      video: {
        play_addr: {
          uri: 'v0d00fg10000cj1lq4jc77u0ng6s1gt0',
          url_list: [
            'https://www.douyin.com/aweme/v1/play/?video_id=v0d00fg10000cj1lq4jc77u0ng6s1gt0&line=0&file_id=bed51c00899b458cbc5d8280147c22a1&sign=7749aec7bd62a3760065f60e40fc1867&is_play_url=1&source=PackSourceEnum_PUBLISH',
          ],
          width: 1080,
          height: 1920,
          url_key: 'v0d00fg10000cj1lq4jc77u0ng6s1gt0_h264_1080p_2053262',
          data_size: 3480280,
          file_hash: '7749aec7bd62a3760065f60e40fc1867',
          file_cs:
            'c:0-16104-634c|d:0-1740139-1d83,1740140-3480279-e5a6|a:v0d00fg10000cj1lq4jc77u0ng6s1gt0',
        },
        cover: {
          uri: 'tos-cn-i-0813/oYVDeaFZyENAAAAKXCYfxD6hI4zADNAURgtySl',
          url_list: ['jwWCPZVTIA4IKM-8WipLF.png'],
          width: 720,
          height: 720,
        },
        poster: 'a1.jpg',
        height: 3840,
        width: 2160,
        ratio: '1080p',
        use_static_cover: true,
        duration: 13560,
      },
      share_url:
        'https://www.iesdouyin.com/share/video/7260749400622894336/?region=CN&mid=7123453673090321159&u_code=13kgm680k&did=MS4wLjABAAAAiOgYyZm8XbWZMr5o3OvhR-TEOuNygb_hQOwkie-VXJpDYaR4vZfpiIGBfAWKCFHB&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title&share_sign=LF.QuEh0GZk3quR7m.I3KpyKn2XyfNLNYHzuQDgWLpc-&share_version=170400&ts=1710491656&from_aid=6383&from_ssr=1',
      statistics: {
        admire_count: 0,
        comment_count: 21582,
        digg_count: 1246636,
        collect_count: 64460,
        play_count: 0,
        share_count: 172803,
      },
      status: {
        listen_video_status: 0,
        is_delete: false,
        allow_share: true,
        is_prohibited: false,
        in_reviewing: false,
        part_see: 0,
        private_status: 0,
        review_result: {
          review_status: 0,
        },
      },
      text_extra: [],
      is_top: 1,
      share_info: {
        share_url:
          'https://www.iesdouyin.com/share/video/7260749400622894336/?region=CN&mid=7123453673090321159&u_code=13kgm680k&did=MS4wLjABAAAAiOgYyZm8XbWZMr5o3OvhR-TEOuNygb_hQOwkie-VXJpDYaR4vZfpiIGBfAWKCFHB&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title&share_sign=LF.QuEh0GZk3quR7m.I3KpyKn2XyfNLNYHzuQDgWLpc-&share_version=170400&ts=1710491656&from_aid=6383&from_ssr=1',
        share_link_desc:
          '7.46 04/12 Duf:/ D@h.ba 你说爱像云 要自在漂浮才美丽  %s 复制此链接，打开Dou音搜索，直接观看视频！',
      },
      duration: 13560,
      image_infos: null,
      risk_infos: {
        vote: false,
        warn: false,
        risk_sink: false,
        type: 0,
        content: '',
      },
      position: null,
      author_user_id: 59054327754,
      prevent_download: false,
      long_video: null,
      aweme_control: {
        can_forward: true,
        can_share: true,
        can_comment: true,
        can_show_comment: true,
      },
      images: null,
      suggest_words: {
        suggest_words: [
          {
            words: [
              {
                word: '一只顾',
                word_id: '6658760941217256711',
                info: '{"qrec_for_search":"{\\"video_ecom\\":\\"1\\"}"}',
              },
            ],
            scene: 'comment_top_rec',
            icon_url: '',
            hint_text: '大家都在搜：',
            extra_info: '{}',
          },
          {
            words: [
              {
                word: '香秀早期照片护士',
                word_id: '6999224590481708302',
                info: '{"qrec_for_search":"{\\"video_ecom\\":\\"1\\"}"}',
              },
            ],
            scene: 'feed_bottom_rec',
            icon_url: '',
            hint_text: '相关搜索',
            extra_info: '{}',
          },
          {
            words: [
              {
                word: '一只顾',
                word_id: '6658760941217256711',
                info: '{"qrec_for_search":"{\\"video_ecom\\":\\"1\\"}"}',
              },
            ],
            scene: 'detail_inbox_rex',
            icon_url: '',
            hint_text: '',
            extra_info: '{}',
          },
        ],
      },
      author: {
        avatar_168x168: {
          height: 720,
          uri: 'aweme-avatar/mosaic-legacy_20b7700050147c01968f3',
          url_list: [
            'https://p3-pc.douyinpic.com/img/aweme-avatar/mosaic-legacy_20b7700050147c01968f3~c5_168x168.jpeg?from=2956013662',
          ],
          width: 720,
        },
        avatar_300x300: {
          height: 720,
          uri: 'aweme-avatar/mosaic-legacy_20b7700050147c01968f3',
          url_list: [
            'https://p3-pc.douyinpic.com/img/aweme-avatar/mosaic-legacy_20b7700050147c01968f3~c5_300x300.jpeg?from=2956013662',
          ],
          width: 720,
        },
        aweme_count: 296,
        birthday_hide_level: 1,
        can_show_group_card: 1,
        card_entries: [
          {
            card_data:
              '{"is_order_card":false,"has_new":false,"is_store":false,"shop_id":"","product_count":6,"store_type":"window","icon_is_repeat":false,"icon_type":"png","is_promotion_icon":false,"subtitle_resource_list":""}',
            event_params: '{"entrance_location":"others_homepage"}',
            goto_url:
              'sslocal://goods/shop?uid=59054327754&sec_uid=MS4wLjABAAAAe_AKPvxBX0C_4vyLj5Wye-_BU8M0S6tZFZUu61FuycU',
            icon_dark: {
              url_list: [
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_dark-3x.png',
                'https://lf9-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_dark-3x.png',
                'https://lf26-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_dark-3x.png',
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_dark-2x.png',
                'https://lf9-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_dark-2x.png',
                'https://lf26-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_dark-2x.png',
              ],
            },
            icon_light: {
              url_list: [
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_light-3x.png',
                'https://lf9-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_light-3x.png',
                'https://lf26-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_light-3x.png',
                'https://lf3-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_light-2x.png',
                'https://lf9-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_light-2x.png',
                'https://lf26-static.bytednsdoc.com/obj/eden-cn/azlylaup_j_tvjl/ljhwZthlaukjlkulzlp/ecom_window/ecom_window_other_light-2x.png',
              ],
            },
            sub_title: '6件好物',
            title: '进入橱窗',
            type: 1,
          },
        ],
        city: '',
        commerce_info: {
          challenge_list: null,
          head_image_list: null,
          offline_info_list: [],
          smart_phone_list: null,
          task_list: null,
        },
        commerce_user_info: {
          ad_revenue_rits: null,
          has_ads_entry: true,
          show_star_atlas_cooperation: true,
          star_atlas: 1,
        },
        commerce_user_level: 0,
        country: '',
        cover_colour: '#03997706',
        cover_url: [
          {
            uri: 'douyin-user-image-file/f2196ddaa37f3097932d8a29ff0d0ca5',
            url_list: ['AiIEMkIA7Cb3s5c4e7e6g.png'],
          },
          {
            uri: 'c8510002be9a3a61aad2',
            url_list: ['aHzLr77vcdBMUil15rXBa.png'],
          },
        ],
        district: '',
        favoriting_count: 0,
        follow_status: 0,
        follower_count: 7078268,
        follower_request_status: 0,
        follower_status: 0,
        following_count: 88,
        forward_count: 79,
        gender: 2,
        ip_location: 'IP属地：天津',
        max_follower_count: 7078290,
        mplatform_followers_count: 7078268,
        nickname: '我是香秀🐂🍺',
        province: '',
        public_collects_count: 0,
        share_info: {
          bool_persist: 1,
          share_desc: '长按复制此条消息，打开抖音搜索，查看TA的更多作品。',
          share_image_url: {
            uri: 'tos-cn-p-0015/oge0HBDnlBbbZHjeDc4WtAI7AA0xb88gd9Ipjc',
            url_list: ['5jTb5yW0_50o6UaLR5hvo.png'],
          },
          share_qrcode_url: {
            uri: '216a001823018b74cedd',
            url_list: [
              'https://p3.douyinpic.com/obj/216a001823018b74cedd',
              'https://p6.douyinpic.com/obj/216a001823018b74cedd',
              'https://p11.douyinpic.com/obj/216a001823018b74cedd',
            ],
          },
          share_title: '快来加入抖音，让你发现最有趣的我！',
          share_url:
            'www.iesdouyin.com/share/user/MS4wLjABAAAAe_AKPvxBX0C_4vyLj5Wye-_BU8M0S6tZFZUu61FuycU?did=MS4wLjABAAAAiOgYyZm8XbWZMr5o3OvhR-TEOuNygb_hQOwkie-VXJpDYaR4vZfpiIGBfAWKCFHB&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&sec_uid=MS4wLjABAAAAe_AKPvxBX0C_4vyLj5Wye-_BU8M0S6tZFZUu61FuycU&from_ssr=1&from_aid=6383&u_code=13kgm680k',
          share_weibo_desc:
            '长按复制此条消息，打开抖音搜索，查看TA的更多作品。',
        },
        short_id: '8357999',
        signature: '合作：X229896（备注品牌 ）',
        total_favorited: 202309485,
        uid: '59054327754',
        unique_id: '',
        user_age: -1,
        white_cover_url: [
          {
            uri: 'douyin-user-image-file/f2196ddaa37f3097932d8a29ff0d0ca5',
            url_list: ['N_SVO2HXIpaY04hgsXYDI.png'],
          },
          {
            uri: '318f1000413827e122102',
            url_list: ['Sfz4PgDDqyNYHkFyXub5g.png'],
          },
        ],
      },

      type: 'recommend-video',
    },
    {
      aweme_id: '6686589698707590411',
      desc: '门有点矮哟～',
      create_time: 1556887936,
      music: {
        id: 6452110567468436000,
        title: 'GQ',
        author: 'Lola Coca',
        cover_medium: {
          uri: 'tos-cn-v-2774c002/8a56e9005cdd495995bb363bf05b3acc',
          url_list: [
            'https://p3-sign.douyinpic.com/tos-cn-v-2774c002/8a56e9005cdd495995bb363bf05b3acc~200x200.jpeg?lk3s=08d74b56&x-expires=1710576724&x-signature=VucON4XTlKnrxSw7Wqxk3bSec14%3D',
            'https://p9-sign.douyinpic.com/tos-cn-v-2774c002/8a56e9005cdd495995bb363bf05b3acc~200x200.jpeg?lk3s=08d74b56&x-expires=1710576724&x-signature=Iy8O%2F%2FxGebGOLjlIWu1C55M0UFo%3D',
          ],
          width: 720,
          height: 720,
        },
        cover_thumb: {
          uri: 'tos-cn-v-2774c002/8a56e9005cdd495995bb363bf05b3acc',
          url_list: [
            'https://p26-sign.douyinpic.com/tos-cn-v-2774c002/8a56e9005cdd495995bb363bf05b3acc~100x100.jpeg?lk3s=08d74b56&x-expires=1710576724&x-signature=GrpJhox6q19DCvwhrl10LsdpSJU%3D',
            'https://p3-sign.douyinpic.com/tos-cn-v-2774c002/8a56e9005cdd495995bb363bf05b3acc~100x100.jpeg?lk3s=08d74b56&x-expires=1710576724&x-signature=QsyVlRL%2FwBED2IYMEcdsYsfvXTY%3D',
          ],
          width: 720,
          height: 720,
        },
        play_url: {
          uri: '',
          url_list: [],
          width: 720,
          height: 720,
          url_key: '6452110567468436238',
        },
        duration: 53,
        user_count: 0,
        owner_nickname: '',
        is_original: false,
      },
      video: {
        play_addr: {
          uri: 'v0200f2c0000bj63fuv3cp5a1sbmujc0',
          url_list: [
            'https://www.douyin.com/aweme/v1/play/?video_id=v0200f2c0000bj63fuv3cp5a1sbmujc0&line=0&file_id=fad24ab3e1ab4efa90440244d5268bd9&sign=f33a08757b00e73f6a75ab6a3c5d751b&is_play_url=1&source=PackSourceEnum_PUBLISH',
          ],
          width: 720,
          height: 1280,
          url_key: 'v0200f2c0000bj63fuv3cp5a1sbmujc0_h264_720p_1631395',
          data_size: 1578648,
          file_hash: 'f33a08757b00e73f6a75ab6a3c5d751b',
        },
        cover: {
          uri: '2071800047c9d7f961529',
          url_list: ['_T0vQPZKXrNC6ulECmMes.png'],
          width: 720,
          height: 720,
        },
        poster: 'out6.jpg',
        height: 1280,
        width: 720,
        ratio: '720p',
        use_static_cover: false,
        duration: 7133,
      },
      share_url:
        'https://www.iesdouyin.com/share/video/6686589698707590411/?region=CN&mid=6452110567468436238&u_code=13kgm680k&did=MS4wLjABAAAAiOgYyZm8XbWZMr5o3OvhR-TEOuNygb_hQOwkie-VXJpDYaR4vZfpiIGBfAWKCFHB&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title&share_sign=DGkn.ltdNm4E6JhEBtbWsuF.YDISGBPo3egx6J8W_c4-&share_version=170400&ts=1710490324&from_aid=6383&from_ssr=1',
      statistics: {
        admire_count: 0,
        comment_count: 19109,
        digg_count: 865701,
        collect_count: 11578,
        play_count: 0,
        share_count: 44504,
      },
      status: {
        listen_video_status: 0,
        is_delete: false,
        allow_share: true,
        is_prohibited: false,
        in_reviewing: false,
        part_see: 0,
        private_status: 0,
        review_result: {
          review_status: 0,
        },
      },
      text_extra: [],
      is_top: 1,
      share_info: {
        share_url:
          'https://www.iesdouyin.com/share/video/6686589698707590411/?region=CN&mid=6452110567468436238&u_code=13kgm680k&did=MS4wLjABAAAAiOgYyZm8XbWZMr5o3OvhR-TEOuNygb_hQOwkie-VXJpDYaR4vZfpiIGBfAWKCFHB&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&titleType=title&share_sign=DGkn.ltdNm4E6JhEBtbWsuF.YDISGBPo3egx6J8W_c4-&share_version=170400&ts=1710490324&from_aid=6383&from_ssr=1',
        share_link_desc:
          '6.46 mQX:/ S@y.go 05/04 门有点矮哟～  %s 复制此链接，打开Dou音搜索，直接观看视频！',
      },
      duration: 7133,
      image_infos: null,
      risk_infos: {
        vote: false,
        warn: false,
        risk_sink: false,
        type: 0,
        content: '',
      },
      position: null,
      author_user_id: 62839305427,
      prevent_download: false,
      long_video: null,
      aweme_control: {
        can_forward: true,
        can_share: true,
        can_comment: true,
        can_show_comment: true,
      },
      images: null,
      suggest_words: {
        suggest_words: [
          {
            words: [
              {
                word: '周子然大学照片',
                word_id: '7057133965329896717',
                info: '{"qrec_for_search":"{}"}',
              },
            ],
            scene: 'comment_top_rec',
            icon_url: '',
            hint_text: '大家都在搜：',
            extra_info: '{}',
          },
          {
            words: [
              {
                word: '周子然',
                word_id: '6595806713759175939',
                info: '{"qrec_for_search":"{}"}',
              },
            ],
            scene: 'detail_inbox_rex',
            icon_url: '',
            hint_text: '',
            extra_info: '{}',
          },
        ],
      },
      author: {
        avatar_168x168: {
          height: 720,
          uri: 'aweme-avatar/tos-cn-avt-0015_f59bfced5c6a3b56d152f1e0437f06ec',
          url_list: [
            'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f59bfced5c6a3b56d152f1e0437f06ec~c5_168x168.jpeg?from=2956013662',
          ],
          width: 720,
        },
        avatar_300x300: {
          height: 720,
          uri: 'aweme-avatar/tos-cn-avt-0015_f59bfced5c6a3b56d152f1e0437f06ec',
          url_list: [
            'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_f59bfced5c6a3b56d152f1e0437f06ec~c5_300x300.jpeg?from=2956013662',
          ],
          width: 720,
        },
        aweme_count: 286,
        birthday_hide_level: 0,
        can_show_group_card: 1,
        city: '',
        commerce_info: {
          challenge_list: null,
          head_image_list: null,
          offline_info_list: [],
          smart_phone_list: null,
          task_list: null,
        },
        commerce_user_info: {
          ad_revenue_rits: null,
          has_ads_entry: true,
          show_star_atlas_cooperation: true,
          star_atlas: 1,
        },
        commerce_user_level: 0,
        country: '',
        cover_colour: '#03997706',
        cover_url: [
          {
            uri: 'douyin-user-image-file/f0e0fa1c47be6c2eedb3bbc077b2e89b',
            url_list: ['eTzFhGSTt3FN9Wu_SwYfJ.png'],
          },
          {
            uri: 'c8510002be9a3a61aad2',
            url_list: ['ycPju2wLo8QdUH3BhOHfP.png'],
          },
        ],
        district: '',
        favoriting_count: 0,
        follow_status: 0,
        follower_count: 3901177,
        follower_request_status: 0,
        follower_status: 0,
        following_count: 80,
        forward_count: 5,
        gender: 2,
        ip_location: 'IP属地：湖北',
        max_follower_count: 4354709,
        mplatform_followers_count: 3917646,
        nickname: '周子然JingYi',
        province: '',
        public_collects_count: 0,
        share_info: {
          bool_persist: 1,
          share_desc: '长按复制此条消息，打开抖音搜索，查看TA的更多作品。',
          share_image_url: {
            uri: 'tos-cn-p-0015/oMYiIAfY7PDPW4RWABzAIB6KeiygIB7AVxhctZ',
            url_list: ['yynTGOW4ukH0o6ivqStEd.png'],
          },
          share_qrcode_url: {
            uri: '3306001c73315193d5b5',
            url_list: [
              'https://p6.douyinpic.com/obj/3306001c73315193d5b5',
              'https://p3.douyinpic.com/obj/3306001c73315193d5b5',
              'https://p26.douyinpic.com/obj/3306001c73315193d5b5',
            ],
          },
          share_title: '快来加入抖音，让你发现最有趣的我！',
          share_url:
            'www.iesdouyin.com/share/user/MS4wLjABAAAAkXwrvzDNOUr-BnujrX712FgL4PY8kNKNpGYYAUjA0us?did=MS4wLjABAAAAiOgYyZm8XbWZMr5o3OvhR-TEOuNygb_hQOwkie-VXJpDYaR4vZfpiIGBfAWKCFHB&iid=MS4wLjABAAAANwkJuWIRFOzg5uCpDRpMj4OX-QryoDgn-yYlXQnRwQQ&with_sec_did=1&sec_uid=MS4wLjABAAAAkXwrvzDNOUr-BnujrX712FgL4PY8kNKNpGYYAUjA0us&from_ssr=1&from_aid=6383&u_code=13kgm680k',
          share_weibo_desc:
            '长按复制此条消息，打开抖音搜索，查看TA的更多作品。',
        },
        short_id: '0',
        signature: '知行合一',
        total_favorited: 39491570,
        uid: '62839305427',
        unique_id: 'jingyiziran',
        user_age: 122,
        white_cover_url: [
          {
            uri: 'douyin-user-image-file/f0e0fa1c47be6c2eedb3bbc077b2e89b',
            url_list: ['3Lbs4vjci4a5PWPjuHqGO.png'],
          },
          {
            uri: '318f1000413827e122102',
            url_list: ['2QCe-HDrBnJc06gcYCeTW.png'],
          },
        ],
      },
      type: 'recommend-video',
    },
  ]);
  const slideListEl = useRef<HTMLDivElement>(null);
  useEffect(() => {
    debugger;
    if (!state.length) {
      return;
    }
    // 清空内容
    slideListEl.current!.innerHTML = '';

    const videoList = state.map(item => {
      return (
        <SlideItem key={item.aweme_id}>
          <BaseVideo
            videoUrl={item?.video.play_addr.url_list[0]}
            avatarUrl={item?.author.avatar_168x168?.url_list[0]}
          />
          ,
        </SlideItem>
      );
    });
    ReactDOM.render(<>{videoList}</>, slideListEl.current);
  }, []);
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
                    <div className="indicator"></div>
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
                <div className="slide slide-infinite">
                  <div
                    ref={slideListEl}
                    className="slide-list flex-direction-column"
                  ></div>
                </div>
              </SlideHorizontal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Index;
