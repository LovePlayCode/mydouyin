import { request } from '@/utils/request';

export function videoComments(params?: any, data?: any) {
  return request({ url: '/video/comments', method: 'get', params, data });
}
