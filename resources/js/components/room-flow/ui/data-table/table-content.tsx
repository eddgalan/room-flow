import type { ReactNode } from 'react';
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
    isLoading?: boolean;
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

export default function TableContent<T extends Record<string, unknown>>({
    headers,
    data,
    caption,
    isLoading = false,
}: Props<T>) {
    return (
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
                </TableRow>
            </TableHeader>

            <TableBody>
                {isLoading ? (
                    <TableRow>
                        <TableCell
                            colSpan={headers.length}
                            className="h-24 text-center"
                        >
                            Loading records...
                        </TableCell>
                    </TableRow>
                ) : data.length === 0 ? (
                    <TableRow>
                        <TableCell
                            colSpan={headers.length}
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
                            </TableRow>
                        );
                    })
                )}
            </TableBody>
        </Table>
    );
}
