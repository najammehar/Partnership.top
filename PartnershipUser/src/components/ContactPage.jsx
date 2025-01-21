import React from "react";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import emailjs from "emailjs-com";
import { useState } from "react";
import { X } from "lucide-react";
import Config from "../conf/config";

const ContactPage = () => {
  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6 text-indigo-400" />,
      title: "Location",
      details: ["Shahdara, Lahore, Pakistan"],
    },
    {
      icon: <Phone className="w-6 h-6 text-indigo-400" />,
      title: "Phone Numbers",
      details: ["+92 312 1611344"],
    },
    {
      icon: <Mail className="w-6 h-6 text-indigo-400" />,
      title: "Email Addresses",
      details: ["uzairqureshicontact@gmail.com"],
    },
  ];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const serviceId = Config.emailjsServiceID;
  const template_contact_id = Config.emailjsTemplateContactID;
  const public_key = Config.emailjsPublicKey;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    try {
      const response = await emailjs.send(
        `${serviceId}`,
        `${template_contact_id}`,
        formData,
        `${public_key}`
      );
      console.log("Email sent successfully!", response.status, response.text);
      setShowSuccess(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitLoading(false);
    } catch (error) {
      console.error("Failed to send email:", error);
      setSubmitLoading(false);
      setShowError(true);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <div className="relative min-h-screen pt-20">
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
              Your message has been sent successfully. We'll get back to you as
              soon as possible.
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
              Failed to send your message. Please try again later.
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
      {/* Contact Banner */}
      <div className="relative py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-transparent" />
        <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-indigo-500/10 blur-3xl rounded-full" />
        <div className="absolute left-0 bottom-0 w-1/2 h-1/2 bg-indigo-600/10 blur-3xl rounded-full" />
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-200 text-transparent bg-clip-text text-center mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto">
            Have questions? We're here to help! Reach out to us through any of
            the channels below.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-6 h-6 text-indigo-400" />
              <h2 className="text-2xl font-bold text-gray-200">
                Send Us a Message
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="relative space-y-6">
              {submitLoading && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2" htmlFor="email">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:border-indigo-500 transition-colors"
                  placeholder="Type your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors duration-200 shadow-lg shadow-indigo-500/25"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-indigo-500/50 transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-indigo-500/10 p-3 rounded-lg">
                    {info.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-200">
                    {info.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-400">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
