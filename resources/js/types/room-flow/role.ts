import type { Resource } from '@/types/room-flow/resource';

export interface Role {
    id: number;
    name: string;
    resources?: Resource[];
}

export interface RoleListItem extends Role {
    edit_url: string;
}
