
import Link from "next/link";

import {
    Sparkles,
    Mail,
    MapPin,
    Camera,
    Users,
    BriefcaseBusiness,
    AtSign,
    ArrowUpRight,
    X,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { LiaLinkedin } from "react-icons/lia";

export default function Footer() {
    return (
        <footer className="border-t border-[#E9E6E0] bg-[#F8F6F2]">
            <div className="container">

                {/* Main Footer */}
                <div className="grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">

                    {/* Brand Information */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EA7838] text-white">
                                <Sparkles size={23} />
                            </div>

                            <span className="text-2xl font-bold tracking-tight text-[#20201E]">
                                Studio
                                <span className="text-[#EA7838]">
                                    Space
                                </span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-[#77756F]">
                            Find your creative space and bring your ideas
                            to life. Discover inspiring studios, connect
                            with creative professionals, and create
                            something extraordinary.
                        </p>

                        {/* Mission */}
                        <div className="mt-5 max-w-sm">
                            <h3 className="text-sm font-bold text-[#20201E]">
                                Our Mission
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-[#77756F]">
                                Making creative spaces accessible to
                                everyone, empowering creators and
                                connecting them with inspiring places
                                to work.
                            </p>
                        </div>

                        {/* Contact */}
                        <div className="mt-6 space-y-3">
                            <a
                                href="mailto:hello@studiospace.com"
                                className="flex items-center gap-3 text-sm text-[#77756F] transition hover:text-[#EA7838]"
                            >
                                <Mail
                                    size={18}
                                    className="text-[#EA7838]"
                                />
                                hello@studiospace.com
                            </a>

                            <div className="flex items-center gap-3 text-sm text-[#77756F]">
                                <MapPin
                                    size={18}
                                    className="text-[#EA7838]"
                                />
                                Creative Spaces, Everywhere
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="mt-7 flex items-center gap-3">

                            {/* Facebook */}
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9E6E0] bg-white text-[#77756F] transition duration-200 hover:border-[#EA7838] hover:bg-[#EA7838] hover:text-white"
                            >
                                <FaFacebook size={18} />
                            </a>

                            {/* Instagram */}
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9E6E0] bg-white text-[#77756F] transition duration-200 hover:border-[#EA7838] hover:bg-[#EA7838] hover:text-white"
                            >
                                <FaInstagram size={18} />
                            </a>

                            {/* LinkedIn */}
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9E6E0] bg-white text-[#77756F] transition duration-200 hover:border-[#EA7838] hover:bg-[#EA7838] hover:text-white"
                            >
                                <FaLinkedinIn size={18} />
                            </a>

                            {/* X */}
                            <a
                                href="https://x.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E9E6E0] bg-white text-[#77756F] transition duration-200 hover:border-[#EA7838] hover:bg-[#EA7838] hover:text-white"
                            >
                                <FaXTwitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Explore */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold text-[#20201E]">
                            Explore
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link href="/studios" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    All Studios
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/studios?category=Photography" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Photography
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/studios?category=Film%20%26%20Production" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Film & Production
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/studios?category=Podcast" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Podcast
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/studios?category=Music%20Studio" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Music Studio
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/studios?category=Art%20Workshop" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Art Workshop
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold text-[#20201E]">
                            Company
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link href="/about" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    About Us
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/#how-it-works" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    How It Works
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Contact Us
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/add-studio" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Become a Host
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Account */}
                    <div>
                        <h3 className="mb-6 text-sm font-bold text-[#20201E]">
                            Account
                        </h3>

                        <ul className="space-y-4">
                            <li>
                                <Link href="/login" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Login
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/register" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    Register
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/my-bookings" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    My Bookings
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>

                            <li>
                                <Link href="/my-listings" className="group inline-flex items-center gap-1 text-sm text-[#77756F] transition hover:text-[#EA7838]">
                                    My Listings
                                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#E9E6E0] bg-white p-6 sm:flex-row sm:items-center sm:p-8">
                    <div>
                        <h3 className="text-lg font-bold text-[#20201E]">
                            Stay inspired.
                        </h3>

                        <p className="mt-2 text-sm text-[#77756F]">
                            Get creative spaces and updates delivered
                            to your inbox.
                        </p>
                    </div>

                    {/* Newsletter UI - Backend integration pending */}
                    <div className="flex w-full max-w-md gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            aria-label="Email address"
                            disabled
                            className="min-w-0 flex-1 rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] px-4 py-3 text-sm text-[#20201E] outline-none disabled:cursor-not-allowed"
                        />

                        <button
                            type="button"
                            disabled
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#EA7838] px-5 py-3 text-sm font-semibold text-white opacity-60"
                        >
                            Coming Soon
                        </button>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 flex flex-col justify-between gap-5 border-t border-[#E9E6E0] py-7 sm:flex-row sm:items-center">
                    <p className="text-xs text-[#77756F]">
                        © {new Date().getFullYear()} StudioSpace.
                        All rights reserved.
                    </p>

                    <div className="flex flex-wrap gap-6 text-xs text-[#77756F]">
                        <Link
                            href="/privacy"
                            className="transition hover:text-[#EA7838]"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-[#EA7838]"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
