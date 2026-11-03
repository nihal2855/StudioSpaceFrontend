
import { cn } from "@/lib/utils";

const variants = {
    primary:
        "bg-[#EA7838] text-white hover:bg-[#D96529]",

    secondary:
        "bg-[#F8F6F2] text-[#20201E] hover:bg-[#F1EEE8]",

    outline:
        "border border-[#E9E6E0] text-[#20201E] hover:bg-[#F8F6F2]",

    ghost:
        "text-[#20201E] hover:bg-[#F8F6F2]",
};

export default function Button({
    children,
    variant = "primary",
    className,
    type = "button",
    ...props
}) {
    return (
        <button
            type={type}
            className={cn(
                "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50",
                variants[variant] || variants.primary,
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
