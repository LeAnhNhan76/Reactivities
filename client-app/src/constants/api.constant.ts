import ApplicationSetting from '../constants/application.constant'

export const baseAPIURL = `${ApplicationSetting.apiUrl}/api`;

export const ApiConstants = {
  account: {
    root: `${baseAPIURL}/account`,
    login() {
      return `${this.root}/login`
    }
  }
}