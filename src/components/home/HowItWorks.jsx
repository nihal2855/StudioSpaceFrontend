
import Link from "next/link";
import {
    Search,
    Clock,
    CalendarCheck,
    Sparkles,
    ArrowRight,
    CheckCircle2,
} from "lucide-react";

const steps = [
    {
        number: "01",
        label: "DISCOVER",
        title: "Discover Spaces",
        description:
            "Explore creative studios and find the perfect workspace for your project.",
        icon: Search,
    },
    {
        number: "02",
        label: "SELECT",
        title: "Select Shoot Hours",
        description:
            "Choose your preferred date, time and duration according to your needs.",
        icon: Clock,
    },
    {
        number: "03",
        label: "RESERVE",
        title: "Book Instantly",
        description:
            "Review the pricing and send your booking request to the studio host.",
        icon: CalendarCheck,
    },
    {
        number: "04",
        label: "CREATE",
        title: "Create & Produce",
        description:
            "Arrive at your chosen space and bring your creative vision to life.",
        icon: Sparkles,
    },
];

export default function HowItWorks() {
    return (
        <section
            id="how-it-works"
            className="bg-white py-20 sm:py-24"
        >
            <div className="container">

                {/* SECTION HEADING */}
                <div className="mb-16 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                    <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-9 bg-[#EA7838]" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EA7838]">
                                HOW IT WORKS
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#20201E] sm:text-4xl lg:text-5xl">
                            Your next project starts
                            <span className="block text-[#EA7838]">
                                with four simple steps.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[#77756F] sm:text-base">
                            Finding and booking your perfect creative workspace
                            doesn't have to be complicated. Here's how StudioSpace
                            makes it simple.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] px-5 py-4 lg:self-auto">
                        <CheckCircle2
                            size={20}
                            className="text-[#EA7838]"
                        />

                        <div>
                            <p className="text-sm font-bold text-[#20201E]">
                                Simple & Convenient
                            </p>
                            <p className="mt-1 text-xs text-[#77756F]">
                                From search to creation
                            </p>
                        </div>
                    </div>
                </div>

                {/* PROCESS STEPS */}
                <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    {steps.map((step, index) => {
                        const Icon = step.icon;

                        return (
                            <div
                                key={step.number}
                                className="group relative flex flex-col rounded-2xl border border-[#E9E6E0] bg-[#F8F6F2] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F0C5A9] hover:bg-white hover:shadow-[0_16px_40px_rgba(32,32,30,0.06)] sm:p-7"
                            >

                                {/* TOP ROW */}
                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-bold tracking-[0.16em] text-[#AAA69F]">
                                        STEP {step.number}
                                    </span>

                                    <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold tracking-wider text-[#EA7838]">
                                        {step.label}
                                    </span>

                                </div>

                                {/* ICON */}
                                <div className="mt-9 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838] transition duration-300 group-hover:bg-[#EA7838] group-hover:text-white">
                                    <Icon size={26} strokeWidth={1.8} />
                                </div>

                                {/* CONTENT */}
                                <h3 className="mt-7 text-xl font-bold tracking-tight text-[#20201E]">
                                    {step.title}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-7 text-[#77756F]">
                                    {step.description}
                                </p>

                                {/* BOTTOM NUMBER */}
                                <div className="mt-8 flex items-center justify-between border-t border-[#E9E6E0] pt-5">
                                    <span className="text-xs font-medium text-[#AAA69F]">
                                        StudioSpace Process
                                    </span>

                                    <span className="text-sm font-bold text-[#EA7838]">
                                        {step.number}
                                    </span>
                                </div>

                                {/* CONNECTOR */}
                                {index !== steps.length - 1 && (
                                    <div className="absolute -right-4 top-1/2 z-10 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#E9E6E0] bg-white text-[#EA7838] lg:flex">
                                        <ArrowRight size={15} />
                                    </div>
                                )}

                            </div>
                        );
                    })}

                </div>

                {/* BOTTOM CTA */}
                <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-[#F8F6F2] p-7 sm:flex-row sm:p-9">

                    <div>
                        <h3 className="text-xl font-bold text-[#20201E]">
                            Ready to bring your ideas to life?
                        </h3>

                        <p className="mt-2 text-sm text-[#77756F]">
                            Find a space that inspires your next creation.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="inline-flex shrink-0 items-center gap-3 rounded-xl bg-[#EA7838] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#D96529]"
                    >
                        Find Your Studio
                        <ArrowRight size={17} />
                    </Link>

                </div>

            </div>
        </section>
    );
}
