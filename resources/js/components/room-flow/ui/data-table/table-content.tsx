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

type Props = {
    headers: string[];
    data: Record<string, ReactNode>[];
    caption?: string;
};

function renderCellValue(value: ReactNode) {
    if (typeof value === 'boolean') {
        return value ? 'Yes' : 'No';
    }

    return value ?? '-';
}

export default function TableContent({ headers, data, caption }: Props) {
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
                {data.map((item, rowIndex) => (
                    <TableRow key={String(item.id ?? rowIndex)}>
                        {headers.map((header, columnIndex) => (
                            <TableCell
                                key={`${String(item.id ?? rowIndex)}-${header}`}
                                className={
                                    columnIndex === 0 ? 'font-medium' : undefined
                                }
                            >
                                {renderCellValue(item[header])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
