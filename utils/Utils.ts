import AsyncStorage from '@react-native-async-storage/async-storage';

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
    if (cleanUrl.startsWith("http://")) {
        cleanUrl = cleanUrl.replace("http://", "https://");
    }
    if (cleanUrl.includes("imgur.com") && !cleanUrl.includes("i.imgur.com")) {
        const match = cleanUrl.match(/imgur\.com\/([a-zA-Z0-9]+)/);
        if (!match) return null;
        const id = match[1];
        cleanUrl = `https://i.imgur.com/${id}.jpg`;
    }
    if (!cleanUrl.startsWith("http")) return null;
    if (cleanUrl.includes("undefined") || cleanUrl.includes("null")) return null;

    return cleanUrl;
};

export const getRandomRating = () => {
  return (Math.random() * 4 + 1).toFixed(1);
};

type StoreKey = 'wishlist' | 'cart' | 'orders';
const PREFIX = '@store/';

const productStore = {
  get: async <T>(key: StoreKey): Promise<T[]> => {
    try {
      const raw = await AsyncStorage.getItem(PREFIX + key);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  set: async <T>(key: StoreKey, data: T[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(PREFIX + key, JSON.stringify(data));
    } catch (e) {
      console.error(`productStore.set [${key}] failed`, e);
    }
  },

  clear: async (key: StoreKey): Promise<void> => {
    await AsyncStorage.removeItem(PREFIX + key);
  },
};

export default productStore;

export const formatPrice = (price: number | string) => {
  const value = Number(price);

  if (isNaN(value)) return price;

  if (value >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }

  if (value >= 1_000_000) {
    return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }

  if (value >= 100_000) {
    return (value / 1_000).toFixed(0) + 'K'; // 100K, 250K
  }

  return value.toString();
};