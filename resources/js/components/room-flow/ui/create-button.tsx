import { Link } from '@inertiajs/react';
import type { VariantProps } from 'class-variance-authority';
import { Plus } from 'lucide-react';
import type { buttonVariants } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import type { RouteDefinition } from '@/wayfinder';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

type Props = {
    text: string;
    variant?: ButtonVariant;
    createRoute: () => RouteDefinition<'get'>;
};

export default function CreateButton({
    text,
    createRoute,
    variant = 'secondary',
}: Props) {
    return (
        <Button asChild className="w-full sm:w-auto" variant={variant}>
            <Link href={createRoute()}>
                <Plus aria-hidden="true" className="size-4" />
                {text}
            </Link>
        </Button>
    );
}
