import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-gray-600 mt-4">
            We'd love to hear from you. Get in touch with us!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Get in Touch
            </h2>

            <div className="space-y-4 text-gray-600">
              <p><strong>Address:</strong> Mumbai, Maharashtra, India</p>
              <p><strong>Email:</strong> support@yourstore.com</p>
              <p><strong>Phone:</strong> +91 98765 43210</p>
              <p><strong>Working Hours:</strong> Mon - Sat (9:00 AM - 6:00 PM)</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Send Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block mb-2 text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Write your message"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
              >
                Send Message
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
