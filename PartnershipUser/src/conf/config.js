const Config = {
    appwriteURL: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectID: String(import.meta.env.VITE_APPWRITE_PROJECT),
    appwriteDatabaseID: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionID: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBucketID: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    emailjsPublicKey: String(import.meta.env.VITE_EMAILJS_PUBLIC_KEY),
    emailjsServiceID: String(import.meta.env.VITE_EMAILJS_SERVICE_ID),
    emailjsTemplateContactID: String(import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT_ID),
    emailjsTemplateInvestmentID: String(import.meta.env.VITE_EMAILJS_TEMPLATE_INVESTMENT_ID),

}

export default Config;