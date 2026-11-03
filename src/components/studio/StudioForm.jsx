
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    CheckCircle2,
    AlertCircle,
    X,
} from "lucide-react";

import {
    createStudioAPI,
    updateStudioAPI,
} from "@/lib/studio-api";

const categories = [
    "Photography",
    "Film & Production",
    "Podcast",
    "Music Studio",
    "Art Workshop",
    "Video Production",
];

const initialFormData = {
    title: "",
    category: "",
    hourlyRate: "",
    securityDeposit: "0",
    maxCapacity: "1",
    location: "",
    imageUrl: "",
    amenities: "",
    overview: "",
};

export default function StudioForm({
    initialStudio = null,
    mode = "create",
}) {
    const router = useRouter();

    const isEditMode = mode === "edit";

    const [formData, setFormData] = useState(initialFormData);
    const [loading, setLoading] = useState(false);

    // Toast State
    const [toast, setToast] = useState(null);

    // Automatically dismiss toast
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    // Load existing studio information in Edit Mode
    useEffect(() => {
        if (isEditMode && initialStudio) {
            setFormData({
                title: initialStudio.title || "",
                category: initialStudio.category || "",
                hourlyRate: String(initialStudio.hourlyRate ?? ""),
                securityDeposit: String(initialStudio.securityDeposit ?? 0),
                maxCapacity: String(initialStudio.maxCapacity ?? 1),
                location: initialStudio.location || "",
                imageUrl: initialStudio.imageUrl || "",
                amenities: Array.isArray(initialStudio.amenities)
                    ? initialStudio.amenities.join(", ")
                    : "",
                overview: initialStudio.overview || "",
            });
        }
    }, [initialStudio, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit Form
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setToast(null);

        try {
            const studioData = {
                ...formData,
                hourlyRate: Number(formData.hourlyRate),
                securityDeposit: Number(formData.securityDeposit),
                maxCapacity: Number(formData.maxCapacity),
                amenities: formData.amenities
                    .split(",")
                    .map((item) => item.trim())
                    .filter(Boolean),
            };

            let result;

            if (isEditMode) {
                if (!initialStudio?._id) {
                    throw new Error("Studio ID is missing.");
                }

                result = await updateStudioAPI(
                    initialStudio._id,
                    studioData
                );

                setToast({
                    type: "success",
                    message: "Studio updated successfully!",
                });
            } else {
                result = await createStudioAPI(studioData);

                setToast({
                    type: "success",
                    message: "Studio created successfully!",
                });
            }

            console.log("Studio saved:", result.data);

            setTimeout(() => {
                if (isEditMode) {
                    router.push("/dashboard");
                } else {
                    router.push("/my-listings");
                }

                router.refresh();
            }, 1200);

        } catch (err) {
            setToast({
                type: "error",
                message:
                    err.message || "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    const inputClass =
        "mt-2 w-full rounded-xl border border-[#E9E6E0] bg-white px-4 py-3 text-sm text-[#20201E] outline-none transition placeholder:text-[#AAA69F] focus:border-[#EA7838]";

    const labelClass = "text-sm font-semibold text-[#20201E]";

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <div
                    role={toast.type === "error" ? "alert" : "status"}
                    className={`fixed right-4 top-5 z-[100] flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-lg animate-in slide-in-from-top-3 fade-in duration-300 ${toast.type === "success"
                            ? "border-green-200"
                            : "border-red-200"
                        }`}
                >
                    <div className="shrink-0">
                        {toast.type === "success" ? (
                            <CheckCircle2
                                size={22}
                                className="text-green-600"
                            />
                        ) : (
                            <AlertCircle
                                size={22}
                                className="text-red-500"
                            />
                        )}
                    </div>

                    <div className="min-w-0 flex-1">
                        <p
                            className={`text-sm font-semibold ${toast.type === "success"
                                    ? "text-green-700"
                                    : "text-red-700"
                                }`}
                        >
                            {toast.type === "success"
                                ? "Success"
                                : "Something went wrong"}
                        </p>

                        <p className="mt-1 break-words text-sm text-[#77756F]">
                            {toast.message}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setToast(null)}
                        className="shrink-0 text-[#A19D96] transition hover:text-[#20201E]"
                        aria-label="Close notification"
                    >
                        <X size={18} />
                    </button>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Basic Information */}
                <section className="rounded-2xl border border-[#E9E6E0] bg-white p-6">
                    <h2 className="text-xl font-bold text-[#20201E]">
                        Basic Information
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label className={labelClass}>
                                Studio Title *
                            </label>

                            <input
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Premium Photography Studio"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Category *
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            >
                                <option value="">Select a category</option>

                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className={labelClass}>
                                Detailed Overview *
                            </label>

                            <textarea
                                name="overview"
                                value={formData.overview}
                                onChange={handleChange}
                                placeholder="Describe your studio, facilities and what makes it special..."
                                rows={5}
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* Pricing and Capacity */}
                <section className="rounded-2xl border border-[#E9E6E0] bg-white p-6">
                    <h2 className="text-xl font-bold text-[#20201E]">
                        Pricing & Capacity
                    </h2>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        <div>
                            <label className={labelClass}>
                                Hourly Rate (৳) *
                            </label>

                            <input
                                type="number"
                                name="hourlyRate"
                                value={formData.hourlyRate}
                                onChange={handleChange}
                                placeholder="1000"
                                min="1"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Security Deposit (৳)
                            </label>

                            <input
                                type="number"
                                name="securityDeposit"
                                value={formData.securityDeposit}
                                onChange={handleChange}
                                placeholder="0"
                                min="0"
                                className={inputClass}
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Maximum Capacity *
                            </label>

                            <input
                                type="number"
                                name="maxCapacity"
                                value={formData.maxCapacity}
                                onChange={handleChange}
                                min="1"
                                className={inputClass}
                                required
                            />
                        </div>
                    </div>
                </section>

                {/* Location and Image */}
                <section className="rounded-2xl border border-[#E9E6E0] bg-white p-6">
                    <h2 className="text-xl font-bold text-[#20201E]">
                        Location & Images
                    </h2>

                    <div className="mt-6 space-y-5">
                        <div>
                            <label className={labelClass}>
                                Studio Location *
                            </label>

                            <input
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Dhanmondi, Dhaka"
                                className={inputClass}
                                required
                            />
                        </div>

                        <div>
                            <label className={labelClass}>
                                Studio Image URL *
                            </label>

                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                placeholder="https://example.com/studio-image.jpg"
                                className={inputClass}
                                required
                            />

                            <p className="mt-2 text-xs text-[#77756F]">
                                Paste an image URL. Image upload will be added in a later step.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Amenities */}
                <section className="rounded-2xl border border-[#E9E6E0] bg-white p-6">
                    <h2 className="text-xl font-bold text-[#20201E]">
                        Amenities
                    </h2>

                    <div className="mt-5">
                        <label className={labelClass}>
                            Available Amenities
                        </label>

                        <input
                            name="amenities"
                            value={formData.amenities}
                            onChange={handleChange}
                            placeholder="WiFi, Air Conditioning, Lighting"
                            className={inputClass}
                        />

                        <p className="mt-2 text-xs text-[#77756F]">
                            Separate each amenity with a comma.
                        </p>
                    </div>
                </section>

                {/* Submit Buttons */}
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="rounded-xl border border-[#E9E6E0] px-6 py-3 text-sm font-semibold text-[#20201E] transition hover:bg-[#F8F6F2]"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="rounded-xl bg-[#EA7838] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading
                            ? isEditMode
                                ? "Saving Changes..."
                                : "Creating Studio..."
                            : isEditMode
                                ? "Save Changes"
                                : "Publish Studio"}
                    </button>
                </div>
            </form>
        </>
    );
}
