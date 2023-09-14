import { Image, SemanticSIZES } from "semantic-ui-react";

export interface ILogoProps {
    size?: SemanticSIZES | undefined;
    className?: string;
}

export const Logo = (props: ILogoProps) => {
    return <Image 
        src={'/assets/logo.png'}
        alt={'logo'}
        size={props.size}
        className={props.className}
    ></Image>
};