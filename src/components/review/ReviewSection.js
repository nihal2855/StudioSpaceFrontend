
"use client";

import { useEffect, useState } from "react";
import {
    getStudioReviewsAPI,
    createStudioReviewAPI,
} from "@/lib/review-api";

const StarRating = ({ rating = 0, size = "text-lg" }) => (
    <div className={`flex items-center gap-1 ${size}`}>
        {[1, 2, 3, 4, 5].map((star) => (
            <span
                key={star}
                className={
                    star <= rating ? "text-amber-400" : "text-gray-300"
                }
            >
                ★
            </span>
        ))}
    </div>
);

export default function ReviewSection({ studioId }) {
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [totalReviews, setTotalReviews] = useState(0);

    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchReviews = async () => {
        try {
            setError("");

            const result = await getStudioReviewsAPI(studioId);

            setReviews(result.data?.reviews || []);
            setAverageRating(result.data?.averageRating || 0);
            setTotalReviews(result.data?.totalReviews || 0);
        } catch (err) {
            setError(err.message || "Unable to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (studioId) fetchReviews();
    }, [studioId]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!comment.trim()) {
            setError("Please write your review.");
            return;
        }

        try {
            setSubmitting(true);

            const result = await createStudioReviewAPI(studioId, {
                rating,
                comment: comment.trim(),
            });

            setSuccess(
                result.message || "Review submitted successfully!"
            );

            setComment("");
            setRating(5);

            await fetchReviews();
        } catch (err) {
            setError(err.message || "Failed to submit review");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className="mt-12 border-t border-[#E9E6E0] pt-10">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#20201E]">
                    Reviews & Ratings
                </h2>
                <p className="mt-2 text-sm text-[#77756F]">
                    See what creators think about this workspace.
                </p>
            </div>

            {/* Rating Summary */}
            <div className="mb-8 rounded-2xl border border-[#E9E6E0] bg-[#F8F6F2] p-6">
                <div className="flex flex-wrap items-center gap-5">
                    <div>
                        <p className="text-4xl font-bold text-[#20201E]">
                            {averageRating.toFixed(1)}
                        </p>

                        <StarRating
                            rating={Math.round(averageRating)}
                        />

                        <p className="mt-1 text-sm text-[#77756F]">
                            {totalReviews}{" "}
                            {totalReviews === 1 ? "Review" : "Reviews"}
                        </p>
                    </div>

                    <div className="h-14 w-px bg-[#E9E6E0]" />

                    <div>
                        <p className="font-semibold text-[#20201E]">
                            {totalReviews > 0
                                ? "Creator Feedback"
                                : "No reviews yet"}
                        </p>

                        <p className="mt-1 text-sm text-[#77756F]">
                            {totalReviews > 0
                                ? "Ratings from completed bookings"
                                : "Be the first to share your experience."}
                        </p>
                    </div>
                </div>
            </div>

            {/* Review Form */}
            <div className="mb-10 rounded-2xl border border-[#E9E6E0] p-6">
                <h3 className="mb-5 text-lg font-semibold text-[#20201E]">
                    Share Your Experience
                </h3>

                <form onSubmit={handleSubmit}>
                    <label className="mb-2 block text-sm font-medium text-[#20201E]">
                        Your Rating
                    </label>

                    <div className="mb-5 flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}
                                className={`text-3xl ${star <= rating
                                        ? "text-amber-400"
                                        : "text-gray-300"
                                    }`}
                                aria-label={`Rate ${star} out of 5`}
                            >
                                ★
                            </button>
                        ))}
                    </div>

                    <label
                        htmlFor="review-comment"
                        className="mb-2 block text-sm font-medium text-[#20201E]"
                    >
                        Your Review
                    </label>

                    <textarea
                        id="review-comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your experience with this studio..."
                        rows={4}
                        maxLength={1000}
                        className="w-full rounded-xl border border-[#E9E6E0] bg-white p-4 text-sm outline-none focus:border-[#EA7838]"
                    />

                    <p className="mt-1 text-right text-xs text-[#77756F]">
                        {comment.length}/1000
                    </p>

                    {error && (
                        <p className="my-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {success && (
                        <p className="my-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">
                            {success}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="mt-3 rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529] disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>

                    <p className="mt-3 text-xs text-[#77756F]">
                        Only creators with a completed booking can submit a review.
                    </p>
                </form>
            </div>

            {/* Review List */}
            <div>
                <h3 className="mb-5 text-lg font-semibold text-[#20201E]">
                    Customer Reviews
                </h3>

                {loading ? (
                    <p className="py-8 text-center text-sm text-[#77756F]">
                        Loading reviews...
                    </p>
                ) : reviews.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-[#E9E6E0] py-12 text-center">
                        <p className="text-lg font-semibold text-[#20201E]">
                            No reviews yet
                        </p>
                        <p className="mt-2 text-sm text-[#77756F]">
                            Completed a booking? Share your experience here.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {reviews.map((review) => (
                            <article
                                key={review._id}
                                className="rounded-2xl border border-[#E9E6E0] p-5"
                            >
                                <div className="flex items-start gap-4">
                                    {review.reviewerImage ? (
                                        <img
                                            src={review.reviewerImage}
                                            alt={review.reviewerName || "Reviewer"}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFF0E6] font-bold text-[#EA7838]">
                                            {review.reviewerName
                                                ?.charAt(0)
                                                ?.toUpperCase() || "U"}
                                        </div>
                                    )}

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <h4 className="font-semibold text-[#20201E]">
                                                {review.reviewerName || "StudioSpace User"}
                                            </h4>

                                            <span className="text-xs text-[#77756F]">
                                                {review.createdAt
                                                    ? new Date(
                                                        review.createdAt
                                                    ).toLocaleDateString()
                                                    : ""}
                                            </span>
                                        </div>

                                        <StarRating
                                            rating={review.rating}
                                            size="text-base"
                                        />

                                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#77756F]">
                                            {review.comment}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
