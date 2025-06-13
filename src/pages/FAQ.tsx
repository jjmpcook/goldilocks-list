import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is Goldilock's List?",
    answer: "Goldilock's List is a curated hotel directory specializing in upscale properties with room configurations ideal for families (e.g., three-bedroom suites, multiple queen beds). We handpick each property to ensure both style and comfort."
  },
  {
    question: "What is the difference between a Travel Agent and a Travel Advisor and why should I use one?",
    answer: "Travel Advisors are the new Travel Agents :) Some people love planning and booking their own travel - we do! - but using an advisor gives you access to our network of advisors with years of travel planning experience, up-to-date travel industry information and longterm industry relationships. Ever want the \"inside scoop?\" This is where you get it."
  },
  {
    question: "Who are your travel advisors and how we work with Fora Travel?",
    answer: "Our advisors are a small, carefully vetted team of certified Fora Travel professionals. We're not a replacement for booking directly with Fora Travel, nor do we compete with them—rather, we partner with Fora Travel to bring you their expertise under the Goldilock's List banner, ensuring you get boutique, personalized service in addition to Fora's trusted booking platform. For more information about Fora, please visit Foratravel.com."
  },
  {
    question: "How is Goldilock's List different from booking sites like Expedia or Booking.com?",
    answer: "Rather than a mass marketplace, we focus exclusively on family-friendly, design-forward hotels you won't find easily elsewhere—complete with detailed room layouts and personalized recommendations.  We are hotel junkies so we find you hotel WE want to stay at."
  },
  {
    question: "Do I need an account to use the site?",
    answer: "You can browse freely, but creating an account lets you save favorites to your Wishlist, build custom trip boards, and request one-on-one assistance from a travel advisor."
  },
  {
    question: "How do I save hotels I like?",
    answer: "Click the \"heart Add to Wishlist\" button on any hotel card (after logging in) to build a personalized shortlist you can revisit and share."
  },
  {
    question: "How do I make a reservation?",
    answer: "If you are ready to make a reservation, we are ready to facilitate book it for you!  This ensures you get VIP Perks and personal attention with every booking."
  },
  {
    question: "Can I make special requests for my stay?",
    answer: "Absolutely! Communicate with your travel advisor any special requests. We are happy to work with Hotel staff to accommodate requests like specific baby equipment, child safety features, or dietary requirements. We recommend making these requests as early as possible."
  },
  {
    question: "Do you have properties for large families or multigenerational trips?",
    answer: "Yes! We have many properties that can accommodate larger groups and are perfect for extended family vacations. You can filter properties by capacity to find options that can comfortably fit your entire family."
  },
  {
    question: "What's a \"Custom Hotel Match,\" and how do I request one?",
    answer: "Our \"Custom Hotel Match\" pairs you with a professional travel advisor who hand-picks hotels based on your family's needs, style preferences, and budget. Click \"Get a Custom Hotel Match\" on the homepage to fill out a short intake form."
  },
  {
    question: "Are there any fees to use Goldilock's List?",
    answer: "Browsing and building your Wishlist are free." 
  },
  {
    question: "Is there a minimum nightly budget to work with a travel advisor?",
    answer: "No, travel advisors generally offer bookings without cost to the traveler and are paid a small commission from hotel providers.  However, our travel advisors are individual contractors and may have a fee structure for more complicated reservations."
  }
];

const FAQ: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  
  const toggleExpand = (index: number) => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-8">
            <HelpCircle className="w-8 h-8 text-amber-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          </div>
          
          <p className="text-gray-600 mb-8">
            Find answers to common questions about booking family-friendly accommodations through Goldilock's List.
          </p>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {faqItems.map((item, index) => (
              <div 
                key={index} 
                className={`border-b border-gray-200 last:border-b-0 ${expandedIndex === index ? 'bg-amber-50' : ''}`}
              >
                <button
                  onClick={() => toggleExpand(index)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
                  {expandedIndex === index ? 
                    <ChevronUp className="w-5 h-5 text-amber-600" /> : 
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  }
                </button>
                {expandedIndex === index && (
                  <div className="px-6 pb-4 text-gray-700">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Didn't find your answer?
            </h3>
            <p className="text-gray-700 mb-4">
              Our family travel specialists are here to help with any additional questions you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="mailto:help@goldilockslist.com" 
                className="bg-amber-600 text-white py-2 px-6 rounded-lg hover:bg-amber-700 transition-colors inline-flex items-center justify-center"
              >
                Email Us
              </a>
              <a 
                href="tel:+18005551234" 
                className="bg-white text-amber-600 border border-amber-200 py-2 px-6 rounded-lg hover:bg-amber-50 transition-colors inline-flex items-center justify-center"
              >
                Call: (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQ;