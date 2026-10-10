export function createVercelConfig(api) {
  if (!api)
    throw new Error(
      "Configure VITE_API_URL com a origem HTTPS da API no Render.",
    );
  const url = new URL(api);
  if (
    url.protocol !== "https:" ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  )
    throw new Error("VITE_API_URL deve conter apenas a origem HTTPS da API.");
  return {
    framework: "vite",
    buildCommand: "npm run build",
    outputDirectory: "dist",
    rewrites: [
      {
        source: "/backend/:path*",
        destination: url.origin + "/api/v1/:path*",
      },
      {
        source: "/:path*",
        destination: "/index.html",
      },
    ],
    headers: [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self'; frame-src 'self'; worker-src 'self' blob:",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
      {
        source: "/backend/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "private, no-store",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ],
  };
}
