import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { index, store, update } from '@/routes/rates';
import type { RoomRate } from '@/types/room-flow/room-rate';

type Props = {
    roomRate?: RoomRate;
};

export default function RoomRateForm({ roomRate }: Props) {
    const form = roomRate ? update.form(roomRate.id) : store.form();
    const isEditing = Boolean(roomRate);
    const [isActive, setIsActive] = useState(Boolean(roomRate?.enabled));
    const [durationUnit, setDurationUnit] = useState(
        String(roomRate?.duration_unit ?? 'hours'),
    );
    const [allowMultiple, setAllowMultiple] = useState(
        Boolean(roomRate?.allow_multiple),
    );
    const [usesCheckinSchedule, setUsesCheckinSchedule] = useState(
        Boolean(roomRate?.uses_checkin_schedule),
    );

    return (
        <Form {...form}>
            {({ errors, processing }) => (
                <>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 border-b pb-2 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <h1>Room Rate Information</h1>
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
                                defaultValue={roomRate?.name ?? ''}
                                placeholder="Example: 3 hours, 6 hours, 1 day (24 hours), 1 night"
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
                                autoComplete="off"
                                defaultValue={roomRate?.description ?? ''}
                                placeholder="(optional)"
                                maxLength={250}
                                tabIndex={102}
                            />
                            <InputError message={errors.description} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-1">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                type="number"
                                name="duration"
                                min="1"
                                required
                                autoComplete="off"
                                defaultValue={roomRate?.duration ?? ''}
                                placeholder="1"
                                tabIndex={103}
                            />
                            <InputError message={errors.duration} />
                        </div>
                        <div className="grid gap-2 py-2 sm:col-span-1">
                            <Label htmlFor="duration_unit">Duration Unit</Label>
                            <Select
                                name="duration_unit"
                                value={durationUnit}
                                onValueChange={setDurationUnit}
                                required
                            >
                                <SelectTrigger
                                    id="duration_unit"
                                    className="w-full"
                                    tabIndex={104}
                                >
                                    <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="minutes">
                                        Minutes
                                    </SelectItem>
                                    <SelectItem value="hours">Hours</SelectItem>
                                    <SelectItem value="days">Days</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.duration_unit} />
                        </div>
                        <div className="flex items-center gap-2 py-2 sm:col-span-3">
                            <input
                                type="hidden"
                                name="allow_multiple"
                                value={allowMultiple ? '1' : '0'}
                            />
                            <Checkbox
                                id="allow_multiple"
                                checked={allowMultiple}
                                onCheckedChange={(checked) =>
                                    setAllowMultiple(checked === true)
                                }
                                tabIndex={105}
                            />
                            <Label htmlFor="allow_multiple">
                                Allow multiple
                            </Label>
                            <InputError message={errors.allow_multiple} />
                        </div>
                        <div className="flex items-center gap-2 py-2 sm:col-span-3">
                            <input
                                type="hidden"
                                name="uses_checkin_schedule"
                                value={usesCheckinSchedule ? '1' : '0'}
                            />
                            <Checkbox
                                id="uses_checkin_schedule"
                                checked={usesCheckinSchedule}
                                onCheckedChange={(checked) =>
                                    setUsesCheckinSchedule(checked === true)
                                }
                                tabIndex={106}
                            />
                            <Label htmlFor="uses_checkin_schedule">
                                Uses check-in schedule
                            </Label>
                            <InputError
                                message={errors.uses_checkin_schedule}
                            />
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
