import React, { useState } from 'react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <title>Contact Us | FinCalc Flow</title>
      <meta name="description" content="Reach out to the developers of FinCalc Flow. Send us feedback, calculator requests, or general inquiries." />
      <link rel="canonical" href="https://www.fincalcflow.com/contact" />

      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-black tracking-wider uppercase inline-block">
          Support & Feedback
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Contact FinCalc Flow
        </h1>
        <p className="text-slate-500 text-base max-w-xl mx-auto">
          Have a feature suggestion, feedback, or a customized calculator request? Send us a message and we'll get back to you as soon as possible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Info (4 cols) */}
        <div className="md:col-span-4 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">General Inquiries</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                For partnerships, mathematical questions, or suggestions on how to improve our calculators.
              </p>
              <a href="mailto:contact@fincalcflow.com" className="text-indigo-600 text-sm font-bold block mt-1 hover:underline">
                contact@fincalcflow.com
              </a>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">Legal & Privacy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Questions regarding our client-side storage policies, cookie audits, or GDPR/COPPA parameters.
              </p>
              <a href="mailto:privacy@fincalcflow.com" className="text-indigo-600 text-sm font-bold block mt-1 hover:underline">
                privacy@fincalcflow.com
              </a>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-50">
            <span className="text-[11px] font-bold text-emerald-500 uppercase tracking-widest block">✦ 100% Secure</span>
            <p className="text-[10px] text-slate-400 mt-1">Your message is securely transmitted directly to our inbox.</p>
          </div>
        </div>

        {/* Contact Form (8 cols) */}
        <div className="md:col-span-8 bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-100/50 text-left">
          {formSubmitted ? (
            <div className="h-full flex flex-col items-center justify-center py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              </div>
              <h2 className="text-2xl font-black text-slate-900">Thank You!</h2>
              <p className="text-slate-500 text-sm max-w-sm">
                Your message has been successfully received. We will review your inquiry and respond within 24–48 hours.
              </p>
              <button 
                onClick={() => {
                  setFormSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-4 px-5 py-2 bg-indigo-600 hover:bg-indigo-750 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-indigo-900/10"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">Message</label>
                <textarea
                  id="message"
                  required
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need help with, your suggestions, or calculator requests..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-indigo-600 hover:bg-indigo-750 text-white font-extrabold rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/10 hover:scale-[1.01]"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
