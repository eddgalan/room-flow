import {Head, Link} from '@inertiajs/react';
import {login} from '@/routes';

export default function Welcome() {
    return (
        <>
            <Head title="Room Flow"/>

            <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
                <h1 className="text-4xl font-bold">Room Flow</h1>

                <p className="max-w-md text-center text-neutral-600">
                    Manage rooms, availability, and operations from a single location.
                </p>

                <div className="flex gap-3">
                    <Link href={login()} className="rounded-md border px-4 py-2">
                        Login
                    </Link>
                </div>
            </main>
        </>
    );
}
