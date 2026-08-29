import { Link } from '@inertiajs/react';
import type { VariantProps } from 'class-variance-authority';
import { Button  } from '@/components/ui/button';
import type { buttonVariants } from '@/components/ui/button';
import type { RouteDefinition } from '@/wayfinder';

type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];

type Props = {
    text: string;
    variant?: ButtonVariant;
    redirectTo: () => RouteDefinition<'get'>;
};

export default function RedirectButton({
    text,
    redirectTo,
    variant = "secondary"
}: Props) {
    const route = redirectTo();

    return (
        <>
            <Button asChild className="w-full sm:w-auto" variant={variant}>
                <Link href={route.url}>
                    { text }
                </Link>
            </Button>
        </>
    )
}
