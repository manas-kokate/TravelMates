/**
 * Normalizes remote image URLs for the browser (e.g. Cloudinary over https).
 * Leaves blob:/data: URLs unchanged.
 */
export function normalizeImageSrc(url) {
    if (url == null) return "";
    const t = String(url).trim();
    if (!t) return "";
    if (/^(blob:|data:)/i.test(t)) return t;
    try {
        const u = new URL(t);
        if (u.protocol === "http:" && /\.cloudinary\.com$/i.test(u.hostname)) {
            u.protocol = "https:";
        }
        return u.href;
    } catch {
        if (t.startsWith("//")) return `https:${t}`;
        return t;
    }
}
