import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/common/Layout';
import { customerApi } from '../services/ApiService';
import { HelpCircle, Search, ChevronDown, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const CustomerFaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

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

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
  }, [faqs, search]);

  const toggleExpand = (id: number) => {
    setExpandedId((curr) => (curr === id ? null : id));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-indigo-100 to-fuchsia-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero */}
          <div className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 rounded-2xl p-8 shadow-lg text-white">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-white/90" />
              <h1 className="text-2xl md:text-3xl font-bold">Frequently Asked Questions</h1>
            </div>
            <p className="mt-2 text-indigo-100">Find quick answers. Search, expand, and explore.</p>

            {/* Search */}
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search questions or answers"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
            </div>
          </div>

          {/* FAQ List */}
          <div className="mt-8 bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-indigo-100">
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-5 w-2/3 bg-indigo-100 rounded" />
                    <div className="mt-3 h-4 w-full bg-indigo-50 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredFaqs.length === 0 ? (
              <div className="text-center py-10">
                <MessageCircle className="w-12 h-12 mx-auto text-indigo-400" />
                <p className="mt-3 text-gray-700">No FAQs match your search.</p>
                <p className="text-gray-500">Try adjusting the keywords or contact our support.</p>
                <Link
                  to="/contact"
                  className="inline-block mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Contact Us
                </Link>
              </div>
            ) : (
              <ul className="space-y-4">
                {filteredFaqs.map((faq) => {
                  const isOpen = expandedId === faq.id;
                  return (
                    <li
                      key={faq.id}
                      className="rounded-xl border border-indigo-100 bg-indigo-50/60 hover:bg-indigo-50 transition-colors"
                    >
                      <button
                        onClick={() => toggleExpand(faq.id)}
                        className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left"
                      >
                        <p className="text-gray-900 font-medium">{faq.question}</p>
                        <ChevronDown
                          className={`w-5 h-5 text-indigo-600 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div className={`px-4 pb-4 text-gray-700 ${isOpen ? 'block' : 'hidden'}`}>{faq.answer}</div>
                    </li>
                  );
                })}
              </ul>
            )}

            {/* Help CTA */}
            <div className="mt-8 flex items-center justify-between bg-indigo-50 rounded-xl p-4 border border-indigo-100">
              <p className="text-gray-700">Still need help? Our team is here for you.</p>
              <Link to="/customer/contact" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
                Get Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerFaqPage;