import { Head } from '@inertiajs/react';
import Heading from '@/components/heading';
import { index } from '@/routes/settings/roles';

export default function Index() {
    return (
        <>
            <Head title="Index settings" />

            <h1 className="sr-only">Index settings</h1>

            <div className="space-y-6">
                <Heading
                    variant="small"
                    title="Index"
                    description="Manage roles and their permissions"
                />
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
