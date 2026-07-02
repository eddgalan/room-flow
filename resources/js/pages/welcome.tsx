import { Head, Link } from '@inertiajs/react';
import { login } from '@/routes';
import roomFlowDarkLogo from '../../images/RoomFlow-Dark.png';
import roomFlowLightLogo from '../../images/RoomFlow-Light.png';

export default function Welcome() {
    return (
        <>
            <Head title="Room Flow" />

            <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
                <picture>
                    <source
                        srcSet={roomFlowDarkLogo}
                        media="(prefers-color-scheme: dark)"
                    />
                    <img
                        src={roomFlowLightLogo}
                        alt="Room Flow"
                        className="h-24 w-auto"
                    />
                </picture>

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
