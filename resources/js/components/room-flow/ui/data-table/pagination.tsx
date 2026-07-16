import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
    recordsPerPage?: number;
    lastPage?: number;
};

export default function Pagination({ recordsPerPage = 0, lastPage = 0 }: Props) {
    return (
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 text-sm text-muted-foreground">
            <span className="whitespace-nowrap">{recordsPerPage} per page</span>

            <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Previous page"
            >
                <ChevronsLeft className="h-4 w-4" />
            </Button>

            <Input
                id="page"
                type="number"
                name="page"
                min={1}
                inputMode="numeric"
                autoComplete="off"
                defaultValue={1}
                aria-label="Current page"
                className="h-9 w-14 px-2 text-center tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <span className="whitespace-nowrap">of {lastPage}</span>

            <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Next page"
            >
                <ChevronsRight className="h-4 w-4" />
            </Button>
        </div>
    );
}
