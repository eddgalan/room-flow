import type { HTMLAttributes } from 'react';
import roomFlowDarkLogo from '../../images/RoomFlow-Dark.png';
import roomFlowLightLogo from '../../images/RoomFlow-Light.png';

export default function AppLogoIcon({
    className,
    ...props
}: HTMLAttributes<HTMLElement>) {
    return (
        <picture {...props} className={className}>
            <source
                srcSet={roomFlowDarkLogo}
                media="(prefers-color-scheme: dark)"
            />
            <img
                src={roomFlowLightLogo}
                alt="Room Flow"
                className="h-full w-full object-contain"
            />
        </picture>
    );
}
