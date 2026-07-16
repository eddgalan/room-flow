import type { PropsWithChildren} from 'react';

export default function ActionsBar({ children }: PropsWithChildren) {

    return (
        <div className="flex w-full items-center justify-end gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm">
            {children}
        </div>
    );
}
