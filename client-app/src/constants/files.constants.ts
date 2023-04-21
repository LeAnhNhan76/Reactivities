import { baseAPIURL } from "./url.constants";

export const avatarFolder = 'user/avatars';

export const urlAvatar = `${baseAPIURL}/files?path=${avatarFolder}`;

export const getAvatarUrl = (avatar: string | undefined) => {
    return `${urlAvatar}/${avatar}`;
}