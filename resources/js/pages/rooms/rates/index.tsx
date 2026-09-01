import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import CreateButton from '@/components/room-flow/ui/create-button';
import { useCan } from '@/hooks/use-can';
import { index as index_rates } from '@/routes/rates'
import { create } from '@/routes/rates';
import { index } from '@/routes/rooms';

export default function Index() {
    const { can } = useCan();

    return (
        <>
            <Head title="Room Rates" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    {can('rooms.rates.create') && (
                        <CreateButton
                            text="Create Room Rate"
                            createRoute={create}
                        />
                    )}
                </ActionsBar>
            </div>
        </>
    );
}

Index.layout = {
    breadcrumbs: [
        {
            title: 'Rooms',
            href: index().url,
        },
        {
            title: 'Rates',
            href: index_rates().url,
        },
    ],
};
