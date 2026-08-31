import { Head } from '@inertiajs/react';
import RoomTypeForm from '@/components/room-flow/roomtypes/room-type-form';
import { index as roomsIndex } from '@/routes/rooms';
import { index } from '@/routes/types';
import type { RoomType } from '@/types/room-flow/room-type';

type Props = {
    roomType: RoomType;
};

export default function Edit({ roomType }: Props) {
    return (
        <>
            <Head title="Edit Room Type" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <RoomTypeForm roomType={roomType} />
            </div>
        </>
    );
}

Edit.layout = {
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
            title: 'Edit',
            href: '',
        },
    ],
};
