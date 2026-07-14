import { router } from '@inertiajs/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { destroy } from '@/routes/settings/roles';
import type { Role } from '@/types/room-flow/role';

type Props = {
    role?: Role;
    isAdministrator: boolean;
};

export default function RoleDeleteButton({ role, isAdministrator }: Props) {
    const [isDeleting, setIsDeleting] = useState(false);
    const handleDelete = () => {
        if (!role) {
            return;
        }

        setIsDeleting(true);

        router.delete(destroy.url(role.id), {
            preserveScroll: true,
            onError: () => setIsDeleting(false),
        });
    };

    return role && (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="destructive"
                    disabled={isAdministrator}
                >
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Delete role</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete the "{role.name}" role? This
                    action cannot be undone.
                </DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete role'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
