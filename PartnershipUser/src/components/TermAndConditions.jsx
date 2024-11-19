import React from 'react';
import { Shield, Mail } from 'lucide-react';

const TermsAndConditions = () => {
  const terms = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing Partnership.top, you confirm that you have read, understood, and agree to these terms. If you do not agree, please discontinue your use of our platform."
    },
    {
      title: "2. Investment Amount",
      content: [
        "Each investor is required to pay annually for a % share in the selected domain.",
        "This payment must be made every year until the domain is sold."
      ]
    },
    {
      title: "3. Payment Terms",
      content: [
        "The annual investment amount of PKR per % share must be paid on time.",
        "All payments are non-refundable, even in the event of withdrawal, loss, or unforeseen circumstances."
      ]
    },
    {
      title: "4. Non-Refundable Clause",
      content: "Investments are final and cannot be refunded under any circumstances, including delays in domain sales or market changes."
    },
    {
      title: "5. Patience Required",
      content: "Domain sales are long-term investments and may take several years to complete. Investors must exercise patience during this process."
    },
    {
      title: "6. Profit Distribution",
      content: [
        "Upon the sale of a domain, investors will receive % of the final sale price for each share they own.",
        "Profits will be distributed proportionately after deducting any applicable fees or taxes."
      ]
    },
    {
      title: "7. Partnership Terms",
      content: [
        "Owning shares does not grant direct ownership of the domain but entitles you to a share of the profits from its sale.",
        "The investor's partnership rights are limited to the agreed percentage in the sale proceeds."
      ]
    },
    {
      title: "8. Transparency and Reporting",
      content: [
        "Investors will receive updates on domain performance and any sales progress.",
        "All updates will be communicated through official channels provided by Partnership.top."
      ]
    },
    {
      title: "9. User Conduct",
      content: [
        "Users must not engage in activities that disrupt the platform or violate legal regulations.",
        "Any misuse may lead to termination of the partnership without compensation."
      ]
    },
    {
      title: "10. Privacy Policy",
      content: "Your personal information will be securely handled in accordance with our Privacy Policy and will only be used for investment-related activities."
    },
    {
      title: "11. Limitation of Liability",
      content: [
        "Partnership.top is not liable for any financial losses or damages related to your investment.",
        "Investments are inherently subject to market risks."
      ]
    },
    {
      title: "12. Changes to Terms",
      content: "Partnership.top reserves the right to update these terms at any time. Continued use of the platform signifies acceptance of any revisions."
    }
  ];

  return (
    <div className="relative min-h-screen pt-20">
      {/* Terms Banner */}
      <div className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-indigo-500/10 blur-3xl rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-indigo-600/10 blur-3xl rounded-full transform -translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text text-center">Terms & Conditions</h1>
        </div>
      </div>

      {/* Terms Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 mb-8">
            <div className="bg-indigo-500/10 p-3 rounded-lg w-fit mb-4">
              <Shield className="w-8 h-8 text-indigo-400" />
            </div>
            <p className="text-gray-300 leading-relaxed">
              Welcome to Partnership.top! By using our platform, you agree to abide by the following terms and conditions. Please read them carefully to understand your rights and obligations as an investor.
            </p>
          </div>

          {/* Terms List */}
          <div className="space-y-6">
            {terms.map((term, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300">
                <h3 className="text-xl font-semibold text-gray-200 mb-3">
                  {term.title}
                </h3>
                {Array.isArray(term.content) ? (
                  <ul className="list-disc list-inside space-y-2">
                    {term.content.map((item, i) => (
                      <li key={i} className="text-gray-400">{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">{term.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-indigo-400" />
              <span>For inquiries or support, contact us at:</span>
              <a href="mailto:muzairqureshi06@gmail.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                muzairqureshi06@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;