
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

export default function StudioCard({ studio }) {
    const {
        _id,
        title,
        category,
        hourlyRate,
        location,
        rating,
        image,
    } = studio;

    return (
        <article className="group overflow-hidden rounded-2xl border border-[#E9E6E0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Studio Image */}
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F6F2]">
                <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#20201E]">
                    {category}
                </span>
            </div>

            {/* Studio Information */}
            <div className="p-5">

                <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold text-[#20201E]">
                        {title}
                    </h3>

                    <div className="flex shrink-0 items-center gap-1 text-sm">
                        <Star size={15} className="fill-[#F4A340] text-[#F4A340]" />
                        <span className="font-semibold">
                            {rating || "New"}
                        </span>
                    </div>
                </div>

                <div className="mt-3 flex items-center gap-1.5 text-sm text-[#77756F]">
                    <MapPin size={15} />
                    {location}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#E9E6E0] pt-4">

                    <div>
                        <span className="text-xl font-bold text-[#EA7838]">
                            ৳{hourlyRate}
                        </span>
                        <span className="text-xs text-[#77756F]">
                            {" "}/ hour
                        </span>
                    </div>

                    <Link
                        href={`/studios/${_id}`}
                        className="flex items-center gap-1 text-sm font-semibold text-[#20201E] transition hover:text-[#EA7838]"
                    >
                        Details
                        <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>
        </article>
    );
}
