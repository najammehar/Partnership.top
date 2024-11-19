import React from 'react';
import { ScrollText, Search, CreditCard, Coins } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8 text-indigo-400" />,
      title: "Browse Premium Domains",
      description: "Explore our curated collection of premium domain names available for investment. Each domain is carefully selected for its potential to yield high returns."
    },
    {
      icon: <ScrollText className="w-8 h-8 text-indigo-400" />,
      title: "Choose Your Investment",
      description: "Review detailed information about each domain and share availability. Select the domain you want to invest in and choose the number of shares you wish to purchase."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-indigo-400" />,
      title: "Secure Your Share",
      description: "Once you decide, complete the investment process securely through our platform. Your contribution grants you a stake in the future success of the domain."
    },
    {
      icon: <Coins className="w-8 h-8 text-indigo-400" />,
      title: "Enjoy Your Returns",
      description: "When the domain sells, you'll receive your share of the profit, proportional to your investment. It's a simple and transparent way to grow your wealth."
    }
  ];

  return (
    <div className="relative min-h-screen pt-20">
      {/* Terms Banner */}
      <div className="relative py-28">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-indigo-500/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-indigo-600/10 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 ">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text text-center">How It Works?</h1>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <h2 className="max-w-4xl mx-auto text-2xl font-bold text-center bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text mb-12">Welcome to Partnership.top, where domain investing meets opportunity! Here's how our platform works: </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300">
              <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;