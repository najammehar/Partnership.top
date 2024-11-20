// src/pages/DomainList.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDomainContext } from '../context/DomainContext';
import { Pencil, Trash2 } from 'lucide-react';

const DomainList = () => {
  const navigate = useNavigate();
  const { domains, loading, error, fetchDomains, deleteDomain } = useDomainContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchDomains();
  }, [fetchDomains]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    fetchDomains(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this domain?')) {
      const result = await deleteDomain(id);
      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Domain List</h2>
        <input
          type="text"
          placeholder="Search domains..."
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border rounded w-64"
        />
      </div>

      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid gap-4">
        {domains.map((domain) => (
          <div key={domain.$id} className="border rounded p-4 grid grid-cols-10 gap-4">
            <div className='col-span-1'>
              <img src={domain.imageUrl} className=' object-contain rounded-md' alt="" srcset="" />
            </div>
            <div className='col-span-8'>
              <h3 className="font-bold">{domain.name}{domain.extenstion}</h3>
              <p className="text-gray-900">Category: {domain.category}</p>
              <p className="text-gray-900">Price per %: {domain.sharePrice} pkr</p>
              <p className="text-gray-900">Remaining Shares: {domain.remainingShares}%</p>
            </div>
            <div className="col-span-1 flex">
              <button
                onClick={() => navigate(`/edit-domain/${domain.$id}`)}
                className="text-blue-500 px-2 py-2 hover:text-blue-600"
              >
                <Pencil />
              </button>
              <button
                onClick={() => handleDelete(domain.$id)}
                className="text-red-500 px-2 py-2 hover:text-red-600"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
        
        {domains.length === 0 && (
          <div className="text-center text-gray-600">
            No domains found
          </div>
        )}
      </div>
    </div>
  );
};

export default DomainList;