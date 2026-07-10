import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { edit } from '@/routes/roles';

export default function Roles() {
    return (
        <>
            <Head title="Roles settings" />

            <h1 className="sr-only">Roles settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Roles"
                    description="Manage roles and their permissions"
                />
            </div>
        </>
    );
}

Roles.layout = {
    breadcrumbs: [
        {
            title: 'Roles settings',
            href: edit(),
        },
    ],
};
