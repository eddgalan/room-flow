import { Head } from '@inertiajs/react';
import RoomRateForm from '@/components/room-flow/room-rates/room-rate-form';
import { index, create } from '@/routes/rates';
import { index as roomsIndex } from '@/routes/rooms';

type Props = {
    durationUnits: string[];
};

export default function Index({ durationUnits }: Props) {
    return (
        <>
            <Head title="Create Room Rate" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <RoomRateForm durationUnits={durationUnits} />
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
            title: 'Rates',
            href: index().url,
        },
        {
            title: 'Create',
            href: create().url,
        },
    ],
};
