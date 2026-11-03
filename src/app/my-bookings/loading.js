
function Skeleton({ className = "" }) {
    return (
        <div
            className={`animate-pulse rounded-lg bg-[#E9E6E0] ${className}`}
        />
    );
}

function BookingCardSkeleton() {
    return (
        <div className="rounded-2xl border border-[#E9E6E0] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                {/* Booking Information */}
                <div className="flex-1">
                    <div className="mb-5 flex flex-wrap items-center gap-3">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-5 w-5 rounded-md" />
                            <Skeleton className="h-4 w-32" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="h-5 w-5 rounded-md" />
                            <Skeleton className="h-4 w-48" />
                        </div>

                        <div className="flex items-center gap-3">
                            <Skeleton className="h-5 w-5 rounded-md" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                    </div>
                </div>

                {/* Price and Action */}
                <div className="flex flex-col gap-4 border-t border-[#E9E6E0] pt-4 sm:min-w-[170px] sm:items-end sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                    <div className="space-y-2 sm:text-right">
                        <Skeleton className="h-3 w-20 sm:ml-auto" />
                        <Skeleton className="h-8 w-28" />
                    </div>

                    <Skeleton className="h-10 w-36" />
                </div>
            </div>

            <div className="mt-5 border-t border-[#E9E6E0] pt-4">
                <Skeleton className="h-3 w-48" />
            </div>
        </div>
    );
}

export default function MyBookingsLoading() {
    return (
        <main className="min-h-screen bg-[#F8F6F2] py-12">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

                {/* Page Heading */}
                <div className="mb-8">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="mt-4 h-9 w-52" />
                    <Skeleton className="mt-3 h-4 w-80 max-w-full" />
                </div>

                {/* Booking Count */}
                <div className="mb-6 rounded-xl border border-[#E9E6E0] bg-white p-5">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="mt-3 h-8 w-12" />
                </div>

                {/* Booking Cards */}
                <div className="space-y-5">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <BookingCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        </main>
    );
}
