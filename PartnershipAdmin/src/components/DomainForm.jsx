// src/components/DomainForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDomainContext } from '../context/DomainContext';

const DomainForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addDomain, updateDomain, getDomain } = useDomainContext();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const [formData, setFormData] = useState({
    name: '',
    extenstion: '',
    description: '',
    sharePrice: '',
    regeisterationDate: '',
    expirationDate: '',
    category: '',
    remainingShares: '',
    projectedValue: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formloading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchDomain = async () => {
      if (id && isInitialLoad) {
        setFormLoading(true);
        const domain = await getDomain(id);
        if (domain) {
          const formatDate = (dateString) => {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
          };
          setFormData({
            name: domain.name,
            extenstion: domain.extenstion,
            description: domain.description,
            sharePrice: domain.sharePrice,
            regeisterationDate: formatDate(domain.regeisterationDate),
            expirationDate: formatDate(domain.expirationDate),
            category: domain.category,
            remainingShares: domain.remainingShares,
            projectedValue: domain.projectedValue,
          });
          setIsInitialLoad(false);
          setFormLoading(false);
        }
      }
    };
    fetchDomain();
  }, [id, isInitialLoad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (id) {
        result = await updateDomain(id, formData, imageFile);
      } else {
        result = await addDomain(formData, imageFile);
      }

      setMessage({
        type: result.success ? 'success' : 'error',
        text: result.message
      });

      if (result.success) {
        setTimeout(() => {
          navigate('/domains');
        }, 1500);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An error occurred while saving the domain'
      });
    } finally {
      setLoading(false);
    }
  };

  if (formloading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">
        {id ? 'Edit Domain' : 'Add New Domain'}
      </h2>
      
      {message.text && (
        <div className={`p-4 mb-4 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Domain Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">extenstion</label>
          <input
            type="text"
            name="extenstion"
            value={formData.extenstion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Share Price</label>
          <input
            type="number"
            name="sharePrice"
            value={formData.sharePrice}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Domain Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded"
            required={!id}
          />
        </div>

        <div>
          <label className="block mb-1">Registration Date</label>
          <input
            type="date"
            name="regeisterationDate"
            value={formData.regeisterationDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Expiration Date</label>
          <input
            type="date"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Remaining Shares</label>
          <input
            type="number"
            name="remainingShares"
            value={formData.remainingShares}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Projected Value</label>
          <input
            type="number"
            name="projectedValue"
            value={formData.projectedValue}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Saving...' : (id ? 'Update Domain' : 'Add Domain')}
        </button>
      </form>
    </div>
  );
};

export default DomainForm;
