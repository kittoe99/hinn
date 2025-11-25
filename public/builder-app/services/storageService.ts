import { GeneratedSite } from '../types';

const DB_NAME = 'NebulaDB';
const DB_VERSION = 2; // Incremented version for schema change if needed, though objects are flexible
const STORE_NAME = 'sites';

/**
 * Initializes the IndexedDB database.
 */
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};

/**
 * Saves a generated site to the database.
 */
export const saveSite = async (site: Omit<GeneratedSite, 'id'>): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.add(site);

    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
  });
};

/**
 * Retrieves all saved sites, sorted by timestamp descending (newest first).
 */
export const getAllSites = async (): Promise<GeneratedSite[]> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
        const results = request.result as GeneratedSite[];
        // Sort by timestamp descending
        results.sort((a, b) => b.timestamp - a.timestamp);
        resolve(results);
    };
    request.onerror = () => reject(request.error);
  });
};

/**
 * Deletes a site by ID.
 */
export const deleteSite = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};
