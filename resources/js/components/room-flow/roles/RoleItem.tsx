import { Link } from '@inertiajs/react';
import type { Role } from '@/types/room-flow/role';

type Props = {
    role: Role;
};

export default function RoleItem({ role }: Props) {
    return (
        <div className="flex items-center justify-between rounded-lg border bg-card p-4 transition-colors hover:bg-accent/40">
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium">{role.name}</h3>
                </div>
            </div>

            <Link
                href={role.edit_url}
                className="rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-accent"
            >
                Edit
            </Link>
        </div>
    );
}
