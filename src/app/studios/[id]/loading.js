
export default function StudioDetailsLoading() {
    return (
        <main className="min-h-screen bg-white pb-20 animate-pulse">
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Back Button Skeleton */}
                <div className="mb-7 h-5 w-36 rounded-lg bg-[#E9E6E0]" />

                {/* Studio Heading Skeleton */}
                <div className="mb-8 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="h-7 w-28 rounded-full bg-[#FFF0E6]" />
                        <div className="h-4 w-36 rounded bg-[#E9E6E0]" />
                    </div>

                    <div className="h-9 w-2/3 max-w-lg rounded-lg bg-[#E9E6E0] sm:h-11" />

                    <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full bg-[#FFF0E6]" />
                        <div className="h-4 w-40 rounded bg-[#E9E6E0]" />
                    </div>
                </div>

                {/* Studio Gallery Skeleton */}
                <section className="mb-12">
                    <div className="grid gap-3 overflow-hidden rounded-2xl sm:grid-cols-2">

                        {/* Main Image */}
                        <div className="h-[280px] rounded-xl bg-[#E9E6E0] sm:h-[500px]" />

                        {/* Small Images */}
                        <div className="grid grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map((item) => (
                                <div
                                    key={item}
                                    className="h-[134px] rounded-xl bg-[#E9E6E0] sm:h-[244px]"
                                />
                            ))}
                        </div>

                    </div>
                </section>

                {/* Main Content */}
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">

                    {/* Left Content */}
                    <div className="space-y-10 lg:col-span-2">

                        {/* Host Information */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <div className="flex items-center gap-4">
                                <div className="h-14 w-14 shrink-0 rounded-full bg-[#E9E6E0]" />

                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-20 rounded bg-[#E9E6E0]" />
                                    <div className="h-5 w-36 rounded bg-[#E9E6E0]" />
                                    <div className="h-3 w-24 rounded bg-[#E9E6E0]" />
                                </div>
                            </div>

                            <div className="mt-6 flex flex-wrap gap-6">
                                <div className="h-5 w-36 rounded bg-[#E9E6E0]" />
                                <div className="h-5 w-32 rounded bg-[#E9E6E0]" />
                            </div>
                        </section>

                        {/* Studio Overview */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <div className="mb-5 h-7 w-48 rounded bg-[#E9E6E0]" />

                            <div className="space-y-3">
                                <div className="h-4 w-full rounded bg-[#E9E6E0]" />
                                <div className="h-4 w-full rounded bg-[#E9E6E0]" />
                                <div className="h-4 w-5/6 rounded bg-[#E9E6E0]" />
                                <div className="h-4 w-2/3 rounded bg-[#E9E6E0]" />
                            </div>
                        </section>

                        {/* Amenities */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <div className="mb-6 h-7 w-56 rounded bg-[#E9E6E0]" />

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                                {[1, 2, 3, 4, 5, 6].map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <div className="h-7 w-7 shrink-0 rounded-full bg-[#FFF0E6]" />
                                        <div className="h-4 w-32 rounded bg-[#E9E6E0]" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Booking Information */}
                        <section className="border-b border-[#E9E6E0] pb-8">
                            <div className="mb-6 h-7 w-52 rounded bg-[#E9E6E0]" />

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-xl bg-[#F8F6F2] p-5"
                                    >
                                        <div className="mb-4 h-6 w-6 rounded bg-[#FFF0E6]" />
                                        <div className="mb-3 h-4 w-40 rounded bg-[#E9E6E0]" />
                                        <div className="h-5 w-24 rounded bg-[#E9E6E0]" />
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews Skeleton */}
                        <section>
                            <div className="mb-6 h-7 w-40 rounded bg-[#E9E6E0]" />

                            <div className="space-y-5">
                                {[1, 2].map((item) => (
                                    <div
                                        key={item}
                                        className="rounded-xl border border-[#E9E6E0] p-5"
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-[#E9E6E0]" />
                                            <div className="space-y-2">
                                                <div className="h-4 w-28 rounded bg-[#E9E6E0]" />
                                                <div className="h-3 w-20 rounded bg-[#E9E6E0]" />
                                            </div>
                                        </div>

                                        <div className="mb-2 h-4 w-full rounded bg-[#E9E6E0]" />
                                        <div className="h-4 w-3/4 rounded bg-[#E9E6E0]" />
                                    </div>
                                ))}
                            </div>
                        </section>

                    </div>

                    {/* Right Booking Card Skeleton */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 rounded-2xl border border-[#E9E6E0] bg-white p-6 shadow-sm">

                            {/* Price */}
                            <div className="mb-6 border-b border-[#E9E6E0] pb-6">
                                <div className="mb-3 h-4 w-28 rounded bg-[#E9E6E0]" />
                                <div className="h-9 w-40 rounded bg-[#E9E6E0]" />
                                <div className="mt-3 h-3 w-36 rounded bg-[#E9E6E0]" />
                            </div>

                            {/* Capacity */}
                            <div className="mb-6 flex items-center justify-between">
                                <div className="h-4 w-32 rounded bg-[#E9E6E0]" />
                                <div className="h-4 w-20 rounded bg-[#E9E6E0]" />
                            </div>

                            {/* Booking Form */}
                            <div className="space-y-5">
                                <div>
                                    <div className="mb-2 h-4 w-24 rounded bg-[#E9E6E0]" />
                                    <div className="h-12 w-full rounded-xl bg-[#E9E6E0]" />
                                </div>

                                <div>
                                    <div className="mb-2 h-4 w-28 rounded bg-[#E9E6E0]" />
                                    <div className="h-12 w-full rounded-xl bg-[#E9E6E0]" />
                                </div>

                                <div>
                                    <div className="mb-2 h-4 w-24 rounded bg-[#E9E6E0]" />
                                    <div className="h-12 w-full rounded-xl bg-[#E9E6E0]" />
                                </div>

                                <div className="h-12 w-full rounded-xl bg-[#FFF0E6]" />
                            </div>

                            <div className="mt-5 h-3 w-full rounded bg-[#E9E6E0]" />
                        </div>
                    </aside>

                </div>
            </div>
        </main>
    );
}
