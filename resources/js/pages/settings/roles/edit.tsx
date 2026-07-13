import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import RoleForm from '@/components/room-flow/roles/RoleForm';
import { index } from '@/routes/settings/roles';

type Props = {
    role: {
        id: number;
        name: string;
    };
};

export default function Index({ role }: Props) {
    return (
        <>
            <Head title="Edit Role" />

            <h1 className="sr-only">Edit Role</h1>

            <div className="space-y-6">
                <Heading variant="small" title="Edit Role" />

                <RoleForm role={role} />
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
