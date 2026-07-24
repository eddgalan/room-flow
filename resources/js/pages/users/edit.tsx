import { Head } from '@inertiajs/react';
import UserForm from '@/components/room-flow/user/user-form';
import { index } from '@/routes/users';
import type { Role } from '@/types/room-flow/role';
import type { UserForm as UserFormType } from '@/types/room-flow/user';

type Props = {
    user: UserFormType;
    roles: Role[];
};

export default function Edit({ user, roles }: Props) {
    return (
        <>
            <Head title="Edit User" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm user={user} roles={roles} />
            </div>
        </>
    );
}

Edit.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: index().url,
        },
        {
            title: 'Edit',
            href: '',
        },
    ],
};
