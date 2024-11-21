import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, AlertCircle } from "lucide-react";
import DomainService from "../services/Domain";

const DomainDetailPage = () => {
  const { domainId } = useParams();
  const navigate = useNavigate();

  const [domain, setDomain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    const fetchDomainDetails = async () => {
      try {
        setLoading(true);
        const domainData = await DomainService.getDomainById(domainId);
        setDomain(domainData);
      } catch (err) {
        console.error("Failed to fetch domain details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDomainDetails();
  }, [domainId]);

  const handleInvestment = () => {
    if (termsAccepted) {
      // Implement investment logic or navigation
      navigate(`/invest/${domainId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-8 h-8" />
          <p>Failed to load domain details. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen mt-16 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-7xl overflow-hidden grid md:grid-cols-2 gap-8 px-4 pt-8">
          {/* Domain Image Section */}
          <div className="relative h-[500px] rounded-xl overflow-hidden">
            <img
              src={domain.imageUrl}
              alt={domain.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          {/* Domain Details Section */}
          <div className="flex flex-col justify-between">
            {/* Header */}
            <div className="flex justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text hover:from-indigo-300 hover:to-indigo-100 transition-all duration-300">
                  {domain.name}
                  {domain.extenstion}
                </h1>
              </div>
              <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm flex items-center justify-center">
                <div>{domain.category}</div>
              </div>
            </div>

            {/* Investment Details */}
            <div className="grid grid-cols-2 gap-4 bg-gradient-to-br from-indigo-600/10 to-transparent p-2 rounded-xl mb-4">
              <div>
                <p className="text-gray-400 mb-1">Price per Share</p>
                <h3 className="text-2xl font-bold text-indigo-300">
                  {domain.sharePrice} PKR
                </h3>
              </div>
              <div>
                <p className="text-gray-400 mb-1">Available Shares</p>
                <h3 className="text-2xl font-bold text-indigo-300">
                  {domain.remainingShares}%
                </h3>
              </div>
            </div>

            {/* Investment Potential */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                Investment Potential
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Premium Domain
                </li>
                <li className="flex items-center">
                  <span className="mr-2 text-green-500">✓</span>
                  Projected Value: {domain.projectedValue}+ PKR
                </li>
              </ul>
            </div>

            {/* Terms and Conditions */}
            <div className="">
              <label className="flex items-center space-x-2 mb-4">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="rounded text-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-gray-300">
                  I have read and agree to the{" "}
                  <Link to="/terms" className="text-indigo-400 hover:underline">
                    Terms & Conditions
                  </Link>
                </span>
              </label>

              <button
                onClick={handleInvestment}
                disabled={!termsAccepted}
                className="w-full flex items-center justify-center bg-indigo-600 text-white py-3 rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                Invest Now
                <ArrowUpRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="relative w-full max-w-7xl mx-auto px-6 pb-8 text-justify ">
        <h3 className="text-xl font-semibold text-white mb-3">
          Domain Description
        </h3>
        <p className="text-gray-300 leading-relaxed">{domain.description}</p>
      </div>
    </>
  );
};

export default DomainDetailPage;
