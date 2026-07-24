import { Head } from '@inertiajs/react';
import UserForm from '@/components/room-flow/user/user-form';
import { index, create } from '@/routes/users';
import type {Role} from '@/types/room-flow/role';

type Props = {
    roles: Role[];
}

export default function Create({ roles }: Props) {
    return (
        <>
            <Head title="Create User" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm roles={roles} />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: index().url,
        },
        {
            title: 'Create',
            href: create().url,
        },
    ],
};
