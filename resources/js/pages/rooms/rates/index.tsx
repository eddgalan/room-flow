import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import CreateButton from '@/components/room-flow/ui/create-button';
import DataTable from '@/components/room-flow/ui/data-table';
import type { Actions } from '@/components/room-flow/ui/data-table/types/data-table';
import { useCan } from '@/hooks/use-can';
import { create, edit, index } from '@/routes/rates';
import { index as roomsIndex } from '@/routes/rooms';
import { list, toggleEnabled } from '@/routes/rooms/rates';

type RoomRateRow = {
    id: number;
    name: string;
    description: string;
    duration: number;
    duration_unit: string;
    enabled: boolean;
    allow_multiple: boolean;
    uses_checkin_schedule: boolean;
    created_at: string;
    updated_at: string;
};

const headers: Array<keyof RoomRateRow> = [
    'id',
    'name',
    'description',
    'duration',
    'duration_unit',
    'enabled',
    'allow_multiple',
    'uses_checkin_schedule',
    'created_at',
    'updated_at',
];

export default function Index() {
    const { can } = useCan();
    const actions: Actions<RoomRateRow> = [];

    if (can('rooms.rates.edit')) {
        actions.push({
            action: 'Edit',
            actionPath: (rate) => edit(rate.id),
        });
    }

    if (can('rooms.rates.enabled')) {
        actions.push({
            action: (rate) => (rate.enabled ? 'Disable' : 'Enable'),
            actionPath: (rate) => toggleEnabled(rate.id),
        });
    }

    return (
        <>
            <Head title="Room Rates" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    {can('rooms.rates.create') && (
                        <CreateButton
                            text="Create Room Rate"
                            createRoute={create}
                        />
                    )}
                </ActionsBar>
                <DataTable<RoomRateRow>
                    endpoint={list.url()}
                    headers={headers}
                    caption="Room Rates list"
                    actions={actions}
                />
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
    ],
};
