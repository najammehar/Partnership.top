import { Client, Databases, Query } from "appwrite";
import Config from "../conf/config";

export class DomainService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(Config.appwriteURL)
            .setProject(Config.appwriteProjectID);
        this.databases = new Databases(this.client);
    }

    async getDomains(limit = 10, offset = 0) {
        try {
            const queries = [
                Query.orderDesc("$createdAt"),
                Query.limit(limit),
                Query.offset(offset)
            ];
            
            const response = await this.databases.listDocuments(
                Config.appwriteDatabaseID,
                Config.appwriteCollectionID,
                queries
            );

            return {
                documents: response.documents,
                total: response.total
            };
        } catch (error) {
            console.error("Appwrite service :: getDomains :: error", error);
            throw error;
        }
    }

    async getDomainById(domainId) {
        try {
            return await this.databases.getDocument(
                Config.appwriteDatabaseID,
                Config.appwriteCollectionID,
                domainId
            );
        } catch (error) {
            console.error("Appwrite service :: getDomainById :: error", error);
            throw error;
        }
    }
    // search domain by name or extension
    async searchDomain(query, limit = 10, offset = 0) {
        try {
            // Fetch all records or a reasonable chunk
            const response = await this.databases.listDocuments(
                Config.appwriteDatabaseID,
                Config.appwriteCollectionID
            );
    
            // Filter results manually for partial matches in "name" or "extension"
            const filteredDocuments = response.documents.filter(doc => 
                doc.name.toLowerCase().includes(query.toLowerCase()) ||
                doc.extenstion.toLowerCase().includes(query.toLowerCase())
            );
    
            // Implement pagination manually
            const paginatedDocuments = filteredDocuments.slice(offset, offset + limit);
    
            return {
                documents: paginatedDocuments,
                total: filteredDocuments.length
            };
        } catch (error) {
            console.error("Appwrite service :: searchDomain :: error", error);
            throw error;
        }
    }
    
    
    

}

export default new DomainService();