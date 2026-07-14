import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import ResourcesTable from '@/components/room-flow/resources/ResourcesTable';
import RoleDeleteButton from '@/components/room-flow/roles/RoleDeleteButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { index as roles_index } from '@/routes/settings/roles';
import { store, update } from '@/routes/settings/roles';
import type { Resource } from '@/types/room-flow/resource';
import type { Role } from '@/types/room-flow/role';

type Props = {
    role?: Role;
    resources?: Resource[];
};

export default function RoleForm({ resources, role }: Props) {
    const form = role ? update.form(role.id) : store.form();
    const isAdministrator = role?.name === 'administrator';

    return (
        <Form {...form}>
            {({ errors, processing }) => (
                <>
                    <div className="grid gap-2 border-b py-4">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            required
                            autoFocus
                            autoComplete="off"
                            defaultValue={role?.name}
                            tabIndex={1}
                            disabled={isAdministrator}
                        />

                        <InputError message={errors.name} />
                    </div>

                    {role && (
                        <div className="grid gap-2 border-b py-4">
                            <h3>Resource list</h3>
                            <p>List of permissions assigned to the role.</p>
                            <ResourcesTable resources={resources} role={role} />
                        </div>
                    )}

                    <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
                        <Link
                            href={roles_index()}
                            className="rounded-md bg-transparent px-4 py-2 text-white hover:bg-cyan-800 hover:text-white"
                        >
                            Cancel
                        </Link>
                        {role && (
                            <RoleDeleteButton isAdministrator={isAdministrator} role={role} />
                        )}
                        <Button
                            type="submit"
                            className="rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-cyan-800 hover:text-white"
                            tabIndex={4}
                            disabled={processing || isAdministrator}
                        >
                            {processing && <Spinner />}
                            Save
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
