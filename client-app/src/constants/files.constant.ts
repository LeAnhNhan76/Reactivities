export const avatarFolder = 'user/avatars';

export const urlAvatar = `${''}/files?path=${avatarFolder}`;

export const getAvatarUrl = (avatar: string | undefined) => {
    return `${urlAvatar}/${avatar}`;
}