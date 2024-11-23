import React from "react";
import { ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DomainCard = ({ domain, loading }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 h-full relative">
        <div className="space-y-6">
          {/* Square loading placeholder */}
          <div className="w-full relative pb-[100%] overflow-hidden rounded-lg bg-gray-800/50 animate-pulse" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-800/50 rounded-lg w-2/3 animate-pulse" />
              <div className="h-6 bg-gray-800/50 rounded-full w-24 animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="h-4 bg-gray-800/50 rounded w-full animate-pulse" />
              <div className="h-4 bg-gray-800/50 rounded w-3/4 animate-pulse" />
            </div>

            <div className="pt-4">
              <div className="h-12 bg-gray-800/50 rounded-full w-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={() => navigate(`/domain/${domain.$id}`)}
        className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 p-6 h-full hover:border-indigo-500/50 transition-all duration-300"
      >
        {/* Square Image Container */}
        <div className="relative pb-[100%] mb-6 overflow-hidden rounded-lg group">
          <img
            src={domain.imageUrl}
            alt={domain.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text">
              {domain.name}
              {domain.extenstion}
            </h3>
            <span className="px-3 py-1 text-xs font-medium text-indigo-200 bg-indigo-500/10 rounded-full border border-indigo-500/20">
              {domain.category}
            </span>
          </div>

          {/* Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-gray-400">
              <span>Price per 1%</span>
              <span className="font-medium text-indigo-200">
                {domain.sharePrice} PKR
              </span>
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <span>Available Shares</span>
              <span className="font-medium text-indigo-200">
                {domain.remainingShares <= 0 ? (
                  <span className="text-red-500">Sold Out</span>
                ) : (
                  <span>{domain.remainingShares}%</span>
                )}
              </span>
            </div>
          </div>

          {/* Investment Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/domain/${domain.$id}`);
            }}
            className="w-full mt-4 group relative inline-flex items-center justify-center rounded-full bg-indigo-600/20 px-6 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-indigo-600/30 hover:shadow-lg hover:shadow-indigo-500/25 border border-indigo-500/50"
          >
            <span>Invest Now</span>
            <ArrowUpRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </>
  );
};

export default DomainCard;
