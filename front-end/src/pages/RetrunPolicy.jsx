import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Return & Refund Policy
        </h1>

        <p className="text-gray-600 mb-4">
          At <span className="font-semibold">YourStore</span>, customer
          satisfaction is our top priority. If you are not completely satisfied
          with your purchase, we are here to help.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            1. Return Eligibility
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Products can be returned within <b>7 days</b> of delivery.</li>
            <li>The item must be unused, unwashed, and in original packaging.</li>
            <li>Return is not applicable on clearance or sale items.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            2. Non‑Returnable Items
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Innerwear, personal care items</li>
            <li>Gift cards</li>
            <li>Used or damaged products</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            3. Refund Process
          </h2>
          <p className="text-gray-600">
            Once we receive and inspect your return, we will notify you about the
            approval or rejection of your refund. Approved refunds will be
            processed within <b>5–7 business days</b> to your original payment
            method.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            4. Exchange Policy
          </h2>
          <p className="text-gray-600">
            Exchanges are allowed for size or defective items only. Please raise
            an exchange request within <b>48 hours</b> of delivery.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            5. How to Request a Return
          </h2>
          <p className="text-gray-600">
            To initiate a return, email us at
            <a
              href="mailto:support@yourstore.com"
              className="text-indigo-600 font-medium ml-1"
            >
              support@yourstore.com
            </a>
            with your order ID and reason for return.
          </p>
        </section>

        <section className="border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Us
          </h2>
          <p className="text-gray-600">
            If you have any questions regarding our return policy, feel free to
            reach out to us.
          </p>
          <p className="mt-2 text-gray-700 font-medium">
            📧 Email: support@yourstore.com
          </p>
        </section>
      </div>
    </div>
  );
}
