import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import DomainService from "../services/Domain";
import { Send, X } from "lucide-react";
import formImage from "../assets/formImage.png";
import Config from "../conf/config";

const InvestmentForm = () => {
  const { domainId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [domainName, setDomainName] = useState(null);
  const [domainExtension, setDomainExtension] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const serviceId = Config.emailjsServiceID;
  const template_investment_id = Config.emailjsTemplateInvestmentID;
  const public_key = Config.emailjsPublicKey;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    sharePercentage: "",
    termsAccepted: false,
  });

  useEffect(() => {
    const fetchDomainDetails = async () => {
      try {
        setLoading(true);
        const domainData = await DomainService.getDomainById(domainId);
        setDomainName(domainData.name);
        setDomainExtension(domainData.extenstion);
      } catch (err) {
        console.error("Failed to fetch domain details:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDomainDetails();
  }, [domainId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    const templateParams = {
      ...formData,
      domainName,
      domainExtension,
    };

    try {
      const response = await emailjs.send(
        `${serviceId}`,
        `${template_investment_id}`,
        templateParams,
        `${public_key}`
      );
      console.log("Email sent successfully!", response.status, response.text);
      setShowSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        sharePercentage: "",
        termsAccepted: false,
      });
      setSubmitLoading(false);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitLoading(false);
      setShowError(true);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl w-full mx-auto relative p-4 mt-20">
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-indigo-900">
                Success!
              </h3>
              <button
                onClick={handleCloseSuccess}
                className="text-gray-500 hover:text-indigo-400"
              >
                <X size={24} />
              </button>
            </div>

            <p className="text-gray-600 mb-4 ">
              Your investment request has been submitted successfully. We'll
              contact you soon!
            </p>
            <button
              onClick={handleCloseSuccess}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showError && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-red-600">Error</h3>
              <button
                onClick={() => setShowError(false)}
                className="text-gray-500 hover:text-indigo-400"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Failed to send your investment request. Please try again later.
            </p>
            <button
              onClick={() => setShowError(false)}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-7xl grid md:grid-cols-5 grid-cols-1 gap-8"
      >
        {submitLoading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        )}
        <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 md:col-span-3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-200">
              Invest in {domainName}
              {domainExtension}
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="name">
                  Investor Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter Your Name"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your Email"
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="phone">
                WhatsApp Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter Your WhatsApp Number"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <div>
              <label
                className="block text-gray-300 mb-2"
                htmlFor="sharePercentage"
              >
                Percentage of Shares to Buy
              </label>
              <input
                type="number"
                id="sharePercentage"
                name="sharePercentage"
                value={formData.sharePercentage}
                onChange={handleInputChange}
                min="1"
                max="100"
                placeholder="Enter Percentage of Shares to Buy"
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-gray-300 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Type Your Message Here..."
                className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                required
              ></textarea>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-300"
                  required
                />
              </div>
              <label
                htmlFor="termsAccepted"
                className="ml-3 text-sm text-gray-300"
              >
                I declare that all the information provided is valid, and I
                understand that the company will contact me through the provided
                information.
              </label>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25"
            >
              Submit Investment Request
            </button>
          </div>
        </div>
        <div className="md:col-span-2">
          <img
            src={formImage}
            alt="Investment Form"
            className="w-full h-full object-contain rounded-3xl"
          />
        </div>
      </form>
    </div>
  );
};

export default InvestmentForm;
