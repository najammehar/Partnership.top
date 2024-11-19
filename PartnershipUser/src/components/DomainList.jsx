import React, { useEffect } from "react";
import { ChevronDown, Loader } from "lucide-react";
import DomainCard from "./DomainCard";
import { useDomains } from "../hooks/useDomains";

function DomainList() {
  const { 
    domains, 
    loading, 
    fetchDomains, 
    pagination 
  } = useDomains();

  useEffect(() => {
    fetchDomains();
  }, []);

  return (
    <section id="domain-list" className="relative py-16 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl px-4 mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text">
            Available Domains
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our curated selection of premium domains available for fractional investment
          </p>
        </div>

        {/* Domain Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {domains.length === 0 && loading ? (
            // Loading Skeletons
            [...Array(3)].map((_, index) => (
              <div 
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 h-64 animate-pulse"
              />
            ))
          ) : (
            // Domain Cards
            domains.map((domain) => (
              <div 
                key={domain.$id}
                className="transform hover:-translate-y-1 transition-all duration-300"
              >
                <DomainCard domain={domain} loading={loading} />
              </div>
            ))
          )}
        </div>

        {/* View More Button */}
        {pagination.total > domains.length && (
          <div className="mt-12 text-center">
            <button
              onClick={() => fetchDomains(true)}
              disabled={loading}
              className="group relative inline-flex items-center justify-center rounded-full bg-gray-900/50 backdrop-blur-sm px-8 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-indigo-600/20 hover:shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-800 hover:border-indigo-500/50"
            >
              {loading ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span className="mr-2">View More</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
                </>
              )}
            </button>
          </div>
        )}

        {/* No More Domains Message */}
        {pagination.total <= domains.length && domains.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-400">You've viewed all available domains</p>
          </div>
        )}

        {/* Error State */}
        {domains.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-400">No domains available at the moment</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default DomainList;