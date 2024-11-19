import React from "react";
import {
  Users,
  Target,
  Lightbulb,
  Globe,
  Shield,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();
  const values = [
    {
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      title: "Trust",
      description:
        "We build lasting relationships through transparency and reliable service.",
    },
    {
      icon: <Users className="w-6 h-6 text-indigo-400" />,
      title: "Community",
      description:
        "Creating a supportive network of investors who share in each other's success.",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-indigo-400" />,
      title: "Innovation",
      description:
        "Pioneering new ways to make domain investing accessible and profitable.",
    },
    {
      icon: <Target className="w-6 h-6 text-indigo-400" />,
      title: "Excellence",
      description:
        "Committed to identifying and securing the highest potential domain names.",
    },
    {
      icon: <Globe className="w-6 h-6 text-indigo-400" />,
      title: "Accessibility",
      description:
        "Making premium domain investment opportunities available to everyone.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-indigo-400" />,
      title: "Growth",
      description:
        "Focused on long-term value creation and sustainable returns.",
    },
  ];

  return (
    <div className="relative min-h-screen pt-20">
      {/* Hero Section */}
      <div className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-indigo-600/10 blur-3xl rounded-full" />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text text-center mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Making premium domain investing accessible to everyone through
            collaboration and shared growth.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Story Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text mb-6">
              Our Story
            </h2>
            <p className="text-gray-300 leading-relaxed">
              At Partnership.top, we believe in the power of collaboration and
              shared growth. Our platform is dedicated to making premium domain
              investing accessible to everyone, offering a unique opportunity to
              own a share in high-value digital assets.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We specialize in identifying and acquiring top-tier domain names
              with significant market potential. By allowing investors to buy
              shares in these domains, we enable collective ownership and shared
              profits when these assets are sold.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text mb-6">
              Our Mission
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Our mission is to bridge the gap between individual investors and
              the lucrative world of domain trading. With transparency, trust,
              and innovation at the core of our values, we strive to create a
              community where everyone can benefit from the digital economy's
              growth.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text text-center mb-12">
            Our Values
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300"
              >
                <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-200 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-gray-200 mb-4">
              Join Our Community
            </h2>
            <p className="text-gray-300 mb-6">
              Join us at Partnership.top and be part of a revolution in domain
              investing because success is better when shared.
            </p>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25"
            >
              Start Investing Today
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
