
import Link from "next/link";
import {
    ShieldCheck,
    UserRound,
    Database,
    LockKeyhole,
    Mail,
} from "lucide-react";

const sections = [
    {
        icon: UserRound,
        title: "1. Information We Collect",
        content: [
            "Account information such as your name, email address, and profile photo.",
            "Studio information submitted by hosts, including studio details, images, pricing, and location.",
            "Booking information such as reservation dates, times, studio details, and booking status.",
            "Information you voluntarily provide when contacting us.",
        ],
    },
    {
        icon: Database,
        title: "2. How We Use Your Information",
        content: [
            "To create and manage your StudioSpace account.",
            "To display studio listings and facilitate bookings.",
            "To help hosts manage their studio listings and reservations.",
            "To maintain, improve, and troubleshoot the platform.",
            "To respond to questions and support requests.",
        ],
    },
    {
        icon: LockKeyhole,
        title: "3. Data Protection",
        content: [
            "We use authentication mechanisms to manage access to user accounts.",
            "Account and platform data are stored using the application's configured database services.",
            "Users should keep their login credentials private and use secure passwords.",
        ],
    },
    {
        icon: ShieldCheck,
        title: "4. Information Sharing",
        content: [
            "Some profile and listing information may be visible to other platform users.",
            "Booking details may be shared with the relevant studio host or creator to manage a reservation.",
            "Authentication providers such as Google may process information when you choose social login.",
            "We do not claim that information is never processed by third-party infrastructure providers.",
        ],
    },
    {
        icon: UserRound,
        title: "5. Your Choices",
        content: [
            "You are responsible for keeping your account information accurate.",
            "You should avoid sharing sensitive personal information in public studio descriptions.",
            "For questions about your account information, contact us using the details below.",
        ],
    },
    {
        icon: ShieldCheck,
        title: "6. Changes to This Policy",
        content: [
            "This policy may be updated as StudioSpace develops.",
            "Updates will be reflected on this page with a revised effective date.",
        ],
    },
];

export default function PrivacyPage() {
    return (
        <main className="bg-white">
            {/* Header */}
            <section className="bg-[#F8F6F2] px-4 py-20 text-center">
                <div className="mx-auto max-w-3xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                        <ShieldCheck size={28} />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#20201E] sm:text-5xl">
                        Privacy Policy
                    </h1>

                    <p className="mt-5 text-sm leading-7 text-[#77756F]">
                        Your privacy matters. Learn what information
                        StudioSpace handles and how it is used.
                    </p>

                    <p className="mt-4 text-xs text-[#A19D96]">
                        Effective date: November 2, 2026
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="px-4 py-14">
                <div className="mx-auto max-w-4xl rounded-2xl border border-[#E9E6E0] bg-[#F8F6F2] p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-[#20201E]">
                        About This Policy
                    </h2>

                    <p className="mt-3 text-sm leading-8 text-[#77756F]">
                        This Privacy Policy explains how StudioSpace
                        collects, uses, and handles information when
                        you use our creative workspace platform.
                        By using the platform, you acknowledge this
                        policy. Please review it carefully.
                    </p>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="px-4 pb-20">
                <div className="mx-auto max-w-4xl space-y-5">
                    {sections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <article
                                key={section.title}
                                className="rounded-2xl border border-[#E9E6E0] p-6 sm:p-8"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E6] text-[#EA7838]">
                                        <Icon size={21} />
                                    </div>

                                    <h2 className="text-lg font-bold text-[#20201E]">
                                        {section.title}
                                    </h2>
                                </div>

                                <ul className="mt-5 space-y-3">
                                    {section.content.map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-3 text-sm leading-7 text-[#77756F]"
                                        >
                                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#EA7838]" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </article>
                        );
                    })}

                    {/* Contact */}
                    <div className="rounded-2xl bg-[#20201E] p-7 sm:p-9">
                        <div className="flex items-center gap-3">
                            <Mail className="text-[#EA7838]" size={23} />

                            <h2 className="text-xl font-bold text-white">
                                Privacy Questions?
                            </h2>
                        </div>

                        <p className="mt-3 text-sm leading-7 text-[#B7B3AC]">
                            If you have questions about this policy or
                            your information, contact our team.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-6 inline-flex rounded-xl bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
