"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
    CalendarDays,
    Clock3,
    UserRound,
    Loader2,
    AlertCircle,
    CheckCircle2,
    XCircle,
    LayoutDashboard,
    RefreshCw,
    Building2,
    ArrowUpRight,
    MapPin,
    Wallet,
    TrendingUp,
    CalendarCheck,
    ChevronRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

import {
    getHostBookingsAPI,
    updateBookingStatusAPI,
} from "@/lib/booking-api";

import MyStudiosSection from "@/components/studio/MyStudiosSection";

const statusStyles = {
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Confirmed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Completed: "bg-blue-50 text-blue-700 border-blue-200",
    Cancelled: "bg-red-50 text-red-700 border-red-200",
};

// Loading Skeleton
function DashboardSkeleton() {
    return (
        <main className="min-h-screen bg-[#F8F7F4] py-10">
            <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
                <div className="space-y-3">
                    <div className="h-4 w-32 animate-pulse rounded bg-[#E9E6E0]" />
                    <div className="h-9 w-72 max-w-full animate-pulse rounded-lg bg-[#E9E6E0]" />
                    <div className="h-4 w-96 max-w-full animate-pulse rounded bg-[#E9E6E0]" />
                </div>

                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {[1, 2, 3, 4].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-[#E9E6E0] bg-white p-5"
                        >
                            <div className="h-10 w-10 animate-pulse rounded-xl bg-[#EEEAE4]" />
                            <div className="mt-5 h-3 w-24 animate-pulse rounded bg-[#EEEAE4]" />
                            <div className="mt-3 h-8 w-16 animate-pulse rounded bg-[#EEEAE4]" />
                        </div>
                    ))}
                </div>

                <div className="h-16 animate-pulse rounded-2xl bg-[#E9E6E0]" />

                <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="rounded-2xl border border-[#E9E6E0] bg-white p-6"
                        >
                            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex-1 space-y-4">
                                    <div className="h-5 w-48 animate-pulse rounded bg-[#EEEAE4]" />
                                    <div className="h-4 w-64 max-w-full animate-pulse rounded bg-[#EEEAE4]" />
                                    <div className="h-4 w-40 animate-pulse rounded bg-[#EEEAE4]" />
                                </div>
                                <div className="h-12 w-32 animate-pulse rounded-xl bg-[#EEEAE4]" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}

function StatCard({ title, value, icon: Icon, description, color }) {
    const colorStyles = {
        orange: "bg-[#FFF0E6] text-[#EA7838]",
        amber: "bg-amber-50 text-amber-600",
        green: "bg-emerald-50 text-emerald-600",
        blue: "bg-blue-50 text-blue-600",
    };

    return (
        <div className="group rounded-2xl border border-[#EAE7E1] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#20201E]/5 sm:p-6">
            <div className="flex items-start justify-between">
                <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${colorStyles[color]}`}
                >
                    <Icon size={21} />
                </div>

                <ArrowUpRight
                    size={18}
                    className="text-[#C5C0B8] transition group-hover:text-[#EA7838]"
                />
            </div>

            <p className="mt-5 text-sm font-medium text-[#77756F]">
                {title}
            </p>

            <div className="mt-1 flex items-end justify-between gap-2">
                <h3 className="text-3xl font-bold tracking-tight text-[#20201E]">
                    {value}
                </h3>
                <span className="pb-1 text-xs text-[#A19C94]">
                    {description}
                </span>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    const { data: session, isPending: sessionLoading } =
        authClient.useSession();

    const [activeTab, setActiveTab] = useState("bookings");

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedAction, setSelectedAction] = useState(null);
    const [updating, setUpdating] = useState(false);

    // Fetch host bookings
    const fetchBookings = useCallback(async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getHostBookingsAPI();
            setBookings(result.data || []);
        } catch (err) {
            setError(err.message || "Unable to load incoming bookings.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!sessionLoading && session) {
            fetchBookings();
        }

        if (!sessionLoading && !session) {
            setLoading(false);
        }
    }, [sessionLoading, session, fetchBookings]);

    // Update booking status
    const handleStatusUpdate = async () => {
        if (!selectedAction) return;

        try {
            setUpdating(true);
            setError("");

            await updateBookingStatusAPI(
                selectedAction.booking._id,
                selectedAction.status
            );

            setBookings((previous) =>
                previous.map((booking) =>
                    booking._id === selectedAction.booking._id
                        ? { ...booking, status: selectedAction.status }
                        : booking
                )
            );

            setSelectedAction(null);
        } catch (err) {
            setError(err.message || "Failed to update booking status.");
        } finally {
            setUpdating(false);
        }
    };

    // Loading
    if (sessionLoading || loading) {
        return <DashboardSkeleton />;
    }

    // Authentication check
    if (!session) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-[#F8F7F4] px-4">
                <div className="w-full max-w-md rounded-3xl border border-[#EAE7E1] bg-white p-8 text-center shadow-sm">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                        <LayoutDashboard size={30} />
                    </div>

                    <h1 className="mt-6 text-2xl font-bold text-[#20201E]">
                        Your dashboard awaits
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-[#77756F]">
                        Sign in to manage your creative spaces and keep track
                        of your booking requests.
                    </p>

                    <Link
                        href="/login"
                        className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        Sign In
                        <ChevronRight size={17} />
                    </Link>
                </div>
            </main>
        );
    }

    // Booking statistics
    const pendingCount = bookings.filter(
        (booking) => booking.status === "Pending"
    ).length;

    const confirmedCount = bookings.filter(
        (booking) => booking.status === "Confirmed"
    ).length;

    const completedCount = bookings.filter(
        (booking) => booking.status === "Completed"
    ).length;

    const cancelledCount = bookings.filter(
        (booking) => booking.status === "Cancelled"
    ).length;

    const userName =
        session.user?.name?.split(" ")[0] || "Host";

    return (
        <main className="min-h-screen bg-[#F8F7F4] py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                {/* Dashboard Header */}
                <section className="mb-9">
                    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#F2D6C5] bg-[#FFF0E6] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#D96529]">
                                <LayoutDashboard size={14} />
                                Host Dashboard
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-[#20201E] sm:text-4xl">
                                Welcome back, {userName}
                                <span className="text-[#EA7838]">.</span>
                            </h1>

                            <p className="mt-3 max-w-xl text-sm leading-6 text-[#77756F] sm:text-base">
                                Here's what's happening with your creative
                                spaces. Manage your studios and booking
                                requests in one place.
                            </p>
                        </div>

                        <Link
                            href="/add-studio"
                            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-[#EA7838] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#D96529] sm:self-auto"
                        >
                            <Building2 size={18} />
                            Add New Studio
                        </Link>
                    </div>
                </section>

                {/* Statistics */}
                <section className="mb-9">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-[#20201E]">
                                Overview
                            </h2>
                            <p className="mt-1 text-xs text-[#8A857D]">
                                Your booking activity at a glance
                            </p>
                        </div>

                        <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#77756F] ring-1 ring-[#EAE7E1]">
                            All time
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <StatCard
                            title="Total Bookings"
                            value={bookings.length}
                            icon={CalendarDays}
                            description="All requests"
                            color="orange"
                        />

                        <StatCard
                            title="Pending"
                            value={pendingCount}
                            icon={Clock3}
                            description="Needs attention"
                            color="amber"
                        />

                        <StatCard
                            title="Confirmed"
                            value={confirmedCount}
                            icon={CalendarCheck}
                            description="Approved"
                            color="green"
                        />

                        <StatCard
                            title="Completed"
                            value={completedCount}
                            icon={TrendingUp}
                            description="Finished"
                            color="blue"
                        />
                    </div>
                </section>

                {/* Main Dashboard Panel */}
                <section className="overflow-hidden rounded-3xl border border-[#EAE7E1] bg-white shadow-sm">

                    {/* Tabs */}
                    <div className="border-b border-[#EEEAE4] px-4 py-4 sm:px-6">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-lg font-bold text-[#20201E]">
                                    Workspace Manager
                                </h2>
                                <p className="mt-1 text-xs text-[#8A857D]">
                                    Manage your bookings and studio listings
                                </p>
                            </div>

                            <div className="flex w-full gap-2 rounded-xl bg-[#F8F7F4] p-1 sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab("bookings");
                                        setError("");
                                    }}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition sm:flex-none ${activeTab === "bookings"
                                        ? "bg-white text-[#EA7838] shadow-sm"
                                        : "text-[#77756F] hover:text-[#20201E]"
                                        }`}
                                >
                                    <CalendarDays size={17} />
                                    Bookings
                                    <span
                                        className={`rounded-full px-2 py-0.5 text-[11px] ${activeTab === "bookings"
                                            ? "bg-[#FFF0E6] text-[#D96529]"
                                            : "bg-white text-[#77756F]"
                                            }`}
                                    >
                                        {bookings.length}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setActiveTab("studios");
                                        setError("");
                                    }}
                                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition sm:flex-none ${activeTab === "studios"
                                        ? "bg-white text-[#EA7838] shadow-sm"
                                        : "text-[#77756F] hover:text-[#20201E]"
                                        }`}
                                >
                                    <Building2 size={17} />
                                    My Studios
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Incoming Bookings */}
                    {activeTab === "bookings" && (
                        <div className="p-4 sm:p-6 lg:p-8">

                            {/* Section Heading */}
                            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-[#20201E]">
                                        Incoming Bookings
                                    </h3>
                                    <p className="mt-1 text-sm text-[#8A857D]">
                                        Review and manage requests from creators.
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    onClick={fetchBookings}
                                    disabled={loading}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#EAE7E1] bg-white px-4 py-3 text-sm font-semibold text-[#55514B] transition hover:border-[#EA7838] hover:text-[#EA7838] disabled:opacity-50"
                                >
                                    <RefreshCw size={16} />
                                    Refresh
                                </button>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                                    <AlertCircle size={18} className="mt-0.5 shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Booking List Header */}
                            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-[#20201E]">
                                        All Requests
                                    </h4>
                                    <span className="rounded-full bg-[#F8F7F4] px-2.5 py-1 text-xs font-semibold text-[#77756F]">
                                        {bookings.length}
                                    </span>
                                </div>

                                <p className="text-xs text-[#8A857D]">
                                    {pendingCount} awaiting your response
                                </p>
                            </div>

                            {/* Empty State */}
                            {bookings.length === 0 ? (
                                <div className="rounded-2xl border border-dashed border-[#DED9D0] bg-[#FCFBF9] px-5 py-16 text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                                        <CalendarDays size={28} />
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-[#20201E]">
                                        No booking requests yet
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#8A857D]">
                                        When creators book one of your studios,
                                        their requests will appear here.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => setActiveTab("studios")}
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                                    >
                                        <Building2 size={17} />
                                        Manage My Studios
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.map((booking) => (
                                        <article
                                            key={booking._id}
                                            className="group rounded-2xl border border-[#EAE7E1] bg-white p-5 transition duration-300 hover:border-[#F0C5A9] hover:shadow-md hover:shadow-[#20201E]/5 sm:p-6"
                                        >
                                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                                {/* Booking Details */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="mb-3 flex flex-wrap items-center gap-3">
                                                        <h3 className="text-lg font-bold text-[#20201E]">
                                                            {booking.studioTitle || "Studio Booking"}
                                                        </h3>

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${statusStyles[booking.status] ||
                                                                "border-gray-200 bg-gray-50 text-gray-700"
                                                                }`}
                                                        >
                                                            <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                                            {booking.status}
                                                        </span>
                                                    </div>

                                                    <div className="grid gap-3 text-sm text-[#77756F] sm:grid-cols-2">
                                                        <div className="flex min-w-0 items-center gap-2">
                                                            <UserRound
                                                                size={16}
                                                                className="shrink-0 text-[#EA7838]"
                                                            />
                                                            <span className="truncate">
                                                                {booking.creatorName ||
                                                                    booking.creatorEmail ||
                                                                    "Creator"}
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <CalendarDays
                                                                size={16}
                                                                className="shrink-0 text-[#EA7838]"
                                                            />
                                                            <span>{booking.bookingDate}</span>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Clock3
                                                                size={16}
                                                                className="shrink-0 text-[#EA7838]"
                                                            />
                                                            <span>
                                                                {booking.startTime} – {booking.endTime}
                                                                {booking.totalHours
                                                                    ? ` (${booking.totalHours} hours)`
                                                                    : ""}
                                                            </span>
                                                        </div>

                                                        {booking.location && (
                                                            <div className="flex items-center gap-2">
                                                                <MapPin
                                                                    size={16}
                                                                    className="shrink-0 text-[#EA7838]"
                                                                />
                                                                <span className="truncate">
                                                                    {booking.location}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Price and Actions */}
                                                <div className="flex flex-col gap-4 border-t border-[#EEEAE4] pt-4 lg:min-w-[220px] lg:items-end lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                                                    <div className="flex items-center justify-between lg:block lg:text-right">
                                                        <p className="text-xs font-medium text-[#8A857D]">
                                                            Booking Amount
                                                        </p>

                                                        <p className="text-2xl font-bold tracking-tight text-[#20201E] lg:mt-1">
                                                            ৳{Number(
                                                                booking.totalPrice || 0
                                                            ).toLocaleString("en-BD")}
                                                        </p>
                                                    </div>

                                                    {/* Pending Actions */}
                                                    {booking.status === "Pending" && (
                                                        <div className="flex flex-wrap gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setSelectedAction({
                                                                        booking,
                                                                        status: "Confirmed",
                                                                    })
                                                                }
                                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#D96529] sm:flex-none"
                                                            >
                                                                <CheckCircle2 size={16} />
                                                                Confirm
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setSelectedAction({
                                                                        booking,
                                                                        status: "Cancelled",
                                                                    })
                                                                }
                                                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:flex-none"
                                                            >
                                                                <XCircle size={16} />
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    )}

                                                    {/* Confirmed Action */}
                                                    {booking.status === "Confirmed" && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setSelectedAction({
                                                                    booking,
                                                                    status: "Completed",
                                                                })
                                                            }
                                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                            Mark Completed
                                                        </button>
                                                    )}

                                                    {(booking.status === "Completed" ||
                                                        booking.status === "Cancelled") && (
                                                            <p className="text-xs font-medium text-[#A19C94]">
                                                                No action required
                                                            </p>
                                                        )}
                                                </div>
                                            </div>

                                            {/* Booking ID */}
                                            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-[#EEEAE4] pt-4">
                                                <span className="text-[11px] text-[#A19C94]">
                                                    Booking Reference
                                                </span>

                                                <span className="max-w-full truncate font-mono text-[11px] text-[#8A857D]">
                                                    {booking._id}
                                                </span>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            )}

                            {/* Footer Summary */}
                            {bookings.length > 0 && (
                                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F8F7F4] px-5 py-4">
                                    <p className="text-xs text-[#77756F]">
                                        {bookings.length} total booking requests
                                    </p>

                                    <div className="flex flex-wrap gap-4 text-xs font-medium">
                                        <span className="text-amber-700">
                                            {pendingCount} Pending
                                        </span>
                                        <span className="text-emerald-700">
                                            {confirmedCount} Confirmed
                                        </span>
                                        <span className="text-blue-700">
                                            {completedCount} Completed
                                        </span>
                                        <span className="text-red-600">
                                            {cancelledCount} Cancelled
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* My Studios */}
                    {activeTab === "studios" && (
                        <div className="p-4 sm:p-6 lg:p-8">
                            <MyStudiosSection />
                        </div>
                    )}
                </section>

                {/* Bottom Note */}
                <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-[#969188] sm:flex-row sm:items-center">
                    <p>
                        StudioSpace Host Dashboard
                    </p>

                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-1 font-semibold text-[#EA7838] transition hover:text-[#D96529]"
                    >
                        Explore Studios
                        <ArrowUpRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Confirmation Modal */}
            {selectedAction && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#20201E]/50 px-4 py-6 backdrop-blur-sm"
                    onClick={() => {
                        if (!updating) setSelectedAction(null);
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="booking-modal-title"
                        className="w-full max-w-md rounded-3xl border border-[#EAE7E1] bg-white p-6 shadow-2xl sm:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                            {selectedAction.status === "Confirmed" ? (
                                <CheckCircle2 size={27} />
                            ) : selectedAction.status === "Cancelled" ? (
                                <XCircle size={27} />
                            ) : (
                                <CalendarCheck size={27} />
                            )}
                        </div>

                        <h2
                            id="booking-modal-title"
                            className="mt-5 text-xl font-bold text-[#20201E]"
                        >
                            {selectedAction.status === "Confirmed"
                                ? "Confirm this booking?"
                                : selectedAction.status === "Cancelled"
                                    ? "Cancel this booking?"
                                    : "Complete this booking?"}
                        </h2>

                        <p className="mt-3 text-sm leading-6 text-[#77756F]">
                            You are about to change the booking status for{" "}
                            <strong className="text-[#20201E]">
                                {selectedAction.booking.studioTitle || "this studio"}
                            </strong>{" "}
                            to{" "}
                            <strong className="text-[#EA7838]">
                                {selectedAction.status}
                            </strong>
                            . Please review before continuing.
                        </p>

                        <div className="mt-5 rounded-xl bg-[#F8F7F4] p-4">
                            <div className="flex items-center justify-between gap-3">
                                <span className="text-xs text-[#8A857D]">
                                    Booking date
                                </span>
                                <span className="text-sm font-semibold text-[#20201E]">
                                    {selectedAction.booking.bookingDate}
                                </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between gap-3">
                                <span className="text-xs text-[#8A857D]">
                                    Booking amount
                                </span>
                                <span className="text-sm font-bold text-[#20201E]">
                                    ৳{Number(
                                        selectedAction.booking.totalPrice || 0
                                    ).toLocaleString("en-BD")}
                                </span>
                            </div>
                        </div>

                        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedAction(null)}
                                disabled={updating}
                                className="rounded-xl border border-[#EAE7E1] px-5 py-3 text-sm font-semibold text-[#77756F] transition hover:bg-[#F8F7F4] disabled:opacity-50"
                            >
                                Go Back
                            </button>

                            <button
                                type="button"
                                onClick={handleStatusUpdate}
                                disabled={updating}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {updating && (
                                    <Loader2 size={16} className="animate-spin" />
                                )}

                                {updating ? "Updating..." : "Yes, Continue"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
