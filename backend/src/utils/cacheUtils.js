import crypto from "crypto";
import { LRUCache } from "lru-cache";

const hashCache = new LRUCache({
  max: 10000,
  maxAge: 1000 * 60 * 60,
});

export const cacheHash = (content) => {
  const hash = crypto.createHash("sha256").update(content).digest("hex");
  hashCache.set(content, hash);
  return hash;
};

export const getHashFromCache = (content) => {
  const cachedHash = hashCache.get(content);
  if (cachedHash) {
    return cachedHash;
  }
  const hash = cacheHash(content);
  return hash;
};
