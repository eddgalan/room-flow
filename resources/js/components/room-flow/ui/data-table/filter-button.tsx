import { Funnel } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FilterButton() {
    return (
        <Button className="w-full sm:w-auto">
            <Funnel className="size-4" /> Filters
        </Button>
    );
}
