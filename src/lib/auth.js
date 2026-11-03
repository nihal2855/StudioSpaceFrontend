import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

import { client, db } from "./mongodb";

export const auth = betterAuth({
    appName: "StudioSpace",

    baseURL: process.env.BETTER_AUTH_URL,

    secret: process.env.BETTER_AUTH_SECRET,

    trustedOrigins: [
        "http://localhost:3000",
        "https://*.vercel.app",
    ],

    database: mongodbAdapter(db, {
        client,
    }),

    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },

    plugins: [jwt()],
});