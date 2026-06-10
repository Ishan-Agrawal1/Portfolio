import React from 'react';
import { Send, Loader2, ChevronRight } from 'lucide-react';

export function ContactForm({ formData, loading, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-12 bg-[#141414]/50 p-12 rounded-3xl border border-white/5 backdrop-blur-xl">
      <div className="space-y-4">
        <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          Your Full Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => onInputChange('name', e.target.value)}
          className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#e9c176] transition-all"
          placeholder="John Doe"
        />
      </div>

      <div className="space-y-4">
        <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          Email Address
        </label>
        <input
          type="email"
          required
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#e9c176] transition-all"
          placeholder="john@example.com"
        />
      </div>

      <div className="space-y-4">
        <label className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
          Your Message
        </label>
        <textarea
          required
          rows={4}
          value={formData.message}
          onChange={(e) => onInputChange('message', e.target.value)}
          className="w-full bg-transparent border-b border-white/10 py-4 text-white focus:outline-none focus:border-[#e9c176] transition-all resize-none"
          placeholder="Tell me about your project..."
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="group flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white py-6 px-12 border border-white/10 rounded-full hover:bg-[#e9c176] hover:text-black hover:border-[#e9c176] transition-all duration-500 w-full justify-center disabled:opacity-50"
      >
        {loading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <>
            <Send size={16} /> Send Message <ChevronRight className="group-hover:translate-x-2 transition-transform" size={16} />
          </>
        )}
      </button>
      <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest text-center pt-4">
        ⏱ Usually responds within 24 hours.
      </p>
    </form>
  );
}

export default ContactForm;
