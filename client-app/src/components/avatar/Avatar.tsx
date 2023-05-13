import { Image } from 'semantic-ui-react';
import './index.scss';

export interface IAvatarProps {
  src?: string| undefined;
  size?: string | undefined;
  style?: React.CSSProperties | undefined;
}

export const AvatarSizes = {
  MINI: 'MINI',
  TINY: 'TINY',
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
}

export const AvartarWidthBySize = new Map<string, string> ([
  [AvatarSizes.MINI, '50px'],
  [AvatarSizes.SMALL, '70px'],
  [AvatarSizes.MEDIUM, '110px'],
  [AvatarSizes.LARGE, '130px'],
]);

const Avatar = (props: IAvatarProps) => {
  const {src, size: sizeProp, style: styleProp} = props;

  const length = AvartarWidthBySize.get(sizeProp??AvatarSizes.SMALL);
  const style = styleProp??{};

  return (
    <Image src={src} 
      style={{
        width: length,
        height: length,
        ...style
      }} 
    className='avatar'></Image>
  )
}

export default Avatar