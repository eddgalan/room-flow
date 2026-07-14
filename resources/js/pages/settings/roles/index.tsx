import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import RolesList from '@/components/room-flow/roles/RolesList';
import { index } from '@/routes/settings/roles';
import type { RoleListItem } from '@/types/room-flow/role';

type Props = {
    roles: RoleListItem[];
};

export default function Index({ roles }: Props) {
    return (
        <>
            <Head title="Roles settings" />

            <h1 className="sr-only">Roles</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Roles"
                    description="Manage roles and their permissions"
                />

                <RolesList roles={roles} />
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
