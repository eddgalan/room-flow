import { Form, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store, update, index } from '@/routes/users';
import type { User } from '@/types/room-flow/user'

type Props = {
    user?: User;
};

export default function UserForm({ user }: Props) {
    const form = user ? update.form(user.id) : store.form();

    return (
        <Form {...form}>
            {({ errors, processing }) => (
                <>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b pb-2 sm:grid-cols-6">
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                required
                                autoFocus
                                autoComplete="off"
                                defaultValue=""
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
                                defaultValue=""
                                tabIndex={102}
                            />
                            <InputError message={errors.lastname} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="user">Username</Label>
                            <Input
                                id="user"
                                type="text"
                                name="user"
                                required
                                autoComplete="off"
                                defaultValue=""
                                tabIndex={103}
                            />
                            <InputError message={errors.user} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="text"
                                name="email"
                                required
                                autoComplete="off"
                                defaultValue=""
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
                                defaultValue=""
                                tabIndex={105}
                            />
                            <InputError message={errors.phone_number} />
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b pb-2 sm:grid-cols-6">
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                tabIndex={106}
                            />
                            <InputError message={errors.password} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="password_confirm">
                                Password Confirmation
                            </Label>
                            <Input
                                id="password_confirm"
                                type="password"
                                name="password_confirm"
                                required
                                tabIndex={107}
                            />
                            <InputError message={errors.password_confirm} />
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
