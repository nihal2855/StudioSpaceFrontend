
export default function SectionHeading({
    eyebrow,
    title,
    description,
    centered = false,
}) {
    return (
        <div
            className={`max-w-2xl ${centered ? "mx-auto text-center" : ""
                }`}
        >
            {eyebrow && (
                <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#EA7838]">
                    {eyebrow}
                </p>
            )}

            <h2 className="section-heading">{title}</h2>

            {description && (
                <p className="section-description mt-4">
                    {description}
                </p>
            )}
        </div>
    );
}
