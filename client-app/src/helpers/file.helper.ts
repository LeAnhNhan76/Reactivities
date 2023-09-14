import DefaultAvatar from '../assets/images/defaultAvatar.jpg';
import { baseAPIURL } from '../constants/api.constant';

export const getAvatar = (path: string | undefined | null) => {
    if (path === null || path === undefined || path === '') return DefaultAvatar;

    return `${baseAPIURL}/files?path=user/avatars/${path}`;
}