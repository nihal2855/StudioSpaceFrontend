
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
    UserRound,
    Mail,
    LockKeyhole,
    Camera,
    Save,
    Loader2,
    ShieldCheck,
    ArrowLeft,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [savingProfile, setSavingProfile] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    useEffect(() => {
        if (!isPending && !session) {
            router.replace("/login");
        }
    }, [session, isPending, router]);

    useEffect(() => {
        if (session?.user) {
            setName(session.user.name || "");
            setImage(session.user.image || "");
            setEmail(session.user.email || "");
        }
    }, [session]);

    const showMessage = (type, text) => {
        setMessage({ type, text });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!name.trim()) {
            return showMessage("error", "Name is required.");
        }

        try {
            setSavingProfile(true);

            const { error } = await authClient.updateUser({
                name: name.trim(),
                image: image.trim() || null,
            });

            if (error) {
                throw new Error(error.message || "Failed to update profile.");
            }

            showMessage("success", "Profile updated successfully.");
        } catch (error) {
            showMessage("error", error.message);
        } finally {
            setSavingProfile(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        if (!currentPassword || !newPassword || !confirmPassword) {
            return showMessage("error", "Please fill in all password fields.");
        }

        if (newPassword.length < 6) {
            return showMessage(
                "error",
                "New password must be at least 6 characters."
            );
        }

        if (newPassword !== confirmPassword) {
            return showMessage("error", "New passwords do not match.");
        }

        try {
            setSavingPassword(true);

            const { error } = await authClient.changePassword({
                currentPassword,
                newPassword,
                revokeOtherSessions: true,
            });

            if (error) {
                throw new Error(error.message || "Failed to change password.");
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            showMessage("success", "Password changed successfully.");
        } catch (error) {
            showMessage("error", error.message);
        } finally {
            setSavingPassword(false);
        }
    };

    if (isPending || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F6F2]">
                <Loader2 className="w-8 h-8 animate-spin text-[#EA7838]" />
            </div>
        );
    }

    const user = session.user;

    return (
        <main className="min-h-screen bg-[#F8F6F2] py-10 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => router.back()}
                        className="inline-flex items-center gap-2 text-sm text-[#77756F] hover:text-[#EA7838] mb-5 transition"
                    >
                        <ArrowLeft size={17} />
                        Back
                    </button>

                    <h1 className="text-3xl font-bold text-[#20201E]">
                        My Profile
                    </h1>

                    <p className="text-[#77756F] mt-2">
                        Manage your personal information and account security.
                    </p>
                </div>

                {/* Message */}
                {message.text && (
                    <div
                        className={`mb-6 rounded-xl border px-4 py-3 text-sm ${message.type === "success"
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-red-50 border-red-200 text-red-700"
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Sidebar */}
                    <aside className="bg-white rounded-2xl border border-[#E9E6E0] p-6 h-fit">
                        <div className="flex flex-col items-center text-center">

                            <div className="relative mb-4">
                                <div className="w-24 h-24 rounded-full overflow-hidden bg-[#FFF0E6] border-4 border-white shadow-sm flex items-center justify-center">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                    ) : (
                                        <UserRound size={38} className="text-[#EA7838]" />
                                    )}
                                </div>

                                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#EA7838] text-white flex items-center justify-center border-2 border-white">
                                    <Camera size={15} />
                                </div>
                            </div>

                            <h2 className="font-semibold text-lg text-[#20201E]">
                                {user.name || "User"}
                            </h2>

                            <p className="text-sm text-[#77756F] break-all mt-1">
                                {user.email}
                            </p>

                            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-green-700 bg-green-50 px-3 py-2 rounded-full">
                                <ShieldCheck size={15} />
                                Account Active
                            </div>
                        </div>

                        <div className="border-t border-[#E9E6E0] mt-6 pt-5 space-y-3 text-sm">
                            <div className="flex justify-between gap-2">
                                <span className="text-[#77756F]">Account ID</span>
                                <span className="text-[#20201E] font-medium truncate max-w-28">
                                    {user.id}
                                </span>
                            </div>

                            <div className="flex justify-between gap-2">
                                <span className="text-[#77756F]">Email Verified</span>
                                <span className="text-[#20201E] font-medium">
                                    {user.emailVerified ? "Yes" : "No"}
                                </span>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Personal Information */}
                        <section className="bg-white rounded-2xl border border-[#E9E6E0] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#FFF0E6] flex items-center justify-center">
                                    <UserRound className="text-[#EA7838]" size={20} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg text-[#20201E]">
                                        Personal Information
                                    </h2>
                                    <p className="text-xs text-[#77756F]">
                                        Update your profile details.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handleProfileUpdate} className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-[#20201E] mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E9E6E0] outline-none focus:border-[#EA7838] focus:ring-2 focus:ring-[#EA7838]/10 transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#20201E] mb-2">
                                        Email Address
                                    </label>

                                    <div className="relative">
                                        <Mail
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99958D]"
                                        />

                                        <input
                                            type="email"
                                            value={email}
                                            readOnly
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] text-[#77756F] outline-none cursor-not-allowed"
                                        />
                                    </div>

                                    <p className="text-xs text-[#99958D] mt-2">
                                        Email changes require a separate verification setup.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#20201E] mb-2">
                                        Profile Image URL
                                    </label>

                                    <div className="relative">
                                        <Camera
                                            size={18}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#99958D]"
                                        />

                                        <input
                                            type="url"
                                            value={image}
                                            onChange={(e) => setImage(e.target.value)}
                                            placeholder="https://example.com/photo.jpg"
                                            className="w-full pl-11 pr-4 py-3 rounded-xl border border-[#E9E6E0] outline-none focus:border-[#EA7838] focus:ring-2 focus:ring-[#EA7838]/10 transition"
                                        />
                                    </div>

                                    <p className="text-xs text-[#99958D] mt-2">
                                        Enter an image URL to update your profile photo.
                                    </p>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={savingProfile}
                                        className="inline-flex items-center gap-2 bg-[#EA7838] hover:bg-[#D96529] disabled:opacity-60 text-white font-medium px-6 py-3 rounded-xl transition"
                                    >
                                        {savingProfile ? (
                                            <Loader2 size={17} className="animate-spin" />
                                        ) : (
                                            <Save size={17} />
                                        )}
                                        {savingProfile ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </section>

                        {/* Password */}
                        <section className="bg-white rounded-2xl border border-[#E9E6E0] p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#FFF0E6] flex items-center justify-center">
                                    <LockKeyhole className="text-[#EA7838]" size={20} />
                                </div>

                                <div>
                                    <h2 className="font-semibold text-lg text-[#20201E]">
                                        Change Password
                                    </h2>
                                    <p className="text-xs text-[#77756F]">
                                        Keep your account secure.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={handlePasswordUpdate} className="space-y-5">

                                <div>
                                    <label className="block text-sm font-medium text-[#20201E] mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        value={currentPassword}
                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                        placeholder="Enter current password"
                                        autoComplete="current-password"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E9E6E0] outline-none focus:border-[#EA7838] focus:ring-2 focus:ring-[#EA7838]/10 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#20201E] mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password"
                                        autoComplete="new-password"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E9E6E0] outline-none focus:border-[#EA7838] focus:ring-2 focus:ring-[#EA7838]/10 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-[#20201E] mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm new password"
                                        autoComplete="new-password"
                                        className="w-full px-4 py-3 rounded-xl border border-[#E9E6E0] outline-none focus:border-[#EA7838] focus:ring-2 focus:ring-[#EA7838]/10 transition"
                                    />
                                </div>

                                <div className="flex justify-end pt-2">
                                    <button
                                        type="submit"
                                        disabled={savingPassword}
                                        className="inline-flex items-center gap-2 bg-[#20201E] hover:bg-black disabled:opacity-60 text-white font-medium px-6 py-3 rounded-xl transition"
                                    >
                                        {savingPassword ? (
                                            <Loader2 size={17} className="animate-spin" />
                                        ) : (
                                            <LockKeyhole size={17} />
                                        )}
                                        {savingPassword ? "Updating..." : "Update Password"}
                                    </button>
                                </div>
                            </form>
                        </section>

                    </div>
                </div>
            </div>
        </main>
    );
}
