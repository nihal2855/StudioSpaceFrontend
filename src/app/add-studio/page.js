
import { requireAuth } from "@/lib/require-auth";
import StudioForm from "@/components/studio/StudioForm";

export default async function AddStudioPage() {
    await requireAuth();

    return (
        <main className="min-h-screen bg-[#F8F6F2] px-4 py-12">
            <div className="mx-auto max-w-3xl">
                <div className="mb-8">
                    <p className="text-sm font-semibold text-[#EA7838]">
                        HOST DASHBOARD
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#20201E]">
                        Add Your Studio
                    </h1>

                    <p className="mt-3 text-[#77756F]">
                        Share your creative space with creators and start earning.
                    </p>
                </div>

                <StudioForm />
            </div>
        </main>
    );
}
