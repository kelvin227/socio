"use client";

import React, { useState } from "react";

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Socio?",
      answer: "Socio is a platform that connects people and provides various social and financial services.",
    },
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button on the homepage and fill in the required details.",
    },
    {
      question: "Is my data secure on Socio?",
      answer: "Yes, we prioritize your data security and use advanced encryption to protect your information.",
    },
    {
      question: "How can I contact support?",
      answer: "You can contact our support team via the 'Contact Us' page or email us at support@socio.com.",
    },
    {
      question: "Are there any fees for using Socio?",
      answer: "Yes, Socio have a 2% trading fee and a wallet withdrawal fee but Note this fee as for transaction purpose on the blockChain you can not avoid paying for them.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 light:bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">{faq.question}</h2>
              <span className="text-gray-500">
                {activeIndex === index ? "-" : "+"}
              </span>
            </div>
            {activeIndex === index && (
              <p className="mt-2 dark:text-gray-300 light:text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;