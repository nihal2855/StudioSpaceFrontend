
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/require-auth";
import { getStudioByIdAPI } from "@/lib/studio-data";
import StudioForm from "@/components/studio/StudioForm";

export default async function EditStudioPage({ params }) {
    const session = await requireAuth();
    const { id } = await params;

    let studio;

    try {
        studio = await getStudioByIdAPI(id);
    } catch (error) {
        notFound();
    }

    if (!studio) {
        notFound();
    }

    // Only the studio owner can access the edit page
    if (studio.hostId !== session.user.id) {
        return (
            <main className="min-h-screen bg-[#F8F6F2] px-4 py-16">
                <div className="mx-auto max-w-xl rounded-2xl border border-[#E9E6E0] bg-white p-8 text-center">
                    <h1 className="text-2xl font-bold text-[#20201E]">
                        Access Denied
                    </h1>

                    <p className="mt-3 text-sm text-[#77756F]">
                        You are not authorized to edit this studio.
                    </p>

                    <Link
                        href="/dashboard"
                        className="mt-6 inline-flex rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F6F2] px-4 py-12">
            <div className="mx-auto max-w-4xl">

                {/* Page Header */}
                <div className="mb-8">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-[#EA7838] hover:text-[#D96529]"
                    >
                        ← Back to Dashboard
                    </Link>

                    <h1 className="mt-5 text-3xl font-bold text-[#20201E]">
                        Edit Your Studio
                    </h1>

                    <p className="mt-2 text-sm text-[#77756F]">
                        Update your studio information, pricing and facilities.
                    </p>
                </div>

                {/* Edit Form */}
                <StudioForm
                    mode="edit"
                    initialStudio={studio}
                />

            </div>
        </main>
    );
}
