
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    UserRound,
    Mail,
    LockKeyhole,
    Image,
    ArrowRight,
    Eye,
    EyeOff,
    CheckCircle2,
    AlertCircle,
    X,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();

    // Better Auth Session
    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);

    // Toast State
    const [toast, setToast] = useState(null);

    const isSubmitting = loading || googleLoading;

    // Automatically dismiss toast
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    // Redirect logged-in users to homepage
    useEffect(() => {
        if (!isPending && session) {
            router.replace("/");
        }
    }, [session, isPending, router]);

    // Email and Password Registration
    const handleSubmit = async (e) => {
        e.preventDefault();
        setToast(null);

        const validPassword =
            password.length >= 6 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password);

        if (!validPassword) {
            setToast({
                type: "error",
                message:
                    "Password must contain at least 6 characters, one uppercase and one lowercase letter.",
            });
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.signUp.email({
                name: name.trim(),
                email: email.trim(),
                password,
                image: photoUrl.trim(),
            });

            if (error) {
                setToast({
                    type: "error",
                    message: error.message || "Unable to create account.",
                });
                return;
            }

            setToast({
                type: "success",
                message:
                    "Account created successfully! Welcome to StudioSpace.",
            });

            setTimeout(() => {
                router.replace("/");
                router.refresh();
            }, 1200);

        } catch (error) {
            setToast({
                type: "error",
                message:
                    error.message || "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    // Google Registration
    const handleGoogleRegister = async () => {
        setToast(null);
        setGoogleLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });

            if (error) {
                setToast({
                    type: "error",
                    message: error.message || "Google registration failed.",
                });

                setGoogleLoading(false);
            }
        } catch {
            setToast({
                type: "error",
                message:
                    "Unable to register with Google. Please try again.",
            });

            setGoogleLoading(false);
        }
    };

    // Prevent logged-in users from accessing register page
    if (isPending || session) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-[#F8F6F2]">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#EA7838] border-t-transparent" />
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#F8F6F2] px-4 py-12 sm:py-16">

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

            <div className="mx-auto max-w-md">

                {/* Logo */}
                <Link
                    href="/"
                    className="mb-8 flex items-center justify-center gap-3"
                >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EA7838] text-2xl text-white">
                        ✳
                    </div>

                    <span className="text-2xl font-bold text-[#20201E]">
                        Studio<span className="text-[#EA7838]">Space</span>
                    </span>
                </Link>

                <div className="rounded-3xl border border-[#E9E6E0] bg-white p-7 shadow-sm sm:p-9">

                    {/* Heading */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-[#20201E]">
                            Create your account
                        </h1>

                        <p className="mt-3 text-sm text-[#77756F]">
                            Join StudioSpace and discover your creative space.
                        </p>
                    </div>

                    {/* Google Registration */}
                    <button
                        type="button"
                        onClick={handleGoogleRegister}
                        disabled={isSubmitting}
                        className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl border border-[#E9E6E0] bg-white py-3.5 text-sm font-semibold text-[#20201E] transition hover:bg-[#F8F6F2] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {googleLoading ? (
                            <span>Connecting to Google...</span>
                        ) : (
                            <>
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        fill="#EA4335"
                                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                        transform="translate(0 4)"
                                    />
                                    <path
                                        fill="#4285F4"
                                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.22 5.6c4.22-3.9 7.54-9.64 7.54-17.25z"
                                    />
                                    <path
                                        fill="#FBBC05"
                                        d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.76-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.53 2.56 10.78l7.97-6.19z"
                                        transform="translate(0 4)"
                                    />
                                    <path
                                        fill="#34A853"
                                        d="M24 48c6.48 0 11.92-2.13 15.9-5.79l-7.22-5.6c-2 1.35-4.56 2.15-8.68 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48z"
                                        transform="translate(0 -4)"
                                    />
                                </svg>

                                Continue with Google
                            </>
                        )}
                    </button>

                    {/* Divider */}
                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-[#E9E6E0]" />

                        <span className="text-xs text-[#A19D96]">
                            OR REGISTER WITH EMAIL
                        </span>

                        <div className="h-px flex-1 bg-[#E9E6E0]" />
                    </div>

                    {/* Registration Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Full Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                                Full Name
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-4 focus-within:border-[#EA7838]">
                                <UserRound
                                    size={18}
                                    className="text-[#A19D96]"
                                />

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent py-3.5 text-sm outline-none"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                                Email Address
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-4 focus-within:border-[#EA7838]">
                                <Mail
                                    size={18}
                                    className="text-[#A19D96]"
                                />

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent py-3.5 text-sm outline-none"
                                />
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                                Profile Photo URL
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-4 focus-within:border-[#EA7838]">
                                <Image
                                    size={18}
                                    className="text-[#A19D96]"
                                />

                                <input
                                    type="url"
                                    value={photoUrl}
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    placeholder="https://example.com/photo.jpg"
                                    required
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent py-3.5 text-sm outline-none"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-[#20201E]">
                                Password
                            </label>

                            <div className="flex items-center gap-3 rounded-xl border border-[#E9E6E0] px-4 focus-within:border-[#EA7838]">
                                <LockKeyhole
                                    size={18}
                                    className="text-[#A19D96]"
                                />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    required
                                    minLength={6}
                                    disabled={isSubmitting}
                                    className="w-full bg-transparent py-3.5 text-sm outline-none"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="text-[#77756F] hover:text-[#EA7838]"
                                    aria-label="Toggle password visibility"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>

                            <p className="mt-2 text-xs text-[#77756F]">
                                Minimum 6 characters, including uppercase and lowercase letters.
                            </p>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#EA7838] py-4 text-sm font-semibold text-white transition hover:bg-[#D96529] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? "Creating Account..." : "Create Account"}

                            {!loading && <ArrowRight size={17} />}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="mt-7 text-center text-sm text-[#77756F]">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-semibold text-[#EA7838] hover:text-[#D96529]"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Back to Home */}
                <Link
                    href="/"
                    className="mt-7 block text-center text-sm text-[#77756F] hover:text-[#EA7838]"
                >
                    ← Back to Homepage
                </Link>
            </div>
        </main>
    );
}
