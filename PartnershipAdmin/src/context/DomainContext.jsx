import React, { createContext, useContext, useState, useCallback } from 'react';
import { domainService } from '../services/domain.service';

const DomainContext = createContext();

export const useDomainContext = () => {
    const context = useContext(DomainContext);
    if (!context) {
        throw new Error('useDomainContext must be used within a DomainProvider');
    }
    return context;
};

export const DomainProvider = ({ children }) => {
    const [domains, setDomains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: 10,
        hasMore: false
    });

    const fetchDomains = useCallback(async (searchQuery = '', page = 1) => {
        setLoading(true);
        try {
            const response = await domainService.getAllDomains(searchQuery, page, pagination.limit);
            setDomains(response.documents);
            setPagination({
                currentPage: page,
                totalPages: Math.ceil(response.total / pagination.limit),
                totalItems: response.total,
                limit: pagination.limit,
                hasMore: response.documents.length === pagination.limit
            });
            setError(null);
        } catch (err) {
            setError('Failed to fetch domains');
        } finally {
            setLoading(false);
        }
    }, [pagination.limit]);

    const changePage = async (newPage, searchQuery = '') => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            await fetchDomains(searchQuery, newPage);
        }
    };

    const addDomain = async (domainData, imageFile) => {
        setLoading(true);
        try {
            await domainService.createDomain(domainData, imageFile);
            // Refresh current page after adding
            await fetchDomains('', pagination.currentPage);
            return { success: true, message: 'Domain added successfully' };
        } catch (err) {
            setError('Failed to add domain');
            return { success: false, message: 'Failed to add domain' };
        } finally {
            setLoading(false);
        }
    };

    const updateDomain = async (domainId, domainData, imageFile) => {
        setLoading(true);
        try {
            await domainService.updateDomain(domainId, domainData, imageFile);
            // Refresh current page after updating
            await fetchDomains('', pagination.currentPage);
            return { success: true, message: 'Domain updated successfully' };
        } catch (err) {
            setError('Failed to update domain');
            return { success: false, message: 'Failed to update domain' };
        } finally {
            setLoading(false);
        }
    };

    const deleteDomain = async (domainId) => {
        setLoading(true);
        try {
            await domainService.deleteDomain(domainId);
            // If current page is empty after deletion, go to previous page
            const shouldGoToPreviousPage = 
                domains.length === 1 && 
                pagination.currentPage > 1;
            
            const pageToFetch = shouldGoToPreviousPage 
                ? pagination.currentPage - 1 
                : pagination.currentPage;
                
            await fetchDomains('', pageToFetch);
            return { success: true, message: 'Domain deleted successfully' };
        } catch (err) {
            setError('Failed to delete domain');
            return { success: false, message: 'Failed to delete domain' };
        } finally {
            setLoading(false);
        }
    };

    const getDomain = async (domainId) => {
        setLoading(true);
        try {
            const domain = await domainService.getDomain(domainId);
            setError(null);
            return domain;
        } catch (err) {
            setError('Failed to fetch domain');
            return null;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        domains,
        loading,
        error,
        pagination,
        fetchDomains,
        changePage,
        addDomain,
        updateDomain,
        deleteDomain,
        getDomain
    };

    return (
        <DomainContext.Provider value={value}>
            {children}
        </DomainContext.Provider>
    );
};