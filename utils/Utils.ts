export const formatImgurUrl = (url?: string | null) => {
    if (!url || typeof url !== "string") return null;
    let cleanUrl = url.trim();
    if (cleanUrl.startsWith("[") && cleanUrl.endsWith("]")) {
        try {
            const parsed = JSON.parse(cleanUrl);
            cleanUrl = parsed?.[0] || "";
        } catch {
            return null;
        }
    }
    if (cleanUrl.includes("imgur.com") && !cleanUrl.includes("i.imgur.com")) {
        const id = cleanUrl.split("/").pop();
        if (!id) return null;
        cleanUrl = `https://i.imgur.com/${id}.jpg`;
    }
    if (!cleanUrl.startsWith("http")) return null;
    if (cleanUrl.includes("undefined") || cleanUrl.includes("null")) return null;

    return cleanUrl;
};