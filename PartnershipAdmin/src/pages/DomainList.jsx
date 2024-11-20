import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomainContext } from '../context/DomainContext';
import { Pencil, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

const DomainList = () => {
  const navigate = useNavigate();
  const { 
    domains, 
    loading, 
    error, 
    fetchDomains, 
    deleteDomain,
    pagination,
    changePage 
  } = useDomainContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchDomains('', 1);
  }, [fetchDomains]);

  // Create debounced search function
  const debouncedFetch = useDebounce((query) => {
    fetchDomains(query, 1); // Reset to first page on new search
  }, 500);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedFetch(value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this domain?')) {
      const result = await deleteDomain(id);
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 3000);
    }
  };

  const handlePageChange = (newPage) => {
    changePage(newPage, searchQuery);
    window.scrollTo(0, 0); // Scroll to top on page change
  };

  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">Domain List</h2>
        <input
          type="text"
          placeholder="Search domains..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Alert Message */}
      {message.text && (
        <div 
          className={`p-4 mb-4 rounded transition-all duration-300 ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          {/* Domains Grid */}
          <div className="grid gap-4 mb-6">
            {domains.map((domain) => (
              <div 
                key={domain.$id} 
                className="border rounded-lg p-4 grid grid-cols-10 gap-4 hover:shadow-md transition-shadow duration-200"
              >
                <div className='col-span-1'>
                  <img 
                    src={domain.imageUrl} 
                    className='w-full h-24 object-cover rounded-md' 
                    alt={domain.name}
                  />
                </div>
                <div className='col-span-8 space-y-2'>
                  <h3 className="font-bold text-lg">
                    {domain.name}{domain.extenstion}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <p className="text-gray-700">
                      <span className="font-semibold">Category:</span> {domain.category}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Price per %:</span> {domain.sharePrice} PKR
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold">Remaining:</span> {domain.remainingShares}%
                    </p>
                  </div>
                </div>
                <div className="col-span-1 flex flex-col sm:flex-row gap-2 justify-center items-center">
                  <button
                    onClick={() => navigate(`/edit-domain/${domain.$id}`)}
                    className="text-blue-500 p-2 hover:bg-blue-50 rounded-full transition-colors duration-200"
                    title="Edit Domain"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(domain.$id)}
                    className="text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
                    title="Delete Domain"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
            
            {domains.length === 0 && (
              <div className="text-center py-12 text-gray-600">
                No domains found
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {domains.length > 0 && (
            <div className="flex justify-between items-center border-t pt-4">
              <div className="text-sm text-gray-700">
                Showing {((pagination.currentPage - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalItems)} of{' '}
                {pagination.totalItems} domains
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className={`p-2 rounded-md flex items-center ${
                    pagination.currentPage === 1
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <ChevronLeft size={20} />
                  <span className="ml-1">Previous</span>
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                  {[...Array(pagination.totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-3 py-1 rounded-md ${
                        pagination.currentPage === index + 1
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className={`p-2 rounded-md flex items-center ${
                    pagination.currentPage === pagination.totalPages
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <span className="mr-1">Next</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DomainList;