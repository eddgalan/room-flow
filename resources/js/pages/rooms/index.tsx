import { Head } from '@inertiajs/react';
import ActionsBar from '@/components/room-flow/ui/actions-bar';
import RedirectButton from '@/components/room-flow/ui/redirect-button';
import { useCan } from '@/hooks/use-can';
import { index as index_rates } from '@/routes/rates';
import { index } from '@/routes/rooms';
import { index as index_types } from '@/routes/types';

export default function Index() {
    const { can } = useCan();

    return (
        <>
            <Head title="Rooms" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <ActionsBar>
                    {can('rooms.types.index') && (
                        <RedirectButton
                            text="Room Types"
                            redirectTo={index_types}
                        />
                    )}
                    {can('rooms.rates.index') && (
                        <RedirectButton
                            text="Room Rates"
                            redirectTo={index_rates}
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
    ],
};
