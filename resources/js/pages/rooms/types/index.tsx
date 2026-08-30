import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import CreateButton from '@/components/room-flow/ui/create-button';
import { index as roomsIndex } from '@/routes/rooms';
import { index, create } from '@/routes/types';

export default function Index() {
    return (
        <>
            <Head title="Room Types" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    <CreateButton text="Create Room Type" createRoute={create} />
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
        {
            title: 'Room Types',
            href: index().url,
        },
    ],
};
