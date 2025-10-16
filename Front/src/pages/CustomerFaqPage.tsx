import React, { useEffect, useState } from 'react';
import Layout from '../components/common/Layout';
import { customerApi } from '../services/ApiService';
import { HelpCircle } from 'lucide-react';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const CustomerFaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        setLoading(true);
        const data = await customerApi.getFaqs();
        setFaqs(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load FAQs', e);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-fuchsia-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-indigo-100">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">FAQ</h1>
            </div>

            <p className="mt-2 text-gray-600">Frequently asked questions to help you quickly.</p>

            <div className="mt-6">
              {loading ? (
                <p className="text-gray-500">Loading...</p>
              ) : faqs.length === 0 ? (
                <p className="text-gray-500">There are currently no FAQs.</p>
              ) : (
                <ul className="space-y-4">
                  {faqs.map((faq) => (
                    <li key={faq.id} className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                      <p className="text-gray-900 font-medium">{faq.question}</p>
                      <p className="text-gray-700 mt-2">{faq.answer}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerFaqPage;