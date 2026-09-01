import { Head } from '@inertiajs/react';
import RoomRateForm from '@/components/room-flow/room-rates/room-rate-form';
import { index } from '@/routes/rates';
import { index as roomsIndex } from '@/routes/rooms';
import type { RoomRate } from '@/types/room-flow/room-rate';

type Props = {
    roomRate: RoomRate;
};

export default function Edit({ roomRate }: Props) {
    return (
        <>
            <Head title="Edit Room Rate" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <RoomRateForm roomRate={roomRate} />
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
            title: 'Rates',
            href: index().url,
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
