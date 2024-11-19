import { createContext } from 'react';

const DomainContext = createContext({
    domains: [],
    loading: false,
    error: null,
    selectedDomain: null,
    pagination: {
        total: 0,
        limit: 10,
        offset: 0
    },
    fetchDomains: () => {},
    setSelectedDomain: () => {},
    resetDomains: () => {}
});

export default DomainContext;