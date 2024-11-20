import React from "react";
import { Check, Globe, Shield, ChartBar } from "lucide-react";

const Hero = () => {
  const scrollToDomains = () => {
    const domainList = document.getElementById("domain-list");
    if (domainList) {
      domainList.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="pt-16 relative overflow-hidden">
      {/* Content */}
      <div className="relative">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text">
              Invest in Premium Domains
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Pakistan's No 1 Trusted Platform for Domain Investments - Partnership.top! 
            </p>
            <p className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed">
              Start your journey into the future of digital asset ownership today.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={scrollToDomains}
                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25"
              >
                Start Investing
              </button>
              <button
                onClick={scrollToDomains}
                className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-lg font-semibold transition-colors duration-200"
              >
                View Domains
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300">
              <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                <Globe className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Fractional Ownership
              </h3>
              <p className="text-gray-400">
                Own shares in premium domains with transparent pricing and
                flexible investment options
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300">
              <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                <Shield className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-400">
                Advanced security measures and transparent ownership structure
                for peace of mind
              </p>
            </div>

            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300">
              <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                <ChartBar className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Flexible Investment
              </h3>
              <p className="text-gray-400">
                Start with any percentage and grow your portfolio at your own
                pace
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">
                100+
              </div>
              <div className="text-gray-400">Premium Domains</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">100+</div>
              <div className="text-gray-400">Active Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">
                $80k+
              </div>
              <div className="text-gray-400">Total Value</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-400 mb-2">
                24/7
              </div>
              <div className="text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
