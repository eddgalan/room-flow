import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { index, store, update } from '@/routes/types';
import type { RoomType } from '@/types/room-flow/room-type';

type Props = {
    roomType?: RoomType;
};

export default function RoomTypeForm({ roomType }: Props) {
    const form = roomType ? update.form(roomType.id) : store.form();
    const isEditing = Boolean(roomType);
    const [isActive, setIsActive] = useState(Boolean(roomType?.enabled));

    return (
        <Form {...form}>
            {({ errors, processing }) => (
                <>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b pb-2 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <h1>Room Type Information</h1>
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
                                defaultValue={roomType?.name ?? ''}
                                placeholder="Example: Single, Double, Suite, etc"
                                maxLength={50}
                                tabIndex={101}
                            />
                            <InputError message={errors.name} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                type="text"
                                name="description"
                                required
                                autoComplete="off"
                                defaultValue={roomType?.description ?? ''}
                                placeholder="Example: Single room with one bedroom"
                                maxLength={250}
                                tabIndex={102}
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-2">
                            <Label htmlFor="capacity">Capacity</Label>
                            <Input
                                id="capacity"
                                type="number"
                                name="capacity"
                                min="1"
                                required
                                autoComplete="off"
                                defaultValue={roomType?.capacity ?? ''}
                                placeholder="Maximum occupancy for this type of room"
                                tabIndex={103}
                            />
                            <InputError message={errors.capacity} />
                        </div>
                    </div>

                    <div className="mt-10 flex items-center justify-end gap-2 sm:grid-cols-6">
                        <Button
                            type="button"
                            className="p-0"
                            variant="outline"
                            tabIndex={121}
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
                            tabIndex={120}
                        >
                            {processing && <Spinner />}Save
                        </Button>
                    </div>
                </>
            )}
        </Form>
    );
}
