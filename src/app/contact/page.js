
import Link from "next/link";
import {
    Mail,
    MapPin,
    MessageCircle,
    ArrowRight,
    Clock,
} from "lucide-react";

const contactOptions = [
    {
        icon: Mail,
        title: "Email Support",
        description: "Reach out to us through email.",
        value: "hello@studiospace.com",
        href: "mailto:hello@studiospace.com",
    },
    {
        icon: MessageCircle,
        title: "General Enquiries",
        description: "Questions about using StudioSpace?",
        value: "Get in touch",
        href: "mailto:hello@studiospace.com",
    },
    {
        icon: Clock,
        title: "Support Availability",
        description: "Send us your questions anytime.",
        value: "Email us anytime",
        href: "mailto:hello@studiospace.com",
    },
];

export default function ContactPage() {
    return (
        <main className="bg-white">
            {/* Hero */}
            <section className="bg-[#F8F6F2] px-4 py-20 text-center sm:py-24">
                <div className="mx-auto max-w-3xl">
                    <span className="rounded-full bg-[#FFF0E6] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#EA7838]">
                        Contact Us
                    </span>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#20201E] sm:text-5xl">
                        Let's Start a
                        <span className="text-[#EA7838]"> Conversation.</span>
                    </h1>

                    <p className="mt-5 text-sm leading-8 text-[#77756F] sm:text-base">
                        Have a question about finding a studio or listing
                        your creative space? We would love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="px-4 py-20">
                <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
                    {/* Contact Information */}
                    <div>
                        <span className="text-sm font-bold uppercase tracking-wider text-[#EA7838]">
                            Get In Touch
                        </span>

                        <h2 className="mt-4 text-3xl font-bold text-[#20201E]">
                            How can we help?
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-7 text-[#77756F]">
                            Whether you are a creator looking for a workspace
                            or a host interested in listing a studio, contact
                            us with your questions.
                        </p>

                        <div className="mt-9 space-y-5">
                            {contactOptions.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <a
                                        key={item.title}
                                        href={item.href}
                                        className="flex gap-4 rounded-2xl border border-[#E9E6E0] p-5 transition hover:border-[#EA7838]"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF0E6] text-[#EA7838]">
                                            <Icon size={22} />
                                        </div>

                                        <div>
                                            <h3 className="font-bold text-[#20201E]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-sm text-[#77756F]">
                                                {item.description}
                                            </p>

                                            <p className="mt-2 text-sm font-semibold text-[#EA7838]">
                                                {item.value}
                                            </p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>

                        <div className="mt-7 flex items-start gap-3 rounded-2xl bg-[#F8F6F2] p-5">
                            <MapPin
                                size={20}
                                className="mt-1 shrink-0 text-[#EA7838]"
                            />

                            <div>
                                <h3 className="font-semibold text-[#20201E]">
                                    Our Platform
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-[#77756F]">
                                    Discover creative workspaces from
                                    wherever your next project takes you.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-3xl border border-[#E9E6E0] bg-white p-7 shadow-sm sm:p-9">
                        <h2 className="text-2xl font-bold text-[#20201E]">
                            Send us a message
                        </h2>

                        <p className="mt-2 text-sm text-[#77756F]">
                            Fill in the details below to open an email.
                        </p>

                        <form
                            action="mailto:hello@studiospace.com"
                            method="post"
                            encType="text/plain"
                            className="mt-8 space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-sm font-semibold text-[#20201E]"
                                >
                                    Your Name
                                </label>

                                <input
                                    id="contact-name"
                                    name="Name"
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                    className="w-full rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] px-4 py-3.5 text-sm outline-none transition focus:border-[#EA7838]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-sm font-semibold text-[#20201E]"
                                >
                                    Email Address
                                </label>

                                <input
                                    id="contact-email"
                                    name="Email"
                                    type="email"
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] px-4 py-3.5 text-sm outline-none transition focus:border-[#EA7838]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-subject"
                                    className="mb-2 block text-sm font-semibold text-[#20201E]"
                                >
                                    Subject
                                </label>

                                <input
                                    id="contact-subject"
                                    name="Subject"
                                    type="text"
                                    placeholder="How can we help?"
                                    required
                                    className="w-full rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] px-4 py-3.5 text-sm outline-none transition focus:border-[#EA7838]"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-sm font-semibold text-[#20201E]"
                                >
                                    Message
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="Message"
                                    rows={5}
                                    placeholder="Write your message here..."
                                    required
                                    className="w-full resize-y rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] px-4 py-3.5 text-sm outline-none transition focus:border-[#EA7838]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                            >
                                Send Message
                                <ArrowRight size={17} />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Help Link */}
            <section className="bg-[#F8F6F2] px-4 py-12 text-center">
                <h2 className="text-xl font-bold text-[#20201E]">
                    Looking for a creative workspace?
                </h2>

                <Link
                    href="/studios"
                    className="mt-5 inline-flex items-center gap-2 font-semibold text-[#EA7838] hover:text-[#D96529]"
                >
                    Explore Studios
                    <ArrowRight size={17} />
                </Link>
            </section>
        </main>
    );
}
