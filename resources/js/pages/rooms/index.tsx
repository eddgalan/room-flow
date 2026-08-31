import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import RedirectButton from '@/components/room-flow/ui/redirect-button';
import { useCan } from '@/hooks/use-can';
import { index as roomsIndex } from '@/routes/rooms';
import { index } from '@/routes/types';

export default function Index() {
    const { can } = useCan();

    return (
        <>
            <Head title="Rooms" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    {can('rooms.types.index') && (
                        <RedirectButton text="Room Types" redirectTo={index} />
                    )}
                </ActionsBar>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Rooms',
            href: roomsIndex().url,
        },
    ],
};
