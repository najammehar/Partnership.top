// src/context/DomainContext.jsx
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

    const fetchDomains = useCallback(async (searchQuery = '') => {
        setLoading(true);
        try {
            const fetchedDomains = await domainService.getAllDomains(searchQuery);
            setDomains(fetchedDomains);
            setError(null);
        } catch (err) {
            setError('Failed to fetch domains');
        } finally {
            setLoading(false);
        }
    }, []);

    const addDomain = async (domainData, imageFile) => {
        setLoading(true);
        try {
            await domainService.createDomain(domainData, imageFile);
            await fetchDomains();
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
            await fetchDomains();
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
            await fetchDomains();
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
        fetchDomains,
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