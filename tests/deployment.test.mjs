import { test } from "node:test";
import assert from "node:assert/strict";
import { createVercelConfig } from "../scripts/vercel-config.mjs";
test("Vercel resolves the only frontend variable before deployment routing", () => {
  const config = createVercelConfig("https://analisai-api.onrender.com");
  assert.deepEqual(config.rewrites[0], {
    source: "/backend/:path*",
    destination: "https://analisai-api.onrender.com/api/v1/:path*",
  });
  assert.equal(config.rewrites[1].destination, "/index.html");
  assert.ok(
    config.headers.some(
      (h) =>
        h.source === "/backend/:path*" &&
        h.headers.some(
          (v) => v.key === "Cache-Control" && v.value.includes("no-store"),
        ),
    ),
  );
});
test("Deployment rejects malformed origins, credentials and plaintext transport", () => {
  for (const value of [
    undefined,
    "http://api.example.com",
    "https://api.example.com/v1",
    "https://user:pass@api.example.com",
    "https://api.example.com?secret=1",
  ])
    assert.throws(() => createVercelConfig(value));
});
