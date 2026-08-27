import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Rooms" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Rooms',
            href: '/admin/rooms',
        },
    ],
};
