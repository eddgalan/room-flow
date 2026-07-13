import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import RoleForm from '@/components/room-flow/roles/RoleForm';
import { index } from '@/routes/settings/roles';

export default function Index() {
    return (
        <>
            <Head title="Create a Role" />

            <h1 className="sr-only">Create Role</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Create a Role"
                />

                <RoleForm />

            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Roles settings',
            href: index(),
        },
    ],
};
