// src/appwrite/config.js
import { Client, Databases, Storage, Account } from 'appwrite';

const client = new Client()
    .setEndpoint(String(import.meta.env.VITE_APPWRITE_URL)) 
    .setProject(String(import.meta.env.VITE_APPWRITE_PROJECT));

export const databases = new Databases(client);
export const storage = new Storage(client);
export const account = new Account(client);

export const appwriteConfig = {
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    domainCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
};