import type { Resource } from '@/types/room-flow/resource';

export interface Role {
    id: number;
    name: string;
    guard_name?: string;
    created_at?: string;
    updated_at?: string;
    resources?: Resource[];
}

export interface RoleListItem extends Role {
    edit_url: string;
}
