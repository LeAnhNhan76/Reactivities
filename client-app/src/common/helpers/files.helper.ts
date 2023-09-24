import DefaultAvatar from '../../assets/images/defaultAvatar.jpg';
import { ApiConstants } from '../../constants/api.constant';
import { isStrNotNullOrUndefined } from '../../utils/string.util';

const loadAvatar = (img: string | undefined | null) => {
    if (!isStrNotNullOrUndefined(img)) return DefaultAvatar;

    return ApiConstants.files.loadAvatar(img);
}

export {
    loadAvatar
}