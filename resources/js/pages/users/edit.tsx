import { Head } from '@inertiajs/react';
import UserForm from '@/components/room-flow/user/user-form';
import { index } from '@/routes/users';
import type { User } from '@/types/room-flow/user';

type Props = {
    user: User;
};

export default function Edit({ user }: Props) {
    return (
        <>
            <Head title="Edit User" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm user={user} />
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
