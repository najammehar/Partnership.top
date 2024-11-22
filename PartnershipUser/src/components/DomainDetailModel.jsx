import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowUpRight, AlertCircle, CheckCircle2 } from "lucide-react";
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
    <div className="min-h-screen relative bg-gradient-to-b from-transparent to-indigo-950/10">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pt-20 pb-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 pt-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text mb-2">
              {domain.name}
              {domain.extenstion}
            </h1>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Column - Image */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="aspect-square w-full max-w-[500px] mx-auto rounded-2xl overflow-hidden shadow-xl shadow-indigo-500/10">
                <img
                  src={domain.imageUrl}
                  alt={domain.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-3 space-y-8">
            {/* Investment Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-indigo-600/10 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Price per Share</p>
                <h3 className="text-2xl font-bold text-indigo-300 mt-1">
                  {domain.sharePrice} PKR
                </h3>
              </div>
              <div className="bg-indigo-600/10 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Available Shares</p>
                <h3 className="text-2xl font-bold text-indigo-300 mt-1">
                  {domain.remainingShares}%
                </h3>
              </div>
              <div className="bg-indigo-600/10 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Projected Value</p>
                <h3 className="text-2xl font-bold text-indigo-300 mt-1">
                  {domain.projectedValue}+
                </h3>
              </div>
              <div className="bg-indigo-600/10 p-4 rounded-xl">
                <p className="text-gray-400 text-sm">Category</p>
                <h3 className="text-2xl font-bold text-indigo-300 mt-1">
                  {domain.category}
                </h3>
              </div>
            </div>

            {/* Description */}
            <div className="bg-indigo-600/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Domain Description
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {domain.description}
              </p>
            </div>

            {/* Investment Potential */}
            <div className="bg-indigo-600/5 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                Investment Potential
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">Premium Domain Name</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">High Market Demand</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">Strong Growth Potential</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                    <span className="text-gray-300">Verified Ownership</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Investment Action */}
            <div className="bg-indigo-600/5 rounded-xl p-6">
              <div className="flex flex-col space-y-4">
                <label className="flex items-center space-x-3">
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
                  className="w-full flex items-center justify-center bg-indigo-600 text-white py-4 rounded-xl hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:hover:bg-indigo-600"
                >
                  <span className="text-lg font-semibold">Invest Now</span>
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainDetailPage;