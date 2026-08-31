import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import CreateButton from '@/components/room-flow/ui/create-button';
import DataTable from '@/components/room-flow/ui/data-table';
import type { Actions } from '@/components/room-flow/ui/data-table/types/data-table';
import { useCan } from '@/hooks/use-can';
import { index as roomsIndex } from '@/routes/rooms';
import { list, toggleEnabled } from '@/routes/rooms/types';
import { index, create, edit } from '@/routes/types';

type RoomTypeRow = {
    id: number;
    name: string;
    description: string;
    capacity: number;
    enabled: boolean;
    created_at: string;
    updated_at: string;
};

const headers: Array<keyof RoomTypeRow> = [
    'id',
    'name',
    'description',
    'capacity',
    'enabled',
    'created_at',
    'updated_at',
];

const actions: Actions<RoomTypeRow> = [
    {
        action: 'Edit',
        actionPath: (type) => edit(type.id),
    },
    {
        action: (type) => (type.enabled ? 'Disable' : 'Enable'),
        actionPath: (type) => toggleEnabled(type.id),
    },
];

export default function Index() {
    const { can } = useCan();

    return (
        <>
            <Head title="Room Types" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    {can('rooms.types.create') && (
                        <CreateButton
                            text="Create Room Type"
                            createRoute={create}
                        />
                    )}
                </ActionsBar>
                <DataTable<RoomTypeRow>
                    endpoint={list.url()}
                    headers={headers}
                    caption="Room Types list"
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
            title: 'Room Types',
            href: index().url,
        },
    ],
};
