
"use client";

import { useEffect, useMemo, useState } from "react";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import { getAllStudiosAPI } from "@/lib/studio-data";
import StudioCard from "@/components/studio/StudioCard";

import {
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    ArrowRight,
    RotateCcw,
} from "lucide-react";

const categories = [
    "All Categories",
    "Photography",
    "Film & Production",
    "Podcast",
    "Music Studio",
    "Art Workshop",
];

// Skeleton Card
function StudioSkeleton() {
    return (
        <div className="overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white">
            {/* Image Skeleton */}
            <div className="relative h-56 animate-pulse bg-[#EEEAE4]">
                <div className="absolute left-4 top-4 h-6 w-24 rounded-full bg-[#E2DDD5]" />
            </div>

            <div className="space-y-4 p-5">
                {/* Category and Rating */}
                <div className="flex items-center justify-between">
                    <div className="h-3 w-24 animate-pulse rounded bg-[#EEEAE4]" />
                    <div className="h-3 w-16 animate-pulse rounded bg-[#EEEAE4]" />
                </div>

                {/* Title */}
                <div className="h-5 w-3/4 animate-pulse rounded bg-[#EEEAE4]" />

                {/* Location */}
                <div className="h-3 w-1/2 animate-pulse rounded bg-[#EEEAE4]" />

                {/* Divider */}
                <div className="border-t border-[#E9E6E0]" />

                {/* Price and Button */}
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <div className="h-3 w-16 animate-pulse rounded bg-[#EEEAE4]" />
                        <div className="h-5 w-24 animate-pulse rounded bg-[#EEEAE4]" />
                    </div>

                    <div className="h-10 w-28 animate-pulse rounded-xl bg-[#EEEAE4]" />
                </div>
            </div>
        </div>
    );
}

// Skeleton Grid
function StudiosSkeleton() {
    return (
        <div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="Loading studios"
            aria-busy="true"
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <StudioSkeleton key={index} />
            ))}
        </div>
    );
}

function StudiosContent() {
    const searchParams = useSearchParams();

    const [studios, setStudios] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [sort, setSort] = useState("recommended");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryCount, setRetryCount] = useState(0);

    // Read category from URL
    useEffect(() => {
        const urlCategory = searchParams.get("category");

        if (urlCategory && categories.includes(urlCategory)) {
            setCategory(urlCategory);
        } else {
            setCategory("All Categories");
        }
    }, [searchParams]);

    // Fetch studios
    useEffect(() => {
        let isMounted = true;

        const fetchStudios = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getAllStudiosAPI();

                if (!isMounted) return;

                const studioList = Array.isArray(data)
                    ? data
                    : data?.studios || data?.data || [];

                const formattedStudios = studioList.map((studio) => ({
                    ...studio,
                    _id: studio._id,
                    image: studio.imageUrl || studio.image || "",
                    rating: Number(studio.rating || 0),
                }));

                setStudios(formattedStudios);
            } catch (err) {
                console.error("Explore Studios Error:", err);

                if (isMounted) {
                    setError(err.message || "Failed to load studios.");
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchStudios();

        return () => {
            isMounted = false;
        };
    }, [retryCount]);

    // Search, filter and sort
    const filteredStudios = useMemo(() => {
        let results = [...studios];

        if (search.trim()) {
            const searchTerm = search.trim().toLowerCase();

            results = results.filter((studio) => {
                const title = (studio.title || "").toLowerCase();
                const location = (studio.location || "").toLowerCase();
                const studioCategory = (studio.category || "").toLowerCase();

                return (
                    title.includes(searchTerm) ||
                    location.includes(searchTerm) ||
                    studioCategory.includes(searchTerm)
                );
            });
        }

        if (category !== "All Categories") {
            results = results.filter(
                (studio) => studio.category === category
            );
        }

        if (sort === "price-low") {
            results.sort(
                (a, b) =>
                    Number(a.hourlyRate || 0) - Number(b.hourlyRate || 0)
            );
        } else if (sort === "price-high") {
            results.sort(
                (a, b) =>
                    Number(b.hourlyRate || 0) - Number(a.hourlyRate || 0)
            );
        } else if (sort === "rating") {
            results.sort(
                (a, b) =>
                    Number(b.rating || 0) - Number(a.rating || 0)
            );
        } else {
            results.sort(
                (a, b) =>
                    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            );
        }

        return results;
    }, [studios, search, category, sort]);

    const clearFilters = () => {
        setSearch("");
        setCategory("All Categories");
        setSort("recommended");
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Page Header */}
            <section className="bg-[#F8F6F2] py-16 sm:py-20">
                <div className="container">
                    <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#EA7838]">
                        Explore Studios
                    </p>

                    <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-[#20201E] sm:text-5xl">
                        Find the perfect space for your next creation.
                    </h1>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-[#77756F] sm:text-base">
                        Discover inspiring creative spaces, compare your options
                        and find a studio that matches your vision.
                    </p>

                    {/* Search */}
                    <div className="mt-8 flex max-w-2xl items-center gap-3 rounded-2xl border border-[#E9E6E0] bg-white px-4 py-2 shadow-sm">
                        <Search
                            size={21}
                            className="shrink-0 text-[#EA7838]"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by studio, category or location..."
                            className="w-full bg-transparent py-3 text-sm text-[#20201E] outline-none placeholder:text-[#AAA69F]"
                        />
                    </div>
                </div>
            </section>

            {/* Studios Listing */}
            <section className="container py-14 sm:py-16">
                {/* Filters */}
                <div className="mb-9 flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                    <div>
                        <h2 className="text-xl font-bold text-[#20201E]">
                            Explore Creative Spaces
                        </h2>

                        {loading ? (
                            <div className="mt-3 h-4 w-32 animate-pulse rounded bg-[#EEEAE4]" />
                        ) : (
                            <p className="mt-2 text-sm text-[#77756F]">
                                {filteredStudios.length} studios found
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        {/* Category Filter */}
                        <div className="flex items-center gap-2 rounded-xl border border-[#E9E6E0] px-3">
                            <SlidersHorizontal
                                size={17}
                                className="text-[#EA7838]"
                            />

                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="min-w-0 bg-white py-3 text-sm text-[#20201E] outline-none"
                            >
                                {categories.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Sorting */}
                        <div className="flex items-center gap-2 rounded-xl border border-[#E9E6E0] px-3">
                            <ArrowUpDown
                                size={17}
                                className="text-[#EA7838]"
                            />

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="min-w-0 bg-white py-3 text-sm text-[#20201E] outline-none"
                            >
                                <option value="recommended">Recommended</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Category Chips */}
                <div className="mb-9 flex flex-wrap gap-2">
                    {categories.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setCategory(item)}
                            className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${category === item
                                    ? "border-[#EA7838] bg-[#EA7838] text-white"
                                    : "border-[#E9E6E0] bg-white text-[#77756F] hover:border-[#EA7838] hover:text-[#EA7838]"
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Studio Grid */}
                {loading ? (
                    <StudiosSkeleton />
                ) : error ? (
                    <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-12 text-center">
                        <h3 className="text-xl font-bold text-red-700">
                            Unable to load studios
                        </h3>

                        <p className="mt-2 text-sm text-red-600">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() => setRetryCount((count) => count + 1)}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            <RotateCcw size={16} />
                            Try Again
                        </button>
                    </div>
                ) : filteredStudios.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredStudios.map((studio) => (
                            <StudioCard
                                key={studio._id}
                                studio={studio}
                            />
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="rounded-3xl border border-dashed border-[#E9E6E0] bg-[#F8F6F2] px-5 py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                            <Search size={25} />
                        </div>

                        <h3 className="mt-5 text-xl font-bold text-[#20201E]">
                            No studios found
                        </h3>

                        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#77756F]">
                            We couldn't find any studios matching your search.
                            Try another keyword or change your filters.
                        </p>

                        <button
                            type="button"
                            onClick={clearFilters}
                            className="mt-6 rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Bottom CTA */}
                <div className="mt-16 rounded-2xl bg-[#20201E] p-8 text-center sm:p-12">
                    <h2 className="text-2xl font-bold text-white sm:text-3xl">
                        Own a creative space?
                    </h2>

                    <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#B7B3AC]">
                        List your studio on StudioSpace and connect with
                        creators looking for their next workspace.
                    </p>

                    <Link
                        href="/add-studio"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        List Your Studio
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Suspense fallback
export default function StudiosPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-white">
                    <section className="bg-[#F8F6F2] py-16 sm:py-20">
                        <div className="container">
                            <div className="mb-4 h-4 w-32 animate-pulse rounded bg-[#E2DDD5]" />
                            <div className="h-10 max-w-xl animate-pulse rounded-lg bg-[#E2DDD5]" />
                            <div className="mt-5 h-4 max-w-lg animate-pulse rounded bg-[#E2DDD5]" />
                            <div className="mt-8 h-14 max-w-2xl animate-pulse rounded-2xl bg-white" />
                        </div>
                    </section>

                    <section className="container py-14 sm:py-16">
                        <div className="mb-9 h-6 w-52 animate-pulse rounded bg-[#EEEAE4]" />
                        <StudiosSkeleton />
                    </section>
                </div>
            }
        >
            <StudiosContent />
        </Suspense>
    );
}
