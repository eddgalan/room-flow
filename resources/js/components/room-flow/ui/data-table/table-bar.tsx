import type { PropsWithChildren } from 'react';

export default function TableBar({ children }: PropsWithChildren) {
    return <div className="flex w-full items-center gap-2 p-4">{children}</div>;
}
