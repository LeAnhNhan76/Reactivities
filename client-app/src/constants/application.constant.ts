import { environment as dev } from '../environments/environment';
import { environment as beta } from '../environments/environment.beta';
import { environment as prod } from '../environments/environment.prod';
import { EnvironmentSetting } from '../types/app-setting.type';

const configs = {
    dev: dev,
    beta: beta,
    prod: prod
} as any;

const ApplicationSetting: EnvironmentSetting = configs[process?.env?.REACT_APP_STATE || 'dev'];

export default ApplicationSetting;