import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/common/Layout';
import { adminApi } from '../services/ApiService';
import { Plus, X, HelpCircle, ChevronDown, Search } from 'lucide-react';

interface Faq {
  id: number;
  question: string;
  answer: string;
}

const AdminFaqPage: React.FC = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const loadFaqs = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getFaqs();
      setFaqs(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error('Failed to load FAQs', e);
      setError('Unable to load FAQs at the moment.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFaqs();
  }, []);

  const filteredFaqs = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, search]);

  const toggleExpand = (id: number) => setExpandedId((curr) => (curr === id ? null : id));

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!question.trim() || !answer.trim()) {
      setError('Please enter both question and answer.');
      return;
    }
    try {
      await adminApi.createFaq({ question: question.trim(), answer: answer.trim() });
      setQuestion('');
      setAnswer('');
      setShowForm(false);
      await loadFaqs();
    } catch (err) {
      console.error('Create FAQ error', err);
      setError('Error while creating the FAQ.');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-violet-800 to-fuchsia-700 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-8 h-8 text-fuchsia-300" />
                <h1 className="text-2xl md:text-3xl font-bold text-white">FAQ Management</h1>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-fuchsia-500 hover:bg-fuchsia-600 text-white px-4 py-2 rounded-lg shadow focus:outline-none"
              >
                <Plus className="w-5 h-5" /> New FAQ
              </button>
            </div>

            {/* Admin Search */}
            <div className="mt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/80" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by question or answer"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
                />
              </div>
            </div>

            {showForm && (
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-800">Add New FAQ</h2>
                  <button onClick={() => setShowForm(false)} className="text-gray-500 hover:text-gray-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}
                <form onSubmit={handleCreate} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Question</label>
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="mt-1 w-full rounded-md border-gray-300 focus:border-fuchsia-500 focus:ring-fuchsia-500"
                      placeholder="Enter the question"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Answer</label>
                    <textarea
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      rows={4}
                      className="mt-1 w-full rounded-md border-gray-300 focus:border-fuchsia-500 focus:ring-fuchsia-500"
                      placeholder="Enter the answer"
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-md border">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 rounded-md bg-fuchsia-500 text-white hover:bg-fuchsia-600">
                      Save FAQ
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-white/90">Published FAQs</h2>
              {loading ? (
                <div className="mt-4 space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-5 w-1/2 bg-white/20 rounded" />
                      <div className="mt-2 h-4 w-full bg-white/10 rounded" />
                    </div>
                  ))}
                </div>
              ) : filteredFaqs.length === 0 ? (
                <p className="mt-4 text-fuchsia-100">No FAQs found for this filter.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {filteredFaqs.map((faq) => {
                    const isOpen = expandedId === faq.id;
                    return (
                      <li key={faq.id} className="bg-white/10 rounded-xl border border-white/20">
                        <button
                          onClick={() => toggleExpand(faq.id)}
                          className="w-full flex items-start justify-between gap-3 p-4 text-left"
                        >
                          <p className="text-white font-medium">{faq.question}</p>
                          <ChevronDown className={`w-5 h-5 text-fuchsia-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <div className={`px-4 pb-4 text-fuchsia-100 ${isOpen ? 'block' : 'hidden'}`}>{faq.answer}</div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminFaqPage;