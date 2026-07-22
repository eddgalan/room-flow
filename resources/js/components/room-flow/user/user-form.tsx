import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
} from '@/components/ui/combobox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { index, store, update } from '@/routes/users';
import type { Role } from '@/types/room-flow/role';
import type { UserForm } from '@/types/room-flow/user';

type RoleOption = {
    value: string;
    label: string;
};

type Props = {
    user?: UserForm;
    roles?: Role[];
};

export default function UserForm({ user, roles }: Props) {
    const form = user ? update.form(user.id) : store.form();
    const isEditing = Boolean(user);
    const [isActive, setIsActive] = useState(Boolean(user?.enabled));
    const roleOptions =
        roles?.map((role) => ({
            value: String(role.id),
            label: role.name,
        })) ?? [];
    const [selectedRole, setSelectedRole] = useState<RoleOption | null>(
        roleOptions.find((role) => role.value === String(user?.role_id)) ??
            null,
    );

    return (
        <Form {...form}>
            {({ errors, processing }) => (
                <>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b pb-2 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <h1>User information</h1>
                        </div>
                        {isEditing && (
                            <div className="flex gap-2 py-2 sm:col-span-6">
                                <input
                                    type="hidden"
                                    name="enabled"
                                    value={isActive ? '1' : '0'}
                                />
                                <Checkbox
                                    id="enabled"
                                    checked={isActive}
                                    onCheckedChange={(checked) =>
                                        setIsActive(checked === true)
                                    }
                                />
                                <Label htmlFor="enabled">Active</Label>
                            </div>
                        )}
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                autoComplete="off"
                                defaultValue={user?.name ?? ''}
                                tabIndex={101}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="lastname">Last Name</Label>
                            <Input
                                id="lastname"
                                type="text"
                                name="lastname"
                                required
                                autoComplete="off"
                                defaultValue={user?.lastname ?? ''}
                                tabIndex={102}
                            />
                            <InputError message={errors.lastname} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                name="username"
                                required
                                autoComplete="off"
                                defaultValue={user?.username ?? ''}
                                tabIndex={103}
                            />
                            <InputError message={errors.username} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="role">Role</Label>
                            <input
                                type="hidden"
                                name="role_id"
                                value={selectedRole?.value ?? ''}
                            />
                            <Combobox
                                items={roleOptions}
                                value={selectedRole}
                                onValueChange={setSelectedRole}
                            >
                                <ComboboxInput placeholder="Select a user role" />
                                <ComboboxContent>
                                    <ComboboxEmpty>
                                        No items found.
                                    </ComboboxEmpty>
                                    <ComboboxList>
                                        {(item) => (
                                            <ComboboxItem
                                                key={item.value}
                                                value={item}
                                            >
                                                {item.label}
                                            </ComboboxItem>
                                        )}
                                    </ComboboxList>
                                </ComboboxContent>
                            </Combobox>
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                required
                                autoComplete="off"
                                defaultValue={user?.email ?? ''}
                                tabIndex={104}
                            />
                            <InputError message={errors.email} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="phone_number">Phone Number</Label>
                            <Input
                                id="phone_number"
                                type="text"
                                name="phone_number"
                                required
                                autoComplete="off"
                                defaultValue={user?.phone_number ?? ''}
                                tabIndex={105}
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b pb-2 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            {user ? (
                                <h1>Change password</h1>
                            ) : (
                                <h1>Password</h1>
                            )}
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            {isEditing ? (
                                <Label htmlFor="password">New Password</Label>
                            ) : (
                                <Label htmlFor="password">Password</Label>
                            )}
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required={!isEditing}
                                tabIndex={106}
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="password_confirmation">
                                Confirm Password
                            </Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required={!isEditing}
                                tabIndex={107}
                            />
                            <InputError
                                message={errors.password_confirmation}
                            />
                        </div>
                    </div>
                    <div className="mt-10 flex items-center justify-end gap-2 sm:grid-cols-6">
                        <Button
                            type="button"
                            className="p-0"
                            variant="outline"
                            tabIndex={109}
                        >
                            <Link
                                href={index()}
                                className="rounded-md bg-transparent px-4 py-2"
                            >
                                Cancel
                            </Link>
                        </Button>
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            variant="default"
                            disabled={processing}
                            tabIndex={108}
                        >
                            {processing && <Spinner />}Save
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
