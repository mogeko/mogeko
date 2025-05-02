---
"@mogeko/blog": patch
---

Add error handling for image loading.

Since the Cloudinary CDN is not always available in China, we use ImageKitas a fallback. The image is stored in Cloudinary and proxied through ImageKit.

See: https://imagekit.io/docs/integration/web-proxy
