
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

// Create a booking
export const createBookingAPI = async (bookingData) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(`${API_URL}/api/bookings`, {
            method: "POST",
            headers,
            body: JSON.stringify(bookingData),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to create booking"
            );
        }

        return result;
    } catch (error) {
        console.error("Create Booking API Error:", error);
        throw error;
    }
};

// Get creator's bookings
export const getMyBookingsAPI = async () => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/bookings/my-bookings`,
            {
                method: "GET",
                headers,
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch bookings"
            );
        }

        return result;
    } catch (error) {
        console.error("Get My Bookings API Error:", error);
        throw error;
    }
};

// Get host's incoming bookings
export const getHostBookingsAPI = async () => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/bookings/host-bookings`,
            {
                method: "GET",
                headers,
                cache: "no-store",
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to fetch host bookings"
            );
        }

        return result;
    } catch (error) {
        console.error("Get Host Bookings API Error:", error);
        throw error;
    }
};

// Update booking status
export const updateBookingStatusAPI = async (bookingId, status) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/bookings/${encodeURIComponent(bookingId)}/status`,
            {
                method: "PATCH",
                headers,
                body: JSON.stringify({ status }),
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to update booking status"
            );
        }

        return result;
    } catch (error) {
        console.error("Update Booking Status API Error:", error);
        throw error;
    }
};

// Cancel creator's pending booking
export const cancelMyBookingAPI = async (bookingId) => {
    try {
        const headers = await getAuthHeaders();

        const response = await fetch(
            `${API_URL}/api/bookings/${encodeURIComponent(bookingId)}/cancel`,
            {
                method: "PATCH",
                headers,
            });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(
                result.message || "Failed to cancel booking"
            );
        }

        return result;
    } catch (error) {
        console.error("Cancel Booking API Error:", error);
        throw error;
    }
};
