
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getMyStudiosAPI } from "@/lib/studio-api";

export default function MyStudiosList() {
    const [studios, setStudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStudios = async () => {
            try {
                setLoading(true);
                setError("");

                const result = await getMyStudiosAPI();

                setStudios(result.data || []);
            } catch (err) {
                setError(err.message || "Failed to load your studios.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudios();
    }, []);

    // Loading State
    if (loading) {
        return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="animate-pulse overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white"
                    >
                        <div className="h-48 bg-[#F0EDE7]" />
                        <div className="space-y-3 p-5">
                            <div className="h-5 w-3/4 rounded bg-[#F0EDE7]" />
                            <div className="h-4 w-1/2 rounded bg-[#F0EDE7]" />
                            <div className="h-8 w-full rounded bg-[#F0EDE7]" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
                <p className="font-medium text-red-700">{error}</p>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-4 rounded-xl bg-[#EA7838] px-5 py-2 text-sm font-semibold text-white hover:bg-[#D96529]"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Empty State
    if (studios.length === 0) {
        return (
            <div className="rounded-2xl border border-dashed border-[#D9D5CC] bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E6] text-3xl">
                    🏢
                </div>

                <h2 className="mt-5 text-xl font-bold text-[#20201E]">
                    No Studios Listed Yet
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-[#77756F]">
                    You haven't added any studios yet. Start listing your creative
                    space and connect with creators.
                </p>

                <Link
                    href="/add-studio"
                    className="mt-6 inline-flex rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                >
                    Add Your First Studio
                </Link>
            </div>
        );
    }

    // Studio List
    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
                <article
                    key={studio._id}
                    className="overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white transition hover:-translate-y-1 hover:shadow-lg"
                >
                    <div className="h-48 overflow-hidden bg-[#F8F6F2]">
                        <img
                            src={studio.imageUrl}
                            alt={studio.title}
                            className="h-full w-full object-cover"
                        />
                    </div>

                    <div className="p-5">
                        <span className="rounded-full bg-[#FFF0E6] px-3 py-1 text-xs font-semibold text-[#EA7838]">
                            {studio.category}
                        </span>

                        <h2 className="mt-3 line-clamp-1 text-lg font-bold text-[#20201E]">
                            {studio.title}
                        </h2>

                        <p className="mt-2 line-clamp-1 text-sm text-[#77756F]">
                            📍 {studio.location}
                        </p>

                        <p className="mt-4 text-lg font-bold text-[#EA7838]">
                            ৳{Number(studio.hourlyRate).toLocaleString("en-BD")}
                            <span className="text-sm font-normal text-[#77756F]">
                                {" "}/ hour
                            </span>
                        </p>

                        <div className="mt-5 flex items-center justify-between border-t border-[#E9E6E0] pt-4">
                            <span className="text-xs text-[#77756F]">
                                Capacity: {studio.maxCapacity}
                            </span>

                            <Link
                                href={`/studios/${studio._id}`}
                                className="text-sm font-semibold text-[#EA7838] hover:underline"
                            >
                                View Studio →
                            </Link>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
