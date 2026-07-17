import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type Props = {
    currentPage: number;
    recordsPerPage: number;
    lastPage: number;
    disabled?: boolean;
    onPageChange: (page: number) => void;
};

export default function Pagination({
    currentPage,
    recordsPerPage,
    lastPage,
    disabled = false,
    onPageChange,
}: Props) {
    const previousPage = () => {
        onPageChange(currentPage - 1);
    };

    const nextPage = () => {
        onPageChange(currentPage + 1);
    };

    const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const page = Number(event.target.value);

        if (!Number.isInteger(page)) {
            return;
        }

        onPageChange(page);
    };

    return (
        <div className="flex flex-1 flex-wrap items-center justify-end gap-2 text-sm text-muted-foreground">
            <span className="whitespace-nowrap">{recordsPerPage} per page</span>

            <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Previous page"
                disabled={disabled || currentPage <= 1}
                onClick={previousPage}
            >
                <ChevronLeft className="size-4" />
            </Button>

            <Input
                id="page"
                type="number"
                name="page"
                min={1}
                max={lastPage}
                value={currentPage}
                disabled={disabled}
                inputMode="numeric"
                autoComplete="off"
                aria-label="Current page"
                onChange={handlePageChange}
                className="h-9 w-14 [appearance:textfield] px-2 text-center tabular-nums [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />

            <span className="whitespace-nowrap">of {lastPage}</span>

            <Button
                type="button"
                size="icon"
                variant="secondary"
                aria-label="Next page"
                disabled={disabled || currentPage >= lastPage}
                onClick={nextPage}
            >
                <ChevronRight className="size-4" />
            </Button>
        </div>
    );
}
