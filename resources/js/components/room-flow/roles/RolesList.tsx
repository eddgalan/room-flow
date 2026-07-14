import RoleItem from '@/components/room-flow/roles/RoleItem';
import RolesToolbar from '@/components/room-flow/roles/RolesToolbar';
import type { RoleListItem } from '@/types/room-flow/role';

type Props = {
    roles: RoleListItem[];
};

export default function RolesList({ roles }: Props) {
    return (
        <>
            <RolesToolbar />

            {roles.length === 0 ? (
                <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
                    No roles found.
                </div>
            ) : (
                <div className="space-y-3">
                    {roles.map((role) => (
                        <RoleItem key={role.id} role={role} />
                    ))}
                </div>
            )}
        </>
    );
}
