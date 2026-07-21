import { Head } from '@inertiajs/react';
import UserForm from '@/components/room-flow/user/user-form';
import { create } from '@/routes/users';

export default function Create() {
    return (
        <>
            <Head title="Create User" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <UserForm />
            </div>
        </>
    );
}

Create.layout = {
    breadcrumbs: [
        {
            title: 'Users',
            href: '/admin/users',
        },
        {
            title: 'Create',
            href: create().url,
        },
    ],
};
