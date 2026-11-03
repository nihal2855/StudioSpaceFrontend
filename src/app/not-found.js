
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center bg-[#ffffff] px-4">
            <div className="max-w-lg text-center">

                <p className="text-8xl font-extrabold tracking-tight text-[#EA7838]">
                    404
                </p>

                <h1 className="mt-5 text-3xl font-bold text-[#20201E]">
                    Page Not Found
                </h1>

                <p className="mt-3 text-sm leading-6 text-[#77756F]">
                    Sorry! The page you are looking for doesn't exist
                    or may have been moved.
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EA7838] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#D96529]"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <Link
                        href="/studios"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E9E6E0] bg-white px-6 py-3 text-sm font-semibold text-[#20201E] transition hover:bg-[#F8F6F2]"
                    >
                        <Search size={18} />
                        Explore Studios
                    </Link>
                </div>

            </div>
        </main>
    );
}
