import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { index as roles_index } from '@/routes/settings/roles';
import { store } from '@/routes/settings/roles';

export default function RoleForm() {
    return (
        <Form {...store.form()}>
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
                            tabIndex={1}
                        />

                        <InputError message={errors.name} />
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6 px-4">
                        <Link
                            href={roles_index()}
                            className="rounded-md bg-transparent px-4 py-2 text-white hover:bg-red-800"
                        >
                            Cancel
                        </Link>
                        <Button
                            type="submit"
                            className="rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-cyan-800 hover:text-white"
                            tabIndex={4}
                            disabled={processing}
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
