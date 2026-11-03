import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins";

const getAuthBaseURL = () => {
    if (typeof window !== "undefined") {
        return window.location.origin;
    }

    return (
        process.env.NEXT_PUBLIC_APP_URL ||
        "http://localhost:3000"
    );
};

export const authClient = createAuthClient({
    baseURL: getAuthBaseURL(),
    plugins: [jwtClient()],
});
