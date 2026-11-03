
import Link from "next/link";
import {
    FileText,
    UserCheck,
    Building2,
    CalendarCheck,
    CreditCard,
    AlertCircle,
    Scale,
} from "lucide-react";

const sections = [
    {
        icon: UserCheck,
        title: "1. Account Responsibilities",
        content: [
            "You must provide accurate information when creating an account.",
            "You are responsible for maintaining the confidentiality of your login credentials.",
            "You are responsible for activity carried out through your account.",
            "Do not impersonate another person or misuse another user's information.",
        ],
    },
    {
        icon: Building2,
        title: "2. Studio Listings",
        content: [
            "Hosts should provide accurate descriptions, images, pricing, and location details.",
            "Hosts are responsible for the information they publish about their studios.",
            "Hosts should keep their listing information up to date.",
            "Do not publish misleading, unauthorized, or inappropriate listing content.",
        ],
    },
    {
        icon: CalendarCheck,
        title: "3. Bookings and Reservations",
        content: [
            "Creators should review studio details and booking information before submitting a reservation.",
            "A new booking may initially have Pending status.",
            "A booking is subject to the applicable confirmation process.",
            "Users should follow the agreed reservation time and communicate changes with the relevant host.",
            "Pending bookings may be cancelled through the platform where that functionality is available.",
        ],
    },
    {
        icon: CreditCard,
        title: "4. Pricing and Payments",
        content: [
            "Studio listings may display hourly rates and security deposits.",
            "Users should review the displayed booking cost before submitting a reservation.",
            "The displayed booking total is calculated from the studio rate and selected duration.",
            "Do not assume that payment processing or refunds are available unless explicitly provided by the platform.",
        ],
    },
    {
        icon: AlertCircle,
        title: "5. Acceptable Use",
        content: [
            "Do not use StudioSpace for unlawful activities.",
            "Do not attempt to access accounts or data without authorization.",
            "Do not interfere with the platform's normal operation.",
            "Respect studio property, equipment, hosts, and other creators.",
        ],
    },
    {
        icon: Scale,
        title: "6. Platform Responsibilities",
        content: [
            "StudioSpace provides a platform for discovering and listing creative workspaces.",
            "Users should independently verify important studio details before making arrangements.",
            "StudioSpace does not guarantee that every listing or user-provided description is accurate.",
            "The platform may be updated, modified, or temporarily unavailable during maintenance.",
        ],
    },
    {
        icon: FileText,
        title: "7. Changes to These Terms",
        content: [
            "These terms may be revised as the platform evolves.",
            "Updated terms will be published on this page.",
            "Continued use of the platform after an update indicates acceptance of the revised terms, to the extent permitted by applicable law.",
        ],
    },
];

export default function TermsPage() {
    return (
        <main className="bg-white">
            {/* Header */}
            <section className="bg-[#F8F6F2] px-4 py-20 text-center">
                <div className="mx-auto max-w-3xl">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                        <FileText size={28} />
                    </div>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#20201E] sm:text-5xl">
                        Terms of Service
                    </h1>

                    <p className="mt-5 text-sm leading-7 text-[#77756F]">
                        Please read these terms before using StudioSpace.
                        They explain the basic rules and responsibilities
                        of using our platform.
                    </p>

                    <p className="mt-4 text-xs text-[#A19D96]">
                        Effective date: November 2, 2026
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="px-4 py-14">
                <div className="mx-auto max-w-4xl rounded-2xl border border-[#E9E6E0] bg-[#F8F6F2] p-6 sm:p-8">
                    <h2 className="text-xl font-bold text-[#20201E]">
                        Welcome to StudioSpace
                    </h2>

                    <p className="mt-3 text-sm leading-8 text-[#77756F]">
                        StudioSpace is a platform designed to connect
                        creative professionals with studio owners and
                        workspace hosts. By accessing or using this
                        platform, you agree to follow these Terms of
                        Service.
                    </p>
                </div>
            </section>

            {/* Terms Sections */}
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
                        <h2 className="text-xl font-bold text-white">
                            Need Clarification?
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-[#B7B3AC]">
                            If you have questions about these terms,
                            please get in touch with the StudioSpace team.
                        </p>

                        <Link
                            href="/contact"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
