import React from "react";

export default function AboutUs() {
  return (
    <div className="bg-white py-16 px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About StyleNest
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Your ultimate destination for modern, affordable, and high-quality fashion.
          </p>
        </div>

        {/* Who We Are */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Who We Are
          </h2>
          <p className="text-gray-600 leading-relaxed">
            StyleNest is an innovative eCommerce platform dedicated to bringing
            the latest fashion trends directly to your doorstep. We believe fashion
            is more than clothing — it's confidence, personality, and self-expression.
            Our goal is to create a seamless and enjoyable online shopping experience
            for everyone.
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To provide premium-quality fashion products at accessible prices
              while delivering an exceptional, secure, and user-friendly shopping
              experience.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 leading-relaxed">
              To become a trusted and leading eCommerce brand known for
              innovation, quality, and customer satisfaction.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Why Choose StyleNest?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold text-gray-900 mb-2">
                Quality Assurance
              </h4>
              <p className="text-gray-600 text-sm">
                Every product goes through strict quality checks to ensure durability and comfort.
              </p>
            </div>

            <div className="p-5 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold text-gray-900 mb-2">
                Secure Payments
              </h4>
              <p className="text-gray-600 text-sm">
                We use secure authentication and payment gateways to protect your data.
              </p>
            </div>

            <div className="p-5 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold text-gray-900 mb-2">
                Fast Delivery
              </h4>
              <p className="text-gray-600 text-sm">
                Reliable and quick shipping to ensure your products reach you on time.
              </p>
            </div>

            <div className="p-5 border rounded-lg hover:shadow-md transition">
              <h4 className="font-semibold text-gray-900 mb-2">
                Customer First
              </h4>
              <p className="text-gray-600 text-sm">
                We prioritize customer satisfaction and provide hassle-free returns.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
