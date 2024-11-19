import { useContext } from 'react';
import DomainContext from '../context/DomainContext';

export const useDomains = () => {
    const context = useContext(DomainContext);
    
    if (!context) {
        throw new Error('useDomains must be used within a DomainProvider');
    }
    
    return context;
};