import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import CreateButton from '@/components/room-flow/ui/create-button';
import DataTable from '@/components/room-flow/ui/data-table';
import type { Actions } from '@/components/room-flow/ui/data-table/types/data-table';
import { create, dataTable, destroy, edit } from '@/routes/users';

type UserRow = {
    id: number;
    name: string;
    lastname: string;
    username: string;
    enabled: boolean;
    email: string;
    phone_number: string | null;
    created_at: string;
    updated_at: string;
};

const actions: Actions<UserRow> = [
    {
        action: 'Edit',
        actionPath: edit,
    },
    {
        action: 'Delete',
        actionPath: destroy,
        variant: 'destructive',
        confirm: true,
        confirmTitle: 'Delete user',
        confirmMessage: (user) =>
            `Are you sure you want to delete ${user.name} ${user.lastname}? This action cannot be undone.`,
        confirmButtonText: 'Delete',
    },
];

const headers: Array<keyof UserRow> = [
    'id',
    'name',
    'lastname',
    'username',
    'enabled',
    'email',
    'phone_number',
    'created_at',
    'updated_at',
];

export default function Index() {
    return (
        <>
            <Head title="Users" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    <CreateButton text="Create user" createRoute={create} />
                </ActionsBar>
                <DataTable<UserRow>
                    endpoint={dataTable.url()}
                    headers={headers}
                    caption="Users list"
                    actions={actions}
                />
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/admin/users',
        },
    ],
};
