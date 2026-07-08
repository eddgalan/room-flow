import { usePage } from '@inertiajs/react';
import { useMemo } from 'react';
import type { PermissionName } from '@/lib/permissions';

export function useCan() {
    const permissions = usePage().props.auth.permissions;

    const permissionSet = useMemo(() => new Set(permissions), [permissions]);

    return {
        can: (permission: PermissionName) => permissionSet.has(permission),
        canAny: (permissions: PermissionName[]) =>
            permissions.some((permission) => permissionSet.has(permission)),
        canAll: (permissions: PermissionName[]) =>
            permissions.every((permission) => permissionSet.has(permission)),
    };
}
