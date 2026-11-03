
"use client";

import { useState } from "react";
import Link from "next/link";
import { CalendarDays, Clock3, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { createBookingAPI } from "@/lib/booking-api";

export default function BookingForm({ studioId, hourlyRate, hostId }) {
    const { data: session, isPending: sessionLoading } = authClient.useSession();

    const [bookingDate, setBookingDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const getLocalDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    const duration =
        startTime && endTime
            ? (() => {
                const [sh, sm] = startTime.split(":").map(Number);
                const [eh, em] = endTime.split(":").map(Number);

                const difference = (eh * 60 + em) - (sh * 60 + sm);

                return difference > 0 ? difference / 60 : 0;
            })()
            : 0;

    const totalPrice = duration * Number(hourlyRate || 0);

    const handleBooking = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!bookingDate || !startTime || !endTime) {
            setError("Please complete all booking fields.");
            return;
        }

        if (bookingDate < getLocalDate()) {
            setError("You cannot book a past date.");
            return;
        }

        if (duration <= 0) {
            setError("End time must be later than start time.");
            return;
        }

        try {
            setLoading(true);

            const result = await createBookingAPI({
                studioId,
                bookingDate,
                startTime,
                endTime,
            });

            setSuccess(
                result.message || "Booking request submitted successfully!"
            );

            setBookingDate("");
            setStartTime("");
            setEndTime("");

        } catch (err) {
            setError(err.message || "Failed to submit booking request.");
        } finally {
            setLoading(false);
        }
    };

    if (sessionLoading) {
        return (
            <div className="mt-6 flex justify-center py-8">
                <Loader2 className="animate-spin text-[#EA7838]" size={28} />
            </div>
        );
    }

    if (!session) {
        return (
            <>
                <Link
                    href="/login"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                >
                    <CalendarDays size={17} />
                    Sign in to Book
                    <ArrowRight size={17} />
                </Link>

                <p className="mt-4 text-center text-xs text-[#77756F]">
                    Sign in to continue with your booking.
                </p>
            </>
        );
    }

    if (session.user?.id === hostId) {
        return (
            <div className="mt-6 rounded-xl bg-[#F8F6F2] p-4 text-center">
                <p className="text-sm text-[#77756F]">
                    You cannot book your own studio.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleBooking} className="mt-6 space-y-5">

            {/* Booking Date */}
            <div>
                <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                    Booking Date
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-3">
                    <CalendarDays size={19} className="shrink-0 text-[#EA7838]" />

                    <input
                        type="date"
                        required
                        min={getLocalDate()}
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-transparent py-3 text-sm text-[#20201E] outline-none"
                    />
                </div>
            </div>

            {/* Start Time */}
            <div>
                <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                    Start Time
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-3">
                    <Clock3 size={19} className="shrink-0 text-[#EA7838]" />

                    <input
                        type="time"
                        required
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="w-full bg-transparent py-3 text-sm text-[#20201E] outline-none"
                    />
                </div>
            </div>

            {/* End Time */}
            <div>
                <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                    End Time
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-3">
                    <Clock3 size={19} className="shrink-0 text-[#EA7838]" />

                    <input
                        type="time"
                        required
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="w-full bg-transparent py-3 text-sm text-[#20201E] outline-none"
                    />
                </div>
            </div>

            {/* Price Calculation */}
            {duration > 0 && (
                <div className="rounded-xl bg-[#F8F6F2] p-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-[#77756F]">
                            Duration
                        </span>

                        <span className="font-semibold text-[#20201E]">
                            {duration} {duration === 1 ? "hour" : "hours"}
                        </span>
                    </div>

                    <div className="mt-3 flex justify-between text-sm">
                        <span className="text-[#77756F]">
                            Hourly Rate
                        </span>

                        <span className="font-semibold text-[#20201E]">
                            ৳{Number(hourlyRate).toLocaleString("en-BD")}
                        </span>
                    </div>

                    <div className="my-3 border-t border-[#E9E6E0]" />

                    <div className="flex justify-between">
                        <span className="text-sm font-bold text-[#20201E]">
                            Estimated Total
                        </span>

                        <span className="text-lg font-bold text-[#EA7838]">
                            ৳{totalPrice.toLocaleString("en-BD")}
                        </span>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Success Message */}
            {success && (
                <div className="flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                    <CheckCircle2 size={19} className="shrink-0" />
                    <span>{success}</span>
                </div>
            )}

            {/* Submit */}
            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#D96529] disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading ? (
                    <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                    </>
                ) : (
                    <>
                        <CalendarDays size={17} />
                        Book Now
                        <ArrowRight size={17} />
                    </>
                )}
            </button>

            <p className="text-center text-xs text-[#77756F]">
                Your booking request will be submitted for host approval.
            </p>
        </form>
    );
}
