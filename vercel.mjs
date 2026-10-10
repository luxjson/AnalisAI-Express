import { createVercelConfig } from "./scripts/vercel-config.mjs";
export const config = createVercelConfig(process.env.VITE_API_URL);
