import { Head } from '@inertiajs/react';
import RoomTypeForm from '@/components/room-flow/roomtypes/room-type-form';
import { index as roomsIndex } from '@/routes/rooms';
import { index, create } from '@/routes/types';

export default function Index() {
    return (
        <>
            <Head title="Create Room Type" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <RoomTypeForm />
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
        {
            title: 'Create',
            href: create().url,
        },
    ],
};
