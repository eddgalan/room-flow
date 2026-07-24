import { Link, router } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import type { Actions } from '@/components/room-flow/ui/data-table/types/data-table';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Props<T extends Record<string, unknown>> = {
    headers: Array<keyof T & string>;
    data: T[];
    caption?: string;
    actions?: Actions<T>;
    isLoading?: boolean;
};

type ResolvedAction<T extends Record<string, unknown>> = {
    action: Actions<T>[number];
    href: string;
    method: 'get' | 'post' | 'put' | 'patch' | 'delete';
    row: T;
};

function renderCellValue(value: unknown): ReactNode {
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return value;
    }

    return '-';
}

function resolveActionPath<T extends Record<string, unknown>>(
    action: Actions<T>[number],
    row: T,
) {
    const path = action.actionPath(row);

    if (typeof path === 'string') {
        return {
            href: path,
            method: 'get' as const,
        };
    }

    return {
        href: path.url,
        method: path.method,
    };
}

export default function TableContent<T extends Record<string, unknown>>({
    headers,
    data,
    caption,
    actions,
    isLoading = false,
}: Props<T>) {
    const hasActions = Boolean(actions?.length);
    const columnCount = headers.length + (hasActions ? 1 : 0);
    const [pendingAction, setPendingAction] =
        useState<ResolvedAction<T> | null>(null);

    const confirmMessage =
        typeof pendingAction?.action.confirmMessage === 'function'
            ? pendingAction.action.confirmMessage(pendingAction.row)
            : pendingAction?.action.confirmMessage;

    const handleConfirmAction = () => {
        if (!pendingAction) {
            return;
        }

        router.visit(pendingAction.href, {
            method: pendingAction.method,
            preserveScroll: true,
            onFinish: () => setPendingAction(null),
        });
    };

    return (
        <>
            <Table>
                {caption && <TableCaption>{caption}</TableCaption>}

                <TableHeader>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableHead
                                key={header}
                                className={index === 0 ? 'w-25' : undefined}
                            >
                                {header}
                            </TableHead>
                        ))}
                        {hasActions && (
                            <TableHead className="w-12 text-right">
                                Actions
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columnCount}
                                className="h-24 text-center"
                            >
                                Loading records...
                            </TableCell>
                        </TableRow>
                    ) : data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={columnCount}
                                className="h-24 text-center"
                            >
                                No records found.
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((item, rowIndex) => {
                            const rowKey = String(item.id ?? rowIndex);

                            return (
                                <TableRow key={rowKey}>
                                    {headers.map((header, columnIndex) => (
                                        <TableCell
                                            key={`${rowKey}-${header}`}
                                            className={
                                                columnIndex === 0
                                                    ? 'font-medium'
                                                    : undefined
                                            }
                                        >
                                            {renderCellValue(item[header])}
                                        </TableCell>
                                    ))}

                                    {hasActions && (
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        aria-label="Open row actions"
                                                    >
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {actions?.map((action) => {
                                                        const { href, method } =
                                                            resolveActionPath(
                                                                action,
                                                                item,
                                                            );

                                                        if (action.confirm) {
                                                            return (
                                                                <DropdownMenuItem
                                                                    key={`${rowKey}-${action.action}`}
                                                                    variant={
                                                                        action.variant
                                                                    }
                                                                    onSelect={() =>
                                                                        setPendingAction(
                                                                            {
                                                                                action,
                                                                                href,
                                                                                method,
                                                                                row: item,
                                                                            },
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        action.action
                                                                    }
                                                                </DropdownMenuItem>
                                                            );
                                                        }

                                                        return (
                                                            <DropdownMenuItem
                                                                key={`${rowKey}-${action.action}`}
                                                                asChild
                                                                variant={
                                                                    action.variant
                                                                }
                                                            >
                                                                <Link
                                                                    href={href}
                                                                    method={
                                                                        method
                                                                    }
                                                                    as={
                                                                        method ===
                                                                        'get'
                                                                            ? 'a'
                                                                            : 'button'
                                                                    }
                                                                    className="w-full cursor-pointer"
                                                                >
                                                                    {
                                                                        action.action
                                                                    }
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        );
                                                    })}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            <Dialog
                open={Boolean(pendingAction)}
                onOpenChange={(open) => {
                    if (!open) {
                        setPendingAction(null);
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {pendingAction?.action.confirmTitle ??
                                `Confirm ${pendingAction?.action.action ?? 'action'}`}
                        </DialogTitle>
                        <DialogDescription>
                            {confirmMessage ??
                                'Are you sure you want to continue? This action cannot be undone.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                {pendingAction?.action.cancelButtonText ??
                                    'Cancel'}
                            </Button>
                        </DialogClose>
                        <Button
                            type="button"
                            variant={
                                pendingAction?.action.variant === 'destructive'
                                    ? 'destructive'
                                    : 'default'
                            }
                            onClick={handleConfirmAction}
                        >
                            {pendingAction?.action.confirmButtonText ??
                                pendingAction?.action.action ??
                                'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
