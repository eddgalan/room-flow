import { Link } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { create } from '@/routes/settings/roles';

export default function RolesToolbar() {
    return (
        <div className="flex flex-col gap-3 rounded-lg border bg-card p-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-sm">
                <Search
                    aria-hidden="true"
                    className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                />

                <Input
                    type="search"
                    placeholder="Search roles..."
                    aria-label="Search roles"
                    className="pl-9"
                />
            </div>

            <Button asChild className="w-full sm:w-auto">
                <Link href={create()}>
                    <Plus aria-hidden="true" className="size-4" />
                    New role
                </Link>
            </Button>
        </div>
    );
}
