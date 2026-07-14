import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import RoleForm from '@/components/room-flow/roles/RoleForm';
import { index } from '@/routes/settings/roles';
import type { Resource } from '@/types/room-flow/resource';

type Props = {
    role: {
        id: number;
        name: string;
        resources?: Resource[];
    };
    resources: Resource[];
};

export default function Index({ resources, role }: Props) {
    return (
        <>
            <Head title="Edit Role" />

            <h1 className="sr-only">Edit Role</h1>

            <div className="space-y-6">
                <Heading variant="small" title="Edit Role" />

                <RoleForm resources={resources} role={role} />
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
