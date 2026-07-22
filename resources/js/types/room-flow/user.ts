export interface User {
    id: number;
    name: string;
    lastname: string;
    username: string;
    enabled: boolean;
    email: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
}

export interface UserForm extends User {
    role_id: number | null;
    role_name: string | null;
}
