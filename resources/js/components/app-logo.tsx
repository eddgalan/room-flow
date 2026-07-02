import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md">
                <AppLogoIcon className="size-12" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Room Flow
                </span>
            </div>
        </>
    );
}
