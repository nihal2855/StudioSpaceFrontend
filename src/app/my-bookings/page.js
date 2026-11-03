
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    CalendarDays,
    Clock3,
    MapPin,
    XCircle,
    ArrowRight,
    AlertCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import {
    getMyBookingsAPI,
    cancelMyBookingAPI,
} from "@/lib/booking-api";

import Loading from "./loading";

const statusStyles = {
    Pending: "bg-amber-50 text-amber-700",
    Confirmed: "bg-green-50 text-green-700",
    Completed: "bg-blue-50 text-blue-700",
    Cancelled: "bg-red-50 text-red-700",
};

export default function MyBookingsPage() {
    const { data: session, isPending: sessionLoading } =
        authClient.useSession();

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [cancelling, setCancelling] = useState(false);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const result = await getMyBookingsAPI();
            setBookings(result.data || []);
        } catch (err) {
            setError(err.message || "Unable to load your bookings.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sessionLoading) return;

        if (session) {
            fetchBookings();
        } else {
            setLoading(false);
        }
    }, [sessionLoading, session]);

    const handleCancelBooking = async () => {
        if (!selectedBooking) return;

        try {
            setCancelling(true);
            setError("");

            await cancelMyBookingAPI(selectedBooking._id);

            setBookings((previousBookings) =>
                previousBookings.map((booking) =>
                    booking._id === selectedBooking._id
                        ? { ...booking, status: "Cancelled" }
                        : booking
                )
            );

            setSelectedBooking(null);
        } catch (err) {
            setError(err.message || "Failed to cancel booking.");
        } finally {
            setCancelling(false);
        }
    };

    // Skeleton loading instead of spinner
    if (sessionLoading || loading) {
        return <Loading />;
    }

    if (!session) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
                <AlertCircle size={42} className="mb-4 text-[#EA7838]" />

                <h1 className="text-2xl font-bold text-[#20201E]">
                    Sign in to view your bookings
                </h1>

                <p className="mt-2 text-sm text-[#77756F]">
                    Please sign in to access your booking history.
                </p>

                <Link
                    href="/login"
                    className="mt-6 rounded-lg bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F6F2] py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <div className="mb-8">
                    <p className="text-sm font-semibold text-[#EA7838]">
                        YOUR ACTIVITY
                    </p>

                    <h1 className="mt-2 text-3xl font-bold text-[#20201E]">
                        My Bookings
                    </h1>

                    <p className="mt-2 text-sm text-[#77756F]">
                        Manage and track all your studio reservations.
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}

                {/* Booking Count */}
                <div className="mb-6 rounded-xl border border-[#E9E6E0] bg-white p-5">
                    <p className="text-sm text-[#77756F]">
                        Total Bookings
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#20201E]">
                        {bookings.length}
                    </p>
                </div>

                {/* Empty State */}
                {bookings.length === 0 ? (
                    <div className="rounded-2xl border border-[#E9E6E0] bg-white px-6 py-16 text-center">
                        <CalendarDays
                            size={42}
                            className="mx-auto mb-4 text-[#EA7838]"
                        />

                        <h2 className="text-xl font-bold text-[#20201E]">
                            No bookings yet
                        </h2>

                        <p className="mt-2 text-sm text-[#77756F]">
                            Explore creative spaces and make your first booking.
                        </p>

                        <Link
                            href="/studios"
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            Explore Studios
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {bookings.map((booking) => (
                            <div
                                key={booking._id}
                                className="overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white p-5 sm:p-6"
                            >
                                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                                    {/* Booking Information */}
                                    <div className="min-w-0 flex-1">
                                        <div className="mb-3 flex flex-wrap items-center gap-3">
                                            <h2 className="text-lg font-bold text-[#20201E]">
                                                {booking.studioTitle || "Studio Booking"}
                                            </h2>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[booking.status] ||
                                                    "bg-gray-100 text-gray-700"
                                                    }`}
                                            >
                                                {booking.status}
                                            </span>
                                        </div>

                                        <div className="space-y-3 text-sm text-[#77756F]">
                                            <div className="flex items-center gap-2">
                                                <CalendarDays
                                                    size={17}
                                                    className="text-[#EA7838]"
                                                />
                                                {booking.bookingDate}
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Clock3
                                                    size={17}
                                                    className="text-[#EA7838]"
                                                />
                                                {booking.startTime} – {booking.endTime}
                                                <span>
                                                    ({booking.totalHours} hours)
                                                </span>
                                            </div>

                                            {booking.hostEmail && (
                                                <div className="flex items-center gap-2">
                                                    <MapPin
                                                        size={17}
                                                        className="text-[#EA7838]"
                                                    />
                                                    Host: {booking.hostEmail}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Price and Action */}
                                    <div className="flex flex-col items-start gap-4 border-t border-[#E9E6E0] pt-4 sm:min-w-[170px] sm:items-end sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                                        <div className="sm:text-right">
                                            <p className="text-xs text-[#77756F]">
                                                Total Price
                                            </p>

                                            <p className="mt-1 text-2xl font-bold text-[#20201E]">
                                                ৳
                                                {Number(
                                                    booking.totalPrice || 0
                                                ).toLocaleString("en-BD")}
                                            </p>
                                        </div>

                                        {booking.status === "Pending" && (
                                            <button
                                                onClick={() =>
                                                    setSelectedBooking(booking)
                                                }
                                                className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                                            >
                                                <XCircle size={16} />
                                                Cancel Booking
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-[#E9E6E0] pt-4 text-xs text-[#77756F]">
                                    Booking ID: {booking._id}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Cancel Confirmation Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <XCircle size={24} />
                        </div>

                        <h2 className="text-xl font-bold text-[#20201E]">
                            Cancel this booking?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-[#77756F]">
                            Are you sure you want to cancel your booking for{" "}
                            <strong>{selectedBooking.studioTitle}</strong>?
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                disabled={cancelling}
                                className="rounded-lg border border-[#E9E6E0] px-4 py-2.5 text-sm font-semibold text-[#77756F] hover:bg-[#F8F6F2]"
                            >
                                Keep Booking
                            </button>

                            <button
                                onClick={handleCancelBooking}
                                disabled={cancelling}
                                className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {cancelling ? "Cancelling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
