// src/services/domain.service.js
import { databases, storage, appwriteConfig } from '../appwrite/config';
import { ID, Query } from 'appwrite';

class DomainService {
    async createDomain(domain, imageFile) {
        try {
            // Convert types to float
            domain.sharePrice = parseFloat(domain.sharePrice);
            domain.remainingShares = parseFloat(domain.remainingShares);
            domain.projectedValue = parseFloat(domain.projectedValue);
            
            // Upload image file
            const imageUpload = await storage.createFile(
                appwriteConfig.bucketId,
                ID.unique(),
                imageFile
            );
    
            // Validate the file upload
            if (!imageUpload.$id) {
                throw new Error("File upload failed. No file ID returned.");
            }
    
            // Generate image URL
            const imageUrl = storage.getFileView(
                appwriteConfig.bucketId,
                imageUpload.$id
            );
    
            if (!imageUrl) {
                throw new Error("Failed to generate file view URL.");
            }
    
            // Prepare document payload
            const documentData = {
                ...domain,
                imageUrl
            };
    
            // Create the document
            const response = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.domainCollectionId,
                ID.unique(),
                documentData
            );
    
            return response;
        } catch (error) {
            console.error("Domain service :: createDomain :: error", error);
            throw error;
        }
    }
    

    async updateDomain(domainId, updatedData, newImageFile = null) {
        try {
            updatedData.sharePrice = parseFloat(updatedData.sharePrice);
            updatedData.remainingShares = parseFloat(updatedData.remainingShares);
            updatedData.projectedValue = parseFloat(updatedData.projectedValue);
            let imageUrl = updatedData.imageUrl;

            // If new image is provided, upload it
            if (newImageFile) {
                const imageUpload = await storage.createFile(
                    appwriteConfig.bucketId,
                    ID.unique(),
                    newImageFile
                );

                imageUrl = storage.getFileView(
                    appwriteConfig.bucketId,
                    imageUpload.$id
                );
            }

            const response = await databases.updateDocument(
                appwriteConfig.databaseId,
                appwriteConfig.domainCollectionId,
                domainId,
                {
                    ...updatedData,
                    imageUrl
                }
            );

            return response;
        } catch (error) {
            throw error;
        }
    }

    async deleteDomain(domainId) {
        try {
            await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.domainCollectionId,
                domainId
            );
            return true;
        } catch (error) {
            throw error;
        }
    }

    async getDomain(domainId) {
        try {
            const response = await databases.getDocument(
                appwriteConfig.databaseId,
                appwriteConfig.domainCollectionId,
                domainId
            );
            return response;
        } catch (error) {
            throw error;
        }
    }

async getAllDomains(searchQuery = '', page = 1, limit = 10) {
    try {
        const offset = (page - 1) * limit;
        let queries = [
            Query.limit(limit),
            Query.offset(offset)
        ];
        
        if (searchQuery) {
            queries.push(Query.search('name', searchQuery));
        }

        const response = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.domainCollectionId,
            queries
        );

        return response;
    } catch (error) {
        throw error;
    }
}
}

export const domainService = new DomainService();