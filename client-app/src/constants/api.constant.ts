import ApplicationSetting from '../constants/application.constant'
import { ActivityPagingParams } from '../types/activity.type';
import { generateQueryStringFromObj } from '../utils/browser.util';
import { isStrNotNullOrUndefined } from '../utils/string.util';

export const baseAPIURL = `${ApplicationSetting.apiUrl}/api`;

export const ApiConstants = {
  account: {
    root: `${baseAPIURL}/account`,
    login() {
      return `${this.root}/login`
    }
  },
  files: {
    root: `${baseAPIURL}/files`,
    loadAvatar(img: string | undefined | null) {
      if (!isStrNotNullOrUndefined(img)) return '';
      return `${this.root}?path=user/avatars/${img}`
    }
  },
  activities: {
    root: `${baseAPIURL}/activities`,
    getPaging(params: ActivityPagingParams) {
      const query = generateQueryStringFromObj(params);
      return `${this.root}/paging?${query}`;
    }
  }
}