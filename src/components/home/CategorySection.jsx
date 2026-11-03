
import Link from "next/link";
import {
    Camera,
    Clapperboard,
    Mic2,
    Music2,
    Palette,
    ArrowUpRight,
    ArrowRight,
} from "lucide-react";

const categories = [
    {
        id: "photography",
        number: "01",
        title: "Photography Studios",
        subtitle: "Photo Studios",
        description:
            "Find beautiful spaces, professional lighting and the perfect setting for your next photoshoot.",
        icon: Camera,
        href: "/studios?category=Photography",
    },
    {
        id: "film",
        number: "02",
        title: "Film & Production",
        subtitle: "Sound Stages",
        description:
            "Explore production-ready stages and creative environments for your next film project.",
        icon: Clapperboard,
        href: "/studios?category=Film%20%26%20Production",
    },
    {
        id: "podcast",
        number: "03",
        title: "Podcast Rooms",
        subtitle: "Podcast Studios",
        description:
            "Discover recording rooms with the right atmosphere for conversations and storytelling.",
        icon: Mic2,
        href: "/studios?category=Podcast",
    },
    {
        id: "music",
        number: "04",
        title: "Music Suites",
        subtitle: "Music Studios",
        description:
            "Find dedicated music spaces for recording, rehearsing and creating your next sound.",
        icon: Music2,
        href: "/studios?category=Music%20Studio",
    },
    {
        id: "art",
        number: "05",
        title: "Art Workshops",
        subtitle: "Creative Workshops",
        description:
            "Explore inspiring workspaces where artists can experiment, build and create.",
        icon: Palette,
        href: "/studios?category=Art%20Workshop",
    },
];

export default function CategorySection() {
    return (
        <section className="bg-[#F8F6F2] py-20 sm:py-24">
            <div className="container">

                {/* SECTION INTRO */}
                <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

                    <div className="max-w-2xl">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-px w-9 bg-[#EA7838]" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#EA7838]">
                                Explore Our Spaces
                            </p>
                        </div>

                        <h2 className="text-3xl font-bold leading-tight tracking-tight text-[#20201E] sm:text-4xl lg:text-5xl">
                            One destination.
                            <span className="block text-[#EA7838]">
                                Endless possibilities.
                            </span>
                        </h2>

                        <p className="mt-5 max-w-xl text-sm leading-7 text-[#77756F] sm:text-base">
                            Every creative project needs the right environment.
                            Discover a workspace that matches your vision.
                        </p>
                    </div>

                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 self-start rounded-xl border border-[#E9E6E0] bg-white px-5 py-3.5 text-sm font-semibold text-[#20201E] transition hover:border-[#EA7838] hover:text-[#EA7838] lg:self-auto"
                    >
                        Explore All Studios
                        <ArrowUpRight size={17} />
                    </Link>
                </div>

                {/* CATEGORY GRID */}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">

                    {categories.map((category, index) => {
                        const Icon = category.icon;
                        const isLarge = index === 0 || index === 1;

                        return (
                            <Link
                                key={category.id}
                                href={category.href}
                                className={`group relative flex min-h-[270px] flex-col overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#F0C5A9] hover:shadow-[0_16px_40px_rgba(32,32,30,0.07)] ${isLarge ? "lg:col-span-3" : "lg:col-span-2"
                                    }`}
                            >

                                {/* CARD NUMBER */}
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold tracking-widest text-[#B7B3AC]">
                                        {category.number}
                                    </span>

                                    <ArrowUpRight
                                        size={19}
                                        className="text-[#B7B3AC] transition duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#EA7838]"
                                    />
                                </div>

                                {/* ICON */}
                                <div className="mt-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0E6] text-[#EA7838] transition duration-300 group-hover:bg-[#EA7838] group-hover:text-white">
                                    <Icon size={26} strokeWidth={1.7} />
                                </div>

                                {/* CONTENT */}
                                <div className="mt-6">
                                    <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#EA7838]">
                                        {category.subtitle}
                                    </span>

                                    <h3 className="mt-2 text-xl font-bold tracking-tight text-[#20201E]">
                                        {category.title}
                                    </h3>

                                    <p className="mt-3 max-w-md text-sm leading-6 text-[#77756F]">
                                        {category.description}
                                    </p>
                                </div>

                                {/* BOTTOM LINK */}
                                <div className="mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-[#20201E] transition group-hover:text-[#EA7838]">
                                    Discover Spaces
                                    <ArrowRight size={16} />
                                </div>

                                {/* DECORATIVE BACKGROUND */}
                                <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full border-[18px] border-[#FFF0E6]/70 transition duration-500 group-hover:scale-125" />

                            </Link>
                        );
                    })}

                </div>

                {/* BOTTOM MESSAGE */}
                <div className="mt-10 flex flex-col justify-between gap-4 border-t border-[#E9E6E0] pt-7 sm:flex-row sm:items-center">
                    <p className="text-sm text-[#77756F]">
                        Can't find what you're looking for?
                    </p>

                    <Link
                        href="/studios"
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#EA7838] hover:text-[#D96529]"
                    >
                        Browse every creative space
                        <ArrowRight size={16} />
                    </Link>
                </div>

            </div>
        </section>
    );
}
