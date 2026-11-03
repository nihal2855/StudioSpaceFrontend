
"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import {
    Aperture,
    Menu,
    X,
    ArrowUpRight,
    LogOut,
    LayoutDashboard,
    CalendarDays,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    User,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { authClient } from "@/lib/auth-client";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Explore Studios", href: "/studios" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About Us", href: "/about" },
];
const userNavLinks = [
    {
        name: "Profile",
        href: "/profile",
        icon: User,
    },
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "My Bookings",
        href: "/my-bookings",
        icon: CalendarDays,
    },
];

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [toast, setToast] = useState(null);
    const [activeHash, setActiveHash] = useState("");

    const dropdownRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    // Track URL hash for anchor navigation
    useEffect(() => {
        const updateHash = () => {
            setActiveHash(window.location.hash);
        };

        updateHash();

        window.addEventListener("hashchange", updateHash);
        window.addEventListener("popstate", updateHash);

        return () => {
            window.removeEventListener("hashchange", updateHash);
            window.removeEventListener("popstate", updateHash);
        };
    }, []);

    // Check active navigation path
    const isActiveLink = (href) => {
        if (href.startsWith("/#")) {
            return (
                pathname === "/" &&
                activeHash === href.substring(1)
            );
        }

        if (href === "/") {
            return pathname === "/";
        }

        return pathname === href || pathname.startsWith(`${href}/`);
    };

    // Active link styles
    const getNavLinkClass = (href) => {
        const active = isActiveLink(href);

        return `relative text-sm font-medium transition-colors duration-200 ${active
            ? "text-[#EA7838]"
            : "text-[#77756F] hover:text-[#EA7838]"
            }`;
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Auto dismiss toast
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, 3500);

        return () => clearTimeout(timer);
    }, [toast]);

    // Logout handler
    const handleLogout = async () => {
        try {
            setLoggingOut(true);

            await authClient.signOut();

            setDropdownOpen(false);
            setMenuOpen(false);

            setToast({
                type: "success",
                message: "Logged out successfully!",
            });

            setTimeout(() => {
                router.push("/login");
                router.refresh();
            }, 1200);
        } catch (error) {
            console.error("Logout failed:", error);

            setToast({
                type: "error",
                message: "Logout failed. Please try again.",
            });
        } finally {
            setLoggingOut(false);
        }
    };

    // User information component
    const UserInfo = ({ mobile = false }) => (
        <div className="flex items-center gap-2">
            {user?.image ? (
                <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-9 w-9 rounded-full object-cover"
                />
            ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF0E6] font-semibold text-[#EA7838]">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
            )}

            <span
                className={`max-w-[120px] truncate text-sm font-semibold ${mobile ? "text-[#20201E]" : "text-[#20201E]"
                    }`}
            >
                {user?.name || "User"}
            </span>
        </div>
    );

    return (
        <>
            {/* Toast Notification */}
            {toast && (
                <div className="fixed right-5 top-24 z-[100] animate-in slide-in-from-right-5 duration-300">
                    <div
                        role={toast.type === "error" ? "alert" : "status"}
                        className={`flex min-w-[300px] items-center gap-3 rounded-xl border bg-white p-4 shadow-xl ${toast.type === "success"
                            ? "border-green-200"
                            : "border-red-200"
                            }`}
                    >
                        {toast.type === "success" ? (
                            <CheckCircle2
                                size={22}
                                className="shrink-0 text-green-600"
                            />
                        ) : (
                            <AlertCircle
                                size={22}
                                className="shrink-0 text-red-500"
                            />
                        )}

                        <p className="flex-1 text-sm font-medium text-[#20201E]">
                            {toast.message}
                        </p>

                        <button
                            type="button"
                            onClick={() => setToast(null)}
                            className="rounded-lg p-1 text-[#77756F] transition hover:bg-[#F8F6F2]"
                            aria-label="Close notification"
                        >
                            <X size={17} />
                        </button>
                    </div>
                </div>
            )}

            <header className="sticky top-0 z-50 border-b border-[#E9E6E0] bg-white/95 backdrop-blur-md">
                <nav className="container flex h-[76px] items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EA7838] text-white">
                            <Aperture size={23} />
                        </div>

                        <span className="text-xl font-bold tracking-tight">
                            Studio<span className="text-[#EA7838]">Space</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-7 md:flex">
                        {navLinks.map((link) => {
                            const active = isActiveLink(link.href);

                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    aria-current={active ? "page" : undefined}
                                    className={`${getNavLinkClass(link.href)} ${active
                                        ? "after:absolute after:-bottom-[29px] after:left-0 after:h-[3px] after:w-full after:rounded-full after:bg-[#EA7838]"
                                        : ""
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-3 md:flex">
                        {isPending ? (
                            <div className="h-9 w-24 animate-pulse rounded-lg bg-[#F8F6F2]" />
                        ) : user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-[#F8F6F2]"
                                    aria-expanded={dropdownOpen}
                                    aria-haspopup="true"
                                >
                                    <UserInfo />

                                    <ChevronDown
                                        size={16}
                                        className={`text-[#77756F] transition-transform ${dropdownOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {/* User Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full z-50 mt-3 w-56 overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white p-2 shadow-xl">
                                        <div className="border-b border-[#E9E6E0] px-3 py-3">
                                            <p className="truncate text-sm font-semibold text-[#20201E]">
                                                {user.name}
                                            </p>

                                            <p className="mt-1 truncate text-xs text-[#77756F]">
                                                {user.email}
                                            </p>
                                        </div>

                                        <div className="py-2">
                                            {userNavLinks.map((link) => {
                                                const Icon = link.icon;
                                                const active = isActiveLink(link.href);

                                                return (
                                                    <Link
                                                        key={link.name}
                                                        href={link.href}
                                                        aria-current={active ? "page" : undefined}
                                                        onClick={() => setDropdownOpen(false)}
                                                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${active
                                                            ? "bg-[#FFF0E6] text-[#EA7838]"
                                                            : "text-[#55534F] hover:bg-[#FFF0E6] hover:text-[#EA7838]"
                                                            }`}
                                                    >
                                                        <Icon size={17} />
                                                        {link.name}
                                                    </Link>
                                                );
                                            })}
                                        </div>

                                        <div className="border-t border-[#E9E6E0] pt-2">
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                disabled={loggingOut}
                                                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 disabled:opacity-50"
                                            >
                                                <LogOut size={17} />
                                                {loggingOut
                                                    ? "Logging out..."
                                                    : "Logout"}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className={`px-3 py-2 text-sm font-semibold transition ${pathname === "/login"
                                        ? "text-[#EA7838]"
                                        : "text-[#20201E] hover:text-[#EA7838]"
                                        }`}
                                >
                                    Login
                                </Link>

                                <Link href="/register">
                                    <Button className="rounded-xl">
                                        Get Started
                                        <ArrowUpRight size={16} />
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="rounded-lg p-2 hover:bg-[#F8F6F2] md:hidden"
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        {menuOpen ? <X /> : <Menu />}
                    </button>
                </nav>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <div className="border-t border-[#E9E6E0] bg-white p-5 md:hidden">
                        <div className="container flex flex-col gap-5">

                            {/* Public Links */}
                            {navLinks.map((link) => {
                                const active = isActiveLink(link.href);

                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        aria-current={active ? "page" : undefined}
                                        onClick={() => setMenuOpen(false)}
                                        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${active
                                            ? "bg-[#FFF0E6] text-[#EA7838]"
                                            : "text-[#20201E] hover:bg-[#F8F6F2] hover:text-[#EA7838]"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}

                            <div className="border-t border-[#E9E6E0] pt-5">
                                {isPending ? (
                                    <div className="h-9 w-24 animate-pulse rounded-lg bg-[#F8F6F2]" />
                                ) : user ? (
                                    <div className="flex flex-col gap-4">

                                        {/* Mobile User Dropdown Header */}
                                        <div className="flex items-center justify-between">
                                            <UserInfo mobile />

                                            <button
                                                type="button"
                                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                                className="rounded-lg p-2 hover:bg-[#F8F6F2]"
                                                aria-expanded={dropdownOpen}
                                                aria-label="Toggle user menu"
                                            >
                                                <ChevronDown
                                                    size={18}
                                                    className={`transition-transform ${dropdownOpen
                                                        ? "rotate-180"
                                                        : ""
                                                        }`}
                                                />
                                            </button>
                                        </div>

                                        {/* Mobile Dropdown Links */}
                                        {dropdownOpen && (
                                            <div className="rounded-xl border border-[#E9E6E0] bg-[#F8F6F2] p-2">
                                                {userNavLinks.map((link) => {
                                                    const Icon = link.icon;
                                                    const active = isActiveLink(link.href);

                                                    return (
                                                        <Link
                                                            key={link.name}
                                                            href={link.href}
                                                            aria-current={active ? "page" : undefined}
                                                            onClick={() => {
                                                                setMenuOpen(false);
                                                                setDropdownOpen(false);
                                                            }}
                                                            className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${active
                                                                ? "bg-white text-[#EA7838]"
                                                                : "text-[#55534F] hover:bg-white hover:text-[#EA7838]"
                                                                }`}
                                                        >
                                                            <Icon size={17} />
                                                            {link.name}
                                                        </Link>
                                                    );
                                                })}

                                                <button
                                                    type="button"
                                                    onClick={handleLogout}
                                                    disabled={loggingOut}
                                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold text-red-500 hover:bg-white disabled:opacity-50"
                                                >
                                                    <LogOut size={17} />
                                                    {loggingOut
                                                        ? "Logging out..."
                                                        : "Logout"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        <Link
                                            href="/login"
                                            onClick={() => setMenuOpen(false)}
                                            className={`text-sm font-semibold ${pathname === "/login"
                                                ? "text-[#EA7838]"
                                                : "text-[#20201E]"
                                                }`}
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            href="/register"
                                            onClick={() => setMenuOpen(false)}
                                            className={`text-sm font-semibold ${pathname === "/register"
                                                ? "text-[#EA7838]"
                                                : "text-[#EA7838]"
                                                }`}
                                        >
                                            Get Started
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
}
