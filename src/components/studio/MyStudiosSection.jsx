
"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
    Plus,
    Pencil,
    Trash2,
    MapPin,
    Users,
    AlertCircle,
    Building2,
    X,
} from "lucide-react";

import {
    getMyStudiosAPI,
    deleteStudioAPI,
} from "@/lib/studio-api";

// Studio Card Skeleton
function StudioCardSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white">
            {/* Image Skeleton */}
            <div className="h-52 animate-pulse bg-[#F0EDE8]" />

            {/* Details Skeleton */}
            <div className="space-y-4 p-5">
                <div className="h-6 w-3/4 animate-pulse rounded-md bg-[#F0EDE8]" />

                <div className="h-4 w-1/2 animate-pulse rounded-md bg-[#F0EDE8]" />

                <div className="h-4 w-1/3 animate-pulse rounded-md bg-[#F0EDE8]" />

                {/* Price Skeleton */}
                <div className="flex items-center justify-between border-t border-[#E9E6E0] pt-4">
                    <div className="space-y-2">
                        <div className="h-3 w-20 animate-pulse rounded bg-[#F0EDE8]" />
                        <div className="h-6 w-28 animate-pulse rounded bg-[#F0EDE8]" />
                    </div>

                    <div className="h-4 w-24 animate-pulse rounded bg-[#F0EDE8]" />
                </div>

                {/* Action Buttons Skeleton */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="h-10 animate-pulse rounded-lg bg-[#F0EDE8]" />
                    <div className="h-10 animate-pulse rounded-lg bg-[#F0EDE8]" />
                </div>
            </div>
        </div>
    );
}

export default function MyStudiosSection() {
    const [studios, setStudios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedStudio, setSelectedStudio] = useState(null);
    const [deleting, setDeleting] = useState(false);

    // Fetch host studios
    const fetchStudios = useCallback(async () => {
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
    }, []);

    useEffect(() => {
        fetchStudios();
    }, [fetchStudios]);

    // Delete studio
    const handleDeleteStudio = async () => {
        if (!selectedStudio) return;

        try {
            setDeleting(true);
            setError("");

            await deleteStudioAPI(selectedStudio._id);

            setStudios((previousStudios) =>
                previousStudios.filter(
                    (studio) => studio._id !== selectedStudio._id
                )
            );

            setSelectedStudio(null);
        } catch (err) {
            setError(err.message || "Failed to delete studio.");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <section className="mt-12">

            {/* Section Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#EA7838]">
                        <Building2 size={18} />
                        YOUR LISTINGS
                    </div>

                    <h2 className="text-2xl font-bold text-[#20201E]">
                        My Studios
                    </h2>

                    <p className="mt-1 text-sm text-[#77756F]">
                        Manage, edit and organize your creative spaces.
                    </p>
                </div>

                <Link
                    href="/add-studio"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                >
                    <Plus size={18} />
                    Add New Studio
                </Link>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    <AlertCircle size={18} />
                    {error}
                </div>
            )}

            {/* Loading / Empty State / Studio Cards */}
            {loading ? (
                /* Skeleton Loading */
                <div
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
                    aria-label="Loading studios"
                    aria-busy="true"
                >
                    {Array.from({ length: 3 }).map((_, index) => (
                        <StudioCardSkeleton key={index} />
                    ))}
                </div>
            ) : studios.length === 0 ? (

                /* Empty State */
                <div className="rounded-2xl border border-[#E9E6E0] bg-white px-6 py-14 text-center">
                    <Building2
                        size={42}
                        className="mx-auto mb-4 text-[#EA7838]"
                    />

                    <h3 className="text-xl font-bold text-[#20201E]">
                        No studios listed yet
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm text-[#77756F]">
                        You haven't added any creative spaces. Start listing
                        your studio and connect with creators.
                    </p>

                    <Link
                        href="/add-studio"
                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        <Plus size={17} />
                        Add Your First Studio
                    </Link>
                </div>

            ) : (

                /* Studio Cards */
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {studios.map((studio) => (
                        <article
                            key={studio._id}
                            className="overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white transition hover:shadow-md"
                        >
                            {/* Studio Image */}
                            <div className="relative h-52 overflow-hidden bg-[#F8F6F2]">
                                {studio.imageUrl ? (
                                    <img
                                        src={studio.imageUrl}
                                        alt={studio.title}
                                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-[#77756F]">
                                        <Building2 size={38} />
                                    </div>
                                )}

                                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#EA7838] shadow-sm">
                                    {studio.category || "Creative Space"}
                                </span>
                            </div>

                            {/* Studio Details */}
                            <div className="p-5">
                                <h3 className="truncate text-lg font-bold text-[#20201E]">
                                    {studio.title}
                                </h3>

                                <div className="mt-3 flex items-center gap-2 text-sm text-[#77756F]">
                                    <MapPin
                                        size={16}
                                        className="shrink-0 text-[#EA7838]"
                                    />

                                    <span className="truncate">
                                        {studio.location}
                                    </span>
                                </div>

                                <div className="mt-2 flex items-center gap-2 text-sm text-[#77756F]">
                                    <Users
                                        size={16}
                                        className="text-[#EA7838]"
                                    />

                                    <span>
                                        {studio.maxCapacity || 1} Guests
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="mt-5 flex items-center justify-between border-t border-[#E9E6E0] pt-4">
                                    <div>
                                        <p className="text-xs text-[#77756F]">
                                            Hourly Rate
                                        </p>

                                        <p className="mt-1 text-xl font-bold text-[#20201E]">
                                            ৳
                                            {Number(
                                                studio.hourlyRate || 0
                                            ).toLocaleString("en-BD")}

                                            <span className="ml-1 text-xs font-normal text-[#77756F]">
                                                / hour
                                            </span>
                                        </p>
                                    </div>

                                    <Link
                                        href={`/studios/${studio._id}`}
                                        className="text-sm font-semibold text-[#EA7838] transition hover:text-[#D96529]"
                                    >
                                        View Details
                                    </Link>
                                </div>

                                {/* Actions */}
                                <div className="mt-5 grid grid-cols-2 gap-3">
                                    <Link
                                        href={`/studios/edit/${studio._id}`}
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-[#E9E6E0] px-4 py-2.5 text-sm font-semibold text-[#20201E] transition hover:border-[#EA7838] hover:text-[#EA7838]"
                                    >
                                        <Pencil size={16} />
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() =>
                                            setSelectedStudio(studio)
                                        }
                                        className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {selectedStudio && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

                        <div className="mb-4 flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                                <Trash2 size={23} />
                            </div>

                            <button
                                onClick={() => setSelectedStudio(null)}
                                disabled={deleting}
                                className="rounded-lg p-2 text-[#77756F] transition hover:bg-[#F8F6F2]"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <h3 className="text-xl font-bold text-[#20201E]">
                            Delete this studio?
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#77756F]">
                            Are you sure you want to delete{" "}
                            <strong className="text-[#20201E]">
                                {selectedStudio.title}
                            </strong>
                            ? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedStudio(null)}
                                disabled={deleting}
                                className="rounded-lg border border-[#E9E6E0] px-4 py-2.5 text-sm font-semibold text-[#77756F] hover:bg-[#F8F6F2] disabled:opacity-50"
                            >
                                Keep Studio
                            </button>

                            <button
                                onClick={handleDeleteStudio}
                                disabled={deleting}
                                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {deleting ? "Deleting..." : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
