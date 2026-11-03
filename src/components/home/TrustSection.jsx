
import Link from "next/link";
import {
    ShieldCheck,
    Headset,
    BadgeCheck,
    CalendarCheck,
    ArrowRight,
    LockKeyhole,
    Camera,
} from "lucide-react";

const creatorBenefits = [
    {
        icon: ShieldCheck,
        title: "Secure Booking",
        description:
            "Book creative spaces through a clear and organized booking process.",
    },
    {
        icon: BadgeCheck,
        title: "Verified Information",
        description:
            "Check studio pricing, amenities, capacity and location before booking.",
    },
    {
        icon: Headset,
        title: "Creator Support",
        description:
            "Get assistance whenever you need help with your booking experience.",
    },
];

const hostBenefits = [
    {
        icon: CalendarCheck,
        title: "Booking Management",
        description:
            "Manage incoming requests and keep track of your studio reservations.",
    },
    {
        icon: Camera,
        title: "Showcase Your Space",
        description:
            "Display your studio with photos, facilities, pricing and descriptions.",
    },
    {
        icon: LockKeyhole,
        title: "Host Protection",
        description:
            "Keep your studio information and booking activities organized.",
    },
];

function BenefitCard({ benefit, dark = false }) {
    const Icon = benefit.icon;

    return (
        <div className="flex gap-4">
            <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${dark
                        ? "bg-white/10 text-[#F4A477]"
                        : "bg-[#FFF0E6] text-[#EA7838]"
                    }`}
            >
                <Icon size={21} strokeWidth={1.8} />
            </div>

            <div>
                <h3
                    className={`text-base font-bold ${dark ? "text-white" : "text-[#20201E]"
                        }`}
                >
                    {benefit.title}
                </h3>

                <p
                    className={`mt-2 text-sm leading-6 ${dark ? "text-[#B7B3AC]" : "text-[#77756F]"
                        }`}
                >
                    {benefit.description}
                </p>
            </div>
        </div>
    );
}

export default function TrustSection() {
    return (
        <section className="bg-[#F8F6F2] py-20 sm:py-24">
            <div className="container">
                {/* Section Heading */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#EA7838]">
                        BUILT FOR BOTH SIDES
                    </p>

                    <h2 className="section-heading">
                        A better experience for everyone.
                    </h2>

                    <p className="section-description mt-4">
                        StudioSpace brings creators and studio owners together with a
                        simple, organized and reliable experience.
                    </p>
                </div>

                {/* Benefit Panels */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Creator Panel */}
                    <div className="rounded-3xl border border-[#E9E6E0] bg-white p-7 sm:p-9">
                        <div className="mb-9 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838]">
                                <ShieldCheck size={25} />
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#EA7838]">
                                    FOR CREATORS
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-[#20201E]">
                                    Create with confidence.
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-7">
                            {creatorBenefits.map((benefit) => (
                                <BenefitCard key={benefit.title} benefit={benefit} />
                            ))}
                        </div>

                        <Link
                            href="/studios"
                            className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-[#EA7838] transition hover:text-[#D96529]"
                        >
                            Explore Studios
                            <ArrowRight size={17} />
                        </Link>
                    </div>

                    {/* Host Panel */}
                    <div className="rounded-3xl bg-[#20201E] p-7 sm:p-9">
                        <div className="mb-9 flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EA7838] text-white">
                                <BadgeCheck size={25} />
                            </div>

                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#F4A477]">
                                    FOR HOSTS
                                </p>

                                <h3 className="mt-1 text-xl font-bold text-white">
                                    Your space, your opportunity.
                                </h3>
                            </div>
                        </div>

                        <div className="space-y-7">
                            {hostBenefits.map((benefit) => (
                                <BenefitCard
                                    key={benefit.title}
                                    benefit={benefit}
                                    dark
                                />
                            ))}
                        </div>

                        <Link
                            href="/add-studio"
                            className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            Become a Host
                            <ArrowRight size={17} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
