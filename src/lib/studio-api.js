
import { authClient } from "@/lib/auth-client";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// Get authentication headers
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

// Create a new studio
export const createStudioAPI = async (studioData) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(`${API_URL}/api/studios`, {
            method: "POST",
            headers,
            body: JSON.stringify(studioData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to create studio"
            );
        }

        return result;
    } catch (error) {
        console.error("Create Studio API Error:", error);
        throw error;
    }
};

// Get studios created by the logged-in host
export const getMyStudiosAPI = async () => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/studios/my-studios`,
            {
                method: "GET",
                headers,
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch your studios"
            );
        }

        return result;
    } catch (error) {
        console.error("Get My Studios API Error:", error);
        throw error;
    }
};

// Update an existing studio
export const updateStudioAPI = async (studioId, studioData) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/studios/${encodeURIComponent(studioId)}`,
            {
                method: "PATCH",
                headers,
                body: JSON.stringify(studioData),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to update studio"
            );
        }

        return result;
    } catch (error) {
        console.error("Update Studio API Error:", error);
        throw error;
    }
};

// Delete an existing studio
export const deleteStudioAPI = async (studioId) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/studios/${encodeURIComponent(studioId)}`,
            {
                method: "DELETE",
                headers,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to delete studio"
            );
        }

        return result;
    } catch (error) {
        console.error("Delete Studio API Error:", error);
        throw error;
    }
};
