
import Link from "next/link";
import {
    ArrowRight,
    MapPin,
    Star,
    Clock,
    Camera,
} from "lucide-react";

import SectionHeading from "@/components/ui/SectionHeading";
import StudioCard from "@/components/studio/StudioCard";
import { getAllStudiosAPI } from "@/lib/studio-data";

export default async function FeaturedStudios() {
    let studios = [];
    let error = false;

    try {
        const result = await getAllStudiosAPI();

        // Sort newest studios first and show only 6
        studios = (Array.isArray(result) ? result : [])
            .sort(
                (a, b) =>
                    new Date(b.createdAt || 0) -
                    new Date(a.createdAt || 0)
            )
            .slice(0, 6)
            .map((studio) => ({
                ...studio,
                _id: String(studio._id),
                image: studio.imageUrl || studio.image || "",
                rating: studio.rating || 0,
            }));
    } catch (err) {
        console.error("Featured studios loading failed:", err);
        error = true;
    }

    return (
        <section className="bg-white">
            <div className="container section-padding">

                {/* SECTION HEADER */}
                <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">

                    <SectionHeading
                        eyebrow="EXPLORE OUR COLLECTION"
                        title="Find your space to create."
                        description="From photography studios to professional recording rooms, discover spaces built for your next big idea."
                    />

                    <Link
                        href="/studios"
                        className="inline-flex shrink-0 items-center gap-2 self-start rounded-xl border border-[#E9E6E0] px-5 py-3 text-sm font-semibold text-[#20201E] transition hover:border-[#EA7838] hover:bg-[#FFF0E6] hover:text-[#EA7838] sm:self-auto"
                    >
                        Explore All Studios
                        <ArrowRight size={17} />
                    </Link>

                </div>

                {/* SECTION LABEL */}
                <div className="mb-7 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="h-7 w-1 rounded-full bg-[#EA7838]" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-[#20201E]">
                            Recently Added Spaces
                        </h3>
                    </div>

                    <span className="text-xs font-medium text-[#77756F]">
                        {studios.length} Spaces
                    </span>
                </div>

                {/* STUDIO CARDS */}
                {error ? (
                    <div className="rounded-2xl border border-[#E9E6E0] bg-[#F8F6F2] px-6 py-14 text-center">
                        <h3 className="text-lg font-bold text-[#20201E]">
                            Unable to load studios
                        </h3>
                        <p className="mt-2 text-sm text-[#77756F]">
                            Please try again later.
                        </p>
                        <Link
                            href="/studios"
                            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#EA7838]"
                        >
                            Browse Studios <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : studios.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {studios.map((studio) => (
                            <StudioCard
                                key={studio._id}
                                studio={studio}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-[#E9E6E0] bg-[#F8F6F2] px-6 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                            <Camera size={26} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-[#20201E]">
                            Your next creative space awaits.
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#77756F]">
                            No studios have been listed yet. Be the first to share
                            your creative space with the community.
                        </p>

                        <Link
                            href="/add-studio"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            List Your Studio
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                )}

                {/* BOTTOM CTA */}
                <div className="mt-14 overflow-hidden rounded-2xl bg-[#F8F6F2] p-7 sm:p-10">
                    <div className="flex flex-col justify-between gap-7 md:flex-row md:items-center">

                        <div className="max-w-xl">
                            <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#EA7838]">
                                FOR STUDIO OWNERS
                            </span>

                            <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#20201E] sm:text-3xl">
                                Turn your creative space into an opportunity.
                            </h3>

                            <p className="mt-3 text-sm leading-7 text-[#77756F]">
                                List your studio, connect with creators and make
                                your space part of someone's next great project.
                            </p>
                        </div>

                        <Link
                            href="/add-studio"
                            className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[#EA7838] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#D96529]"
                        >
                            Become a Host
                            <ArrowRight size={17} />
                        </Link>

                    </div>
                </div>

            </div>
        </section>
    );
}
