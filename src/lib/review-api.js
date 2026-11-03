
import { authClient } from "@/lib/auth-client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Get authenticated request headers
const getAuthHeaders = async () => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error(
            error?.message || "Unable to get authentication token"
        );
    }

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
    };
};

// Get reviews for a studio (Public)
export const getStudioReviewsAPI = async (studioId) => {
    try {
        const response = await fetch(
            `${API_URL}/api/studios/${encodeURIComponent(studioId)}/reviews`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch studio reviews"
            );
        }

        return result;
    } catch (error) {
        console.error("Get Studio Reviews API Error:", error);
        throw error;
    }
};

// Submit a studio review (Private)
export const createStudioReviewAPI = async (studioId, reviewData) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/studios/${encodeURIComponent(studioId)}/reviews`,
            {
                method: "POST",
                headers,
                body: JSON.stringify(reviewData),
            });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to submit review"
            );
        }

        return result;
    } catch (error) {
        console.error("Create Studio Review API Error:", error);
        throw error;
    }
};
