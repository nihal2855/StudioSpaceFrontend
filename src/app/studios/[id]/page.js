
import Link from "next/link";
import { notFound } from "next/navigation";

import {
    ArrowLeft,
    MapPin,
    Users,
    Clock3,
    ShieldCheck,
    Check,
    Camera,
} from "lucide-react";

import { getStudioByIdAPI } from "@/lib/studio-data";
import BookingForm from "@/components/booking/BookingForm";
import ReviewSection from "@/components/review/ReviewSection";

export default async function StudioDetailsPage({ params }) {
    const { id } = await params;

    let studio;

    try {
        studio = await getStudioByIdAPI(id);
    } catch (error) {
        console.error("Studio Details Error:", error);
        notFound();
    }

    if (!studio) {
        notFound();
    }

    const hourlyRate = Number(studio.hourlyRate || 0);
    const securityDeposit = Number(studio.securityDeposit || 0);
    const capacity = Number(studio.maxCapacity || 0);

    const amenities = Array.isArray(studio.amenities)
        ? studio.amenities
        : [];

    // Prepare studio gallery images
    const galleryImages = Array.isArray(studio.gallery)
        ? studio.gallery.filter(Boolean)
        : [];

    const mainImage = studio.imageUrl || studio.image || "";

    const images = [
        ...new Set([mainImage, ...galleryImages].filter(Boolean)),
    ];

    const hostName = studio.hostName || "Studio Host";
    const hostImage = studio.hostImage || studio.hostPhoto || "";

    return (
        <main className="min-h-screen bg-white pb-20">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Back Button */}
                <Link
                    href="/studios"
                    className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#77756F] transition hover:text-[#EA7838]"
                >
                    <ArrowLeft size={18} />
                    Back to Explore
                </Link>

                {/* Studio Heading */}
                <div className="mb-8">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className="rounded-full bg-[#FFF0E6] px-3 py-1 text-xs font-semibold text-[#EA7838]">
                            {studio.category || "Creative Space"}
                        </span>

                        <span className="text-sm text-[#77756F]">
                            Available for booking
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold tracking-tight text-[#20201E] sm:text-4xl">
                        {studio.title}
                    </h1>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#77756F]">
                        <div className="flex items-center gap-2">
                            <MapPin
                                size={17}
                                className="text-[#EA7838]"
                            />
                            <span>{studio.location}</span>
                        </div>
                    </div>
                </div>

                {/* Studio Gallery */}
                <section className="mb-12">
                    {images.length > 0 ? (
                        <>
                            {/* Only One Image */}
                            {images.length === 1 && (
                                <div className="relative h-[280px] overflow-hidden rounded-2xl bg-[#F8F6F2] sm:h-[500px]">
                                    <img
                                        src={images[0]}
                                        alt={studio.title}
                                        className="h-full w-full object-cover"
                                    />

                                    <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white">
                                        <Camera size={15} />
                                        Studio Space
                                    </span>
                                </div>
                            )}

                            {/* Two Images */}
                            {images.length === 2 && (
                                <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-2xl sm:grid-cols-2">
                                    {images.map((image, index) => (
                                        <div
                                            key={image}
                                            className="relative h-[280px] overflow-hidden bg-[#F8F6F2] sm:h-[420px]"
                                        >
                                            <img
                                                src={image}
                                                alt={`${studio.title} ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />

                                            {index === 0 && (
                                                <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white">
                                                    <Camera size={15} />
                                                    Studio Space
                                                </span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Three Images */}
                            {images.length === 3 && (
                                <div className="grid gap-3 overflow-hidden rounded-2xl sm:grid-cols-2">
                                    <div className="relative h-[280px] overflow-hidden bg-[#F8F6F2] sm:h-[500px]">
                                        <img
                                            src={images[0]}
                                            alt={studio.title}
                                            className="h-full w-full object-cover"
                                        />

                                        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white">
                                            <Camera size={15} />
                                            Studio Space
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-1">
                                        {images.slice(1).map((image, index) => (
                                            <div
                                                key={image}
                                                className="h-[180px] overflow-hidden bg-[#F8F6F2] sm:h-auto sm:min-h-[150px]"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${studio.title} ${index + 2}`}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Four or More Images */}
                            {images.length >= 4 && (
                                <div className="grid gap-3 overflow-hidden rounded-2xl sm:grid-cols-2">
                                    <div className="relative h-[280px] overflow-hidden bg-[#F8F6F2] sm:h-[500px]">
                                        <img
                                            src={images[0]}
                                            alt={studio.title}
                                            className="h-full w-full object-cover"
                                        />

                                        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-black/60 px-3 py-2 text-xs font-medium text-white">
                                            <Camera size={15} />
                                            Studio Space
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        {images.slice(1, 5).map((image, index) => (
                                            <div
                                                key={image}
                                                className="relative h-[134px] overflow-hidden bg-[#F8F6F2] sm:h-[244px]"
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${studio.title} gallery ${index + 2}`}
                                                    className="h-full w-full object-cover"
                                                />

                                                {index === 3 && images.length > 5 && (
                                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                                        <span className="text-xl font-bold text-white">
                                                            +{images.length - 5}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex h-[300px] items-center justify-center rounded-2xl bg-[#F8F6F2] text-sm text-[#77756F]">
                            No studio images available
                        </div>
                    )}
                </section>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

                    {/* Left Content */}
                    <div className="space-y-10 lg:col-span-2">

                        {/* Host Information */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <div className="flex items-center gap-4">
                                {hostImage ? (
                                    <img
                                        src={hostImage}
                                        alt={hostName}
                                        className="h-14 w-14 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF0E6] text-lg font-bold text-[#EA7838]">
                                        {hostName.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs text-[#77756F]">
                                        Hosted by
                                    </p>

                                    <h2 className="text-lg font-bold text-[#20201E]">
                                        {hostName}
                                    </h2>

                                    <p className="mt-1 text-xs text-[#77756F]">
                                        Studio Host
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#77756F]">
                                <div className="flex items-center gap-2">
                                    <Users
                                        size={18}
                                        className="text-[#EA7838]"
                                    />
                                    <span>
                                        Maximum {capacity} guests
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <ShieldCheck
                                        size={18}
                                        className="text-[#EA7838]"
                                    />
                                    <span>Secure booking</span>
                                </div>
                            </div>
                        </section>

                        {/* Studio Overview */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <h2 className="mb-4 text-xl font-bold text-[#20201E]">
                                About this space
                            </h2>

                            <p className="whitespace-pre-line text-base leading-8 text-[#77756F]">
                                {studio.overview ||
                                    "No description available."}
                            </p>
                        </section>

                        {/* Amenities */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <h2 className="mb-5 text-xl font-bold text-[#20201E]">
                                What this space offers
                            </h2>

                            {amenities.length > 0 ? (
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    {amenities.map((amenity, index) => (
                                        <div
                                            key={`${amenity}-${index}`}
                                            className="flex items-center gap-3 text-sm text-[#77756F]"
                                        >
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF0E6] text-[#EA7838]">
                                                <Check size={15} />
                                            </span>

                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-[#77756F]">
                                    No amenities listed.
                                </p>
                            )}
                        </section>

                        {/* Booking Information */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <h2 className="mb-5 text-xl font-bold text-[#20201E]">
                                Booking information
                            </h2>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-[#F8F6F2] p-5">
                                    <Clock3
                                        className="mb-3 text-[#EA7838]"
                                        size={22}
                                    />

                                    <p className="text-sm text-[#77756F]">
                                        Minimum booking duration
                                    </p>

                                    <p className="mt-1 font-semibold text-[#20201E]">
                                        1 hour
                                    </p>
                                </div>

                                <div className="rounded-xl bg-[#F8F6F2] p-5">
                                    <ShieldCheck
                                        className="mb-3 text-[#EA7838]"
                                        size={22}
                                    />

                                    <p className="text-sm text-[#77756F]">
                                        Booking security deposit
                                    </p>

                                    <p className="mt-1 font-semibold text-[#20201E]">
                                        ৳{securityDeposit.toLocaleString("en-BD")}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Reviews Section */}
                        <ReviewSection
                            studioId={studio._id.toString()}
                        />

                    </div>

                    {/* Right Booking Card */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl border border-[#E9E6E0] bg-white p-6 shadow-sm">

                            {/* Price */}
                            <div className="mb-6 border-b border-[#E9E6E0] pb-6">
                                <p className="text-sm text-[#77756F]">
                                    Starting from
                                </p>

                                <div className="mt-1 flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-[#20201E]">
                                        ৳{hourlyRate.toLocaleString("en-BD")}
                                    </span>

                                    <span className="text-sm text-[#77756F]">
                                        / hour
                                    </span>
                                </div>

                                <p className="mt-2 text-xs text-[#77756F]">
                                    Security deposit: ৳
                                    {securityDeposit.toLocaleString("en-BD")}
                                </p>
                            </div>

                            {/* Capacity */}
                            <div className="mb-6 flex items-center justify-between text-sm">
                                <span className="text-[#77756F]">
                                    Maximum capacity
                                </span>

                                <span className="font-semibold text-[#20201E]">
                                    {capacity} guests
                                </span>
                            </div>

                            {/* Booking Form */}
                            <BookingForm
                                studioId={studio._id.toString()}
                                hourlyRate={hourlyRate}
                                hostId={studio.hostId}
                            />

                            <p className="mt-5 text-center text-xs leading-5 text-[#77756F]">
                                Your booking request will be sent to the host for confirmation.
                            </p>
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
