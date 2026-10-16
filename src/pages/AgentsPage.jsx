import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Star, 
  CheckCircle2, 
  X,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AGENTS } from '../data/properties';

export default function AgentsPage() {
  const { setFilters, setActivePage, showToast } = useApp();

  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [modalInquirySent, setModalInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');

  const filteredAgents = AGENTS.filter((agent) => {
    if (specialtyFilter === 'all') return true;
    return agent.specialty.toLowerCase().includes(specialtyFilter.toLowerCase());
  });

  const handleInquiry = (e) => {
    e.preventDefault();
    setModalInquirySent(true);
    showToast(`Consultation request sent to ${selectedAgent?.name || 'Advisor'}!`, 'success');
  };

  const viewAgentListings = (agentName) => {
    setFilters(prev => ({ ...prev, query: agentName }));
    setActivePage('listings');
  };

  return (
    <div className="min-h-screen text-slate-100 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Top 1% Global Representation</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Premier Real Estate Advisors
          </h1>
          <p className="text-sm text-slate-400 mt-3 leading-relaxed">
            Our luxury brokers possess decades of transactional experience, confidential off-market connections, and deep architectural discernment.
          </p>

          {/* Specialty Filters */}
          <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
            {[
              { id: 'all', label: 'All Advisors' },
              { id: 'waterfront', label: 'Waterfront & Coastal' },
              { id: 'penthouse', label: 'Sky Penthouses' },
              { id: 'modernist', label: 'Modern Architecture' },
              { id: 'alpine', label: 'Alpine & Ranches' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSpecialtyFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  specialtyFilter === tab.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAgents.map((agent) => (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-blue-500/40 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-blue-950/40 group"
            >
              <div>
                {/* Agent Photo */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-4 border border-slate-800">
                  <img
                    src={agent.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'}
                    alt={agent.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900/80 backdrop-blur-md text-blue-300 border border-white/10 font-medium">
                      {agent.experience}
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 font-bold bg-slate-900/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Name & Title */}
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-xs text-blue-400 font-medium mt-0.5">{agent.title}</p>
                <p className="text-[11px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {agent.bio}
                </p>

                {/* Stats Bar */}
                <div className="grid grid-cols-2 gap-2 my-4 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Sales Record</p>
                    <p className="font-bold text-white mt-0.5">{agent.salesVolume}</p>
                  </div>
                  <div className="border-l border-slate-800">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Active Listings</p>
                    <p className="font-bold text-white mt-0.5">{agent.activeListingsCount} Estates</p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => {
                    setSelectedAgent(agent);
                    setModalInquirySent(false);
                  }}
                  className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
                >
                  Consult Privately
                </button>

                <button
                  onClick={() => viewAgentListings(agent.name)}
                  className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Listed Estates</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* AGENT DETAIL & CONTACT MODAL */}
      <AnimatePresence>
        {selectedAgent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgent(null)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-950 border border-blue-500/30 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setSelectedAgent(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col sm:flex-row gap-6 mb-6 pb-6 border-b border-slate-800">
                <img
                  src={selectedAgent?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'}
                  alt={selectedAgent?.name || 'Advisor'}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-500/40 shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80';
                  }}
                />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-blue-600/20 text-blue-300">
                      {selectedAgent?.license}
                    </span>
                    <span className="text-xs text-slate-400">{selectedAgent?.experience}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{selectedAgent?.name}</h3>
                  <p className="text-xs text-blue-400 font-semibold">{selectedAgent?.title}</p>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">{selectedAgent?.bio}</p>
                </div>
              </div>

              {/* Languages & Credentials */}
              <div className="grid grid-cols-2 gap-3 mb-6 p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Languages Spoken</p>
                  <p className="text-white mt-0.5">{selectedAgent?.languages?.join(', ')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Transaction Volume</p>
                  <p className="text-blue-400 font-bold mt-0.5">{selectedAgent?.salesVolume} Closed</p>
                </div>
              </div>

              {/* Consultation Form */}
              {modalInquirySent ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-sm font-bold text-white">Direct Advisory Request Dispatched</p>
                  <p className="text-slate-400 mt-1">
                    {selectedAgent?.name} has received your confidential brief and will reply shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Schedule Private Consultation
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />

                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={inquiryEmail}
                      onChange={(e) => setInquiryEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Brief description of requirements, target enclaves, or budget..."
                    value={inquiryMsg}
                    onChange={(e) => setInquiryMsg(e.target.value)}
                    className="w-full p-3 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/30"
                  >
                    Submit Private Request
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
