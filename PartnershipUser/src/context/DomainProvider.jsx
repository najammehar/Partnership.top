import React, { useReducer, useCallback } from 'react';
import DomainContext from './DomainContext';
import domainService from '../services/Domain';

// Domain Reducer
const domainReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_DOMAINS_START':
            return { ...state, loading: true, error: null };
        case 'FETCH_DOMAINS_SUCCESS':
            return {
                ...state,
                domains: action.payload.isLoadMore 
                    ? [...state.domains, ...action.payload.domains]
                    : action.payload.domains,
                loading: false,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total,
                    offset: state.pagination.offset + action.payload.domains.length
                }
            };
        case 'FETCH_DOMAINS_ERROR':
            return { ...state, loading: false, error: action.payload };
        case 'RESET_DOMAINS':
            return {
                ...state,
                domains: [],
                pagination: { total: 0, limit: 10, offset: 0 }
            };
        case 'SET_SELECTED_DOMAIN':
            return { ...state, selectedDomain: action.payload };
        case 'FETCH_SEARCH_DOMAINS_START':
            return { 
                ...state, 
                loading: true, 
                error: null,
                searchQuery: action.payload.query 
            };
        case 'FETCH_SEARCH_DOMAINS_SUCCESS':
            return {
                ...state,
                domains: action.payload.isLoadMore 
                    ? [...state.domains, ...action.payload.domains]
                    : action.payload.domains,
                loading: false,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total,
                    offset: state.pagination.offset + action.payload.domains.length
                }
            };
        case 'FETCH_SEARCH_DOMAINS_ERROR':
            return { 
                ...state, 
                loading: false, 
                error: action.payload,
                searchQuery: null 
            };
        default:
            return state;
    }
};

export const DomainProvider = ({ children }) => {
    const [state, dispatch] = useReducer(domainReducer, {
        domains: [],
        loading: false,
        error: null,
        selectedDomain: null,
        searchQuery: null,
        pagination: { total: 0, limit: 10, offset: 0 }
    });

    const fetchDomains = useCallback(async (isLoadMore = false) => {
        dispatch({ type: 'FETCH_DOMAINS_START' });
        try {
            const { documents, total } = await domainService.getDomains(
                state.pagination.limit, 
                isLoadMore ? state.pagination.offset : 0
            );
            
            dispatch({ 
                type: 'FETCH_DOMAINS_SUCCESS', 
                payload: { 
                    domains: documents, 
                    total, 
                    isLoadMore 
                } 
            });
        } catch (error) {
            dispatch({ type: 'FETCH_DOMAINS_ERROR', payload: error });
        }
    }, [state.pagination.limit, state.pagination.offset]);

    const fetchSearchResults = useCallback(async (query, isLoadMore = false) => {
        // Reset offset to 0 if not loading more
        const currentOffset = isLoadMore ? state.pagination.offset : 0;

        dispatch({ 
            type: 'FETCH_SEARCH_DOMAINS_START', 
            payload: { query } 
        });

        try {
            const { documents, total } = await domainService.searchDomain(
                query, 
                state.pagination.limit, 
                currentOffset
            );
            
            dispatch({ 
                type: 'FETCH_SEARCH_DOMAINS_SUCCESS', 
                payload: { 
                    domains: documents, 
                    total, 
                    isLoadMore 
                } 
            });
        } catch (error) {
            dispatch({ 
                type: 'FETCH_SEARCH_DOMAINS_ERROR', 
                payload: error 
            });
        }
    }, [state.pagination.limit, state.pagination.offset]);

    const setSelectedDomain = useCallback((domain) => {
        dispatch({ type: 'SET_SELECTED_DOMAIN', payload: domain });
    }, []);

    const resetDomains = useCallback(() => {
        dispatch({ type: 'RESET_DOMAINS' });
    }, []);

    return (
        <DomainContext.Provider 
            value={{
                ...state,
                fetchDomains,
                fetchSearchResults,
                setSelectedDomain,
                resetDomains
            }}
        >
            {children}
        </DomainContext.Provider>
    );
};