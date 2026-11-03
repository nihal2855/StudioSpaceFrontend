
import Link from "next/link";
import {
    ArrowRight,
    Camera,
    Headphones,
    Music,
    Palette,
    Film,
    Target,
    Users,
    Lightbulb,
} from "lucide-react";

const categories = [
    { name: "Photography Studios", icon: Camera },
    { name: "Film & Production", icon: Film },
    { name: "Podcast Rooms", icon: Headphones },
    { name: "Music Studios", icon: Music },
    { name: "Art Workshops", icon: Palette },
];

const values = [
    {
        icon: Target,
        title: "Our Mission",
        description:
            "Make creative spaces accessible to everyone by connecting creators with inspiring studios and workspaces.",
    },
    {
        icon: Users,
        title: "Our Community",
        description:
            "Build meaningful connections between studio owners, independent creators, and creative professionals.",
    },
    {
        icon: Lightbulb,
        title: "Our Vision",
        description:
            "Create a world where finding the right space is never a barrier to bringing creative ideas to life.",
    },
];

export default function AboutPage() {
    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-[#F8F6F2] px-4 py-20 sm:py-28">
                <div className="mx-auto max-w-5xl text-center">
                    <span className="inline-flex rounded-full bg-[#FFF0E6] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#EA7838]">
                        About StudioSpace
                    </span>

                    <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#20201E] sm:text-6xl">
                        A Space for Every
                        <span className="text-[#EA7838]"> Creative Idea.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#77756F]">
                        StudioSpace connects creators with inspiring
                        workspaces. Whether you are a photographer,
                        filmmaker, podcaster, or musician, discover
                        a space where your next idea can become reality.
                    </p>

                    <div className="mt-9 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/studios"
                            className="inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                        >
                            Explore Studios
                            <ArrowRight size={17} />
                        </Link>

                        <Link
                            href="/add-studio"
                            className="rounded-xl border border-[#E9E6E0] bg-white px-6 py-3.5 text-sm font-semibold text-[#20201E] transition hover:border-[#EA7838] hover:text-[#EA7838]"
                        >
                            Become a Host
                        </Link>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="px-4 py-20">
                <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-wider text-[#EA7838]">
                            Our Story
                        </span>

                        <h2 className="mt-4 text-3xl font-bold leading-tight text-[#20201E] sm:text-4xl">
                            Bringing creative people and spaces together.
                        </h2>

                        <p className="mt-6 text-sm leading-8 text-[#77756F]">
                            Finding the right workspace can be challenging.
                            Creators need suitable equipment, comfortable
                            environments, and flexible booking options.
                        </p>

                        <p className="mt-4 text-sm leading-8 text-[#77756F]">
                            StudioSpace is designed to make that process
                            easier. Our platform provides a place to explore
                            creative studios, compare available spaces, and
                            connect with studio hosts.
                        </p>

                        <p className="mt-4 text-sm leading-8 text-[#77756F]">
                            We believe great ideas deserve great spaces.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-[#F8F6F2] p-8 sm:p-12">
                        <div className="grid grid-cols-2 gap-4">
                            {categories.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.name}
                                        className="rounded-2xl border border-[#E9E6E0] bg-white p-5"
                                    >
                                        <Icon
                                            size={25}
                                            className="text-[#EA7838]"
                                        />

                                        <p className="mt-4 text-sm font-semibold text-[#20201E]">
                                            {item.name}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission / Vision / Community */}
            <section className="bg-[#F8F6F2] px-4 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-wider text-[#EA7838]">
                            What Drives Us
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-[#20201E] sm:text-4xl">
                            More Than Just a Workspace
                        </h2>

                        <p className="mt-4 text-sm leading-7 text-[#77756F]">
                            We are building a community around creativity,
                            accessibility, and collaboration.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {values.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-[#E9E6E0] bg-white p-8"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF0E6] text-[#EA7838]">
                                        <Icon size={24} />
                                    </div>

                                    <h3 className="mt-6 text-xl font-bold text-[#20201E]">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-7 text-[#77756F]">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 py-20">
                <div className="mx-auto max-w-5xl rounded-3xl bg-[#20201E] px-6 py-14 text-center sm:px-12">
                    <h2 className="text-3xl font-bold text-white">
                        Ready to Create Something?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#B7B3AC]">
                        Find a workspace that matches your vision and
                        take your next creative project forward.
                    </p>

                    <Link
                        href="/studios"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        Find Your Studio
                        <ArrowRight size={17} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
