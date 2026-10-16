import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  CheckCircle2, 
  Video, 
  Compass, 
  Sparkles,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ScheduleViewingModal() {
  const { scheduleModalOpen, closeScheduleModal, scheduleProperty, showToast } = useApp();

  const [tourType, setTourType] = useState('in-person'); // 'in-person' | 'virtual'
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState('Sunset VIP (5:30 PM)');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  if (!scheduleModalOpen || !scheduleProperty) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmed(true);
    showToast(`VIP Viewing Confirmed for ${scheduleProperty.title}!`, 'success');
  };

  const handleDone = () => {
    setConfirmed(false);
    closeScheduleModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeScheduleModal}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-xl bg-slate-950 border border-blue-500/30 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
        >
          {/* Subtle glow */}
          <div className="absolute top-0 right-1/4 w-48 h-20 bg-blue-600/20 blur-3xl pointer-events-none" />

          {/* Close button */}
          <button
            onClick={closeScheduleModal}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!confirmed ? (
            <>
              {/* Header */}
              <div className="mb-6">
                <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Private Client Experience</span>
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">Schedule Private Viewing</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Experience this residence with an exclusive advisor walkthrough
                </p>
              </div>

              {/* Property summary banner */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900 border border-slate-800 mb-6">
                <img
                  src={scheduleProperty?.images?.[0] || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80'}
                  alt={scheduleProperty?.title || 'Property'}
                  className="w-16 h-16 rounded-xl object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80';
                  }}
                />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-white truncate">{scheduleProperty?.title}</h4>
                  <p className="text-xs text-blue-400 font-semibold">
                    {scheduleProperty?.purpose === 'rent'
                      ? `$${scheduleProperty?.price?.toLocaleString()}/mo`
                      : `$${scheduleProperty?.price?.toLocaleString()}`}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">{scheduleProperty?.address}, {scheduleProperty?.city}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Tour Type */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">Viewing Format</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTourType('in-person')}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                        tourType === 'in-person'
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Compass className="w-4 h-4 text-blue-400" />
                      <div>
                        <p>In-Person VIP Tour</p>
                        <p className="text-[10px] text-slate-400 font-normal">Private estate access</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setTourType('virtual')}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold transition-all text-left ${
                        tourType === 'virtual'
                          ? 'bg-blue-600/20 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      <Video className="w-4 h-4 text-blue-400" />
                      <div>
                        <p>Live 3D Virtual Tour</p>
                        <p className="text-[10px] text-slate-400 font-normal">Architectural walkthrough</p>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Date & Time Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Time Window</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Morning VIP (10:00 AM)">Morning VIP (10:00 AM)</option>
                        <option value="Mid-Day (1:30 PM)">Mid-Day (1:30 PM)</option>
                        <option value="Sunset VIP (5:30 PM)">Sunset Golden Hour (5:30 PM)</option>
                        <option value="Twilight Viewing (7:30 PM)">Twilight Illumination (7:30 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Lord Sterling"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 234-5678"
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@investment.com"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Special Requirements (Optional)</label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="E.g., Private security arrival, helicopter landing, NDA request..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.01]"
                >
                  Confirm Appointment Request
                </button>
              </form>
            </>
          ) : (
            /* Confirmation Screen */
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Appointment Reserved</h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
                Your private viewing for <strong className="text-blue-400">{scheduleProperty?.title || 'Selected Property'}</strong> has been scheduled for <span className="text-white font-medium">{date}</span> at <span className="text-white font-medium">{timeSlot}</span>.
              </p>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 max-w-md mx-auto mb-6 text-left space-y-1.5">
                <p><strong className="text-slate-200">Host Broker:</strong> {scheduleProperty?.agent?.name || 'Senior Estatly Advisor'}</p>
                <p><strong className="text-slate-200">Format:</strong> {tourType === 'in-person' ? 'Private In-Person VIP Tour' : 'Live 3D Virtual Tour'}</p>
                <p><strong className="text-slate-200">Confirmation Sent To:</strong> {email || 'Your registered email'}</p>
              </div>

              <button
                onClick={handleDone}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30"
              >
                Done
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
