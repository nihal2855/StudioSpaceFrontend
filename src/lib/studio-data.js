
const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getStudioByIdAPI = async (id) => {
    try {
        const response = await fetch(
            `${API_URL}/api/studios/${encodeURIComponent(id)}`,
            {
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch studio");
        }

        return result.data;
    } catch (error) {
        console.error("Get Studio Details Error:", error);
        throw error;
    }
};


export const getAllStudiosAPI = async () => {
    try {
        const response = await fetch(`${API_URL}/api/studios`, {
            cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Failed to fetch studios");
        }

        return result.data || [];
    } catch (error) {
        console.error("Get All Studios API Error:", error);
        throw error;
    }
};