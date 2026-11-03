
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Camera,
    Mic2,
    Clapperboard,
    CheckCircle2,
} from "lucide-react";

const slides = [
    {
        id: 1,
        category: "Photography Studios",
        eyebrow: "SPACE FOR YOUR CREATIVITY",
        title: "Find your frame.",
        highlight: "Create your story.",
        description:
            "Discover inspiring photography studios equipped with the space and atmosphere your next shoot deserves.",
        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=85",
        icon: Camera,
        tag: "Photography & Creative Spaces",
    },
    {
        id: 2,
        category: "Podcast & Recording",
        eyebrow: "GIVE YOUR IDEAS A VOICE",
        title: "Make some noise.",
        highlight: "Share your voice.",
        description:
            "Explore professional podcast rooms and music studios designed to turn your ideas into something remarkable.",
        image:
            "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1400&q=85",
        icon: Mic2,
        tag: "Podcast & Music Studios",
    },
    {
        id: 3,
        category: "Film & Production",
        eyebrow: "YOUR NEXT BIG PRODUCTION",
        title: "Think bigger.",
        highlight: "Create without limits.",
        description:
            "Find production-ready spaces, creative environments and film stages to bring your vision to life.",
        image:
            "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1400&q=85",
        icon: Clapperboard,
        tag: "Film & Production Spaces",
    },
];

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeSlide = slides[activeIndex];
    const ActiveIcon = activeSlide.icon;

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % slides.length);
    };

    const previousSlide = () => {
        setActiveIndex(
            (prev) => (prev - 1 + slides.length) % slides.length
        );
    };

    return (
        <section className="overflow-hidden bg-[#F8F6F2]">
            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">

                <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">

                    {/* LEFT: HERO CONTENT */}
                    <div className="max-w-xl">

                        <div className="inline-flex items-center gap-2 rounded-full border border-[#F4D8C5] bg-[#FFF0E6] px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-[#EA7838]" />
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#EA7838]">
                                Your Creative Space Awaits
                            </span>
                        </div>

                        <div className="mt-8">
                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#EA7838]">
                                {activeSlide.eyebrow}
                            </p>

                            <h1
                                key={activeSlide.id}
                                className="mt-5 text-5xl font-bold leading-[1.12] tracking-tight text-[#20201E] sm:text-6xl lg:text-[68px]"
                            >
                                {activeSlide.title}
                                <span className="mt-2 block text-[#EA7838]">
                                    {activeSlide.highlight}
                                </span>
                            </h1>

                            <p
                                key={`description-${activeSlide.id}`}
                                className="mt-6 max-w-lg text-base leading-8 text-[#77756F]"
                            >
                                {activeSlide.description}
                            </p>
                        </div>

                        {/* CTA BUTTONS */}
                        <div className="mt-9 flex flex-col gap-3 sm:flex-row">

                            <Link
                                href="/studios"
                                className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#EA7838] px-7 py-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#D96529]"
                            >
                                Explore Studios
                                <ArrowUpRight size={18} />
                            </Link>

                            <Link
                                href="/add-studio"
                                className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#E9E6E0] bg-white px-7 py-4 text-sm font-semibold text-[#20201E] transition hover:border-[#EA7838] hover:text-[#EA7838]"
                            >
                                Host Your Space
                                <ArrowUpRight size={18} />
                            </Link>

                        </div>

                        {/* TRUST POINTS */}
                        <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
                            {[
                                "Flexible Hourly Booking",
                                "Creative Spaces",
                                "Easy Reservations",
                            ].map((item) => (
                                <div
                                    key={item}
                                    className="flex items-center gap-2 text-xs font-medium text-[#77756F]"
                                >
                                    <CheckCircle2
                                        size={15}
                                        className="text-[#EA7838]"
                                    />
                                    {item}
                                </div>
                            ))}
                        </div>

                        {/* SLIDER CONTROLS */}
                        <div className="mt-12 flex items-center justify-between border-t border-[#E9E6E0] pt-6">

                            <div className="flex items-center gap-3">
                                <span className="text-2xl font-bold text-[#EA7838]">
                                    0{activeIndex + 1}
                                </span>

                                <span className="text-sm text-[#AAA69F]">
                                    / 0{slides.length}
                                </span>

                                <div className="ml-3 flex items-center gap-2">
                                    {slides.map((slide, index) => (
                                        <button
                                            key={slide.id}
                                            type="button"
                                            onClick={() => setActiveIndex(index)}
                                            aria-label={`Go to slide ${index + 1}`}
                                            aria-current={activeIndex === index ? "true" : undefined}
                                            className={`h-2 rounded-full transition-all ${activeIndex === index
                                                    ? "w-9 bg-[#EA7838]"
                                                    : "w-2 bg-[#D8D3CC] hover:bg-[#EA7838]"
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={previousSlide}
                                    aria-label="Previous slide"
                                    className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E9E6E0] bg-white text-[#20201E] transition hover:border-[#EA7838] hover:text-[#EA7838]"
                                >
                                    <ArrowLeft size={18} />
                                </button>

                                <button
                                    type="button"
                                    onClick={nextSlide}
                                    aria-label="Next slide"
                                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EA7838] text-white transition hover:bg-[#D96529]"
                                >
                                    <ArrowRight size={18} />
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* RIGHT: IMAGE SLIDER */}
                    <div className="relative">

                        <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#FFF0E6]" />

                        <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-[#F4D8C5]" />

                        <div className="relative overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_20px_60px_rgba(32,32,30,0.10)]">

                            <div className="relative overflow-hidden rounded-[22px]">

                                <img
                                    key={activeSlide.id}
                                    src={activeSlide.image}
                                    alt={activeSlide.category}
                                    className="h-[390px] w-full object-cover transition duration-500 sm:h-[500px] lg:h-[550px]"
                                />

                                {/* IMAGE OVERLAY */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/5" />

                                {/* CATEGORY LABEL */}
                                <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/90 px-4 py-2 backdrop-blur-md">
                                    <ActiveIcon size={15} className="text-[#EA7838]" />

                                    <span className="text-xs font-semibold text-[#20201E]">
                                        {activeSlide.category}
                                    </span>
                                </div>

                                {/* IMAGE BOTTOM CONTENT */}
                                <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">

                                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                                        Discover your next workspace
                                    </p>

                                    <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                                        {activeSlide.tag}
                                    </h2>

                                    <div className="mt-5 h-1 w-14 rounded-full bg-[#EA7838]" />

                                </div>
                            </div>
                        </div>

                        {/* FLOATING INFO CARD */}
                        <div className="absolute -bottom-5 right-4 hidden rounded-2xl border border-[#E9E6E0] bg-white p-4 shadow-xl sm:block sm:right-[-18px]">

                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF0E6] text-[#EA7838]">
                                    <ActiveIcon size={21} />
                                </div>

                                <div>
                                    <p className="text-xs text-[#77756F]">
                                        Made for creators
                                    </p>

                                    <p className="mt-1 text-sm font-bold text-[#20201E]">
                                        Space to create.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
