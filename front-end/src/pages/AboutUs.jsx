import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
          About Us
        </h1>

        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-10">
          Welcome to <span className="font-semibold">YourStore</span> — your
          one-stop destination for quality fashion and lifestyle products. We
          believe shopping should be simple, enjoyable, and affordable.
        </p>

        {/* Mission */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to provide high-quality products at the best prices
            while delivering an excellent customer experience. We aim to blend
            style, comfort, and trust into everything we offer.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose Us
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                ✔ Premium Quality
              </h3>
              <p className="text-gray-600 text-sm">
                Carefully curated products with strict quality checks.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                ✔ Affordable Prices
              </h3>
              <p className="text-gray-600 text-sm">
                Best value for money with regular offers and discounts.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                ✔ Secure Payments
              </h3>
              <p className="text-gray-600 text-sm">
                100% secure payment gateways for safe transactions.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-5">
              <h3 className="font-semibold text-gray-800 mb-2">
                ✔ Fast Delivery
              </h3>
              <p className="text-gray-600 text-sm">
                Quick and reliable shipping across all serviceable locations.
              </p>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Our Story
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Founded with a passion for fashion and technology, YourStore started
            as a small idea to make online shopping more customer-friendly.
            Today, we proudly serve thousands of happy customers and continue to
            grow every day.
          </p>
        </section>

        {/* Contact */}
        <section className="border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-2">
            Have questions or feedback? We’d love to hear from you.
          </p>
          <p className="text-gray-700 font-medium">
            📧 Email:
            <a
              href="mailto:support@yourstore.com"
              className="text-indigo-600 ml-1"
            >
              support@yourstore.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
