import type { Resource } from '@/types/room-flow/resource';

export interface Role {
    id: number;
    name: string;
    resources?: Resource[];
}
