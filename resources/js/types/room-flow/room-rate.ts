export interface RoomRate {
    id: number;
    name: string;
    description: string;
    duration: number;
    duration_unit: number;
    enabled: boolean;
    allow_multiple: boolean;
    uses_checkin_schedule: boolean;
    created_at: string;
    updated_at: string;
}
