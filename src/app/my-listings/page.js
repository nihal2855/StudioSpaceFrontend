import { requireAuth } from "@/lib/require-auth";
import MyStudiosList from "@/components/studio/MyStudiosList";
import Link from "next/link";

export default async function MyListingsPage() {
    const session = await requireAuth();

    return (
        <main className="min-h-screen bg-[#F8F6F2] px-4 py-12">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-sm font-semibold text-[#EA7838]">
                            HOST DASHBOARD
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-[#20201E]">
                            My Listings
                        </h1>

                        <p className="mt-2 text-[#77756F]">
                            Welcome back, {session.user.name}. Manage your creative spaces.
                        </p>
                    </div>

                    <Link
                        href="/add-studio"
                        className="inline-flex items-center justify-center rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        + Add New Studio
                    </Link>
                </div>

                <MyStudiosList />

            </div>
        </main>
    );
}

